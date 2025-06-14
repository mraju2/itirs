import { z } from 'zod';

type FetchServiceOptions<T> = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    endpoint: string; // Dynamic endpoint
    body?: Record<string, unknown> | FormData; // For JSON or FormData
    contentType?: string; // e.g., 'application/json', 'multipart/form-data'
    headers?: Record<string, string>;
    timeout?: number; // Optional timeout in ms, defaults to 3 minutes
    schema?: z.ZodType<T>; // Add schema for validation
  };
  
  type FetchServiceResponse<T> = T; // Generic response type for flexibility
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5145/api';
  
  export const fetchService = async <T>({
    method,
    endpoint,
    body,
    contentType = 'application/json',
    headers = {},
    timeout = 360000, // Default timeout to 3 minutes
    schema,
  }: FetchServiceOptions<T>): Promise<FetchServiceResponse<T>> => {
    // Construct full URL by attaching endpoint to base URL
    const url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
    // Add content type to headers if not FormData
    const requestHeaders: Record<string, string> = {
      ...headers,
    };
  
    if (contentType && !(body instanceof FormData)) {
      requestHeaders['Content-Type'] = contentType;
    }
  
    // Prepare the fetch options
    const options: RequestInit = {
      method,
      headers: requestHeaders,
      body: body && contentType === 'application/json' && !(body instanceof FormData)
        ? JSON.stringify(body)
        : (body as BodyInit), // FormData or raw body
    };
  
    // Timeout implementation
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
  
    try {
      console.log(`Fetching from: ${url}`);

      // Perform the fetch
      const response = await fetch(url, { ...options, signal: controller.signal });
  
      // Clear timeout if successful
      clearTimeout(timeoutId);
  
      // Check if response is ok
      if (!response.ok) {
        const errorResponse = await response.text();
        console.error(`Error response from ${url}:`, errorResponse);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorResponse}`);
      }
  
      // Parse JSON response (if applicable)
      const responseContentType = response.headers.get('Content-Type');
      let data: unknown;
  
      if (responseContentType && responseContentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
  
      // Validate response data if schema is provided
      if (schema) {
        const validationResult = schema.safeParse(data);
        if (!validationResult.success) {
          console.error('Validation error:', validationResult.error);
          throw new Error(`Validation error: ${validationResult.error.message}`);
        }
        return validationResult.data;
      }
  
      return data as T;
    } catch (error) {
      clearTimeout(timeoutId);
  
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
  
      // Handle network errors (like when API server is not running)
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please try again later.');
      }
  
      if (error instanceof Error) {
        console.error(`Fetch error for ${url}:`, error);
        throw error;
      }
  
      throw new Error('An unknown error occurred');
    }
  };
  
  export default fetchService;
  