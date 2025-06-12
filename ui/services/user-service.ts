import fetchService from "./fetch";
import { 
  UserRegistrationData, 
  UserRegistrationResponse, 
  userRegistrationSchema, 
  userRegistrationResponseSchema,
  userRegistrationResponseArraySchema 
} from '../validations/user';

export type UserRegistrationRequest = {
  endpoint: string;
  data?: Record<string, unknown> | FormData;
  isFormData?: boolean;
  headers?: Record<string, string>;
};

export const userService = {
  /**
   * Fetch all user registrations from the API
   */
  getAllRegistrations: async (): Promise<UserRegistrationResponse[]> => {
    return await fetchService<UserRegistrationResponse[]>({
      method: "GET",
      endpoint: "/user",
      schema: userRegistrationResponseArraySchema
    });
  },

  /**
   * Fetch a single user registration by ID
   * @param id - The ID of the user registration
   */
  getRegistrationById: async (
    id: string
  ): Promise<UserRegistrationResponse> => {
    return await fetchService<UserRegistrationResponse>({
      method: "GET",
      endpoint: `/User/${id}`,
      schema: userRegistrationResponseSchema
    });
  },

  /**
   * Create a new user registration (JSON Object only)
   * @param data - User registration data as JSON
   */
  createRegistration: async (data: UserRegistrationData): Promise<UserRegistrationResponse> => {
    // Validate the input data
    const validationResult = userRegistrationSchema.safeParse(data);
    if (!validationResult.success) {
      throw new Error(`Validation error: ${validationResult.error.message}`);
    }

    return await fetchService<UserRegistrationResponse>({
      method: "POST",
      endpoint: "/User",
      body: JSON.parse(JSON.stringify(data)),
      contentType: "application/json",
      schema: userRegistrationResponseSchema,
    });
  },

  /**
   * Update an existing user registration by ID (JSON Object only)
   * @param id - The ID of the user registration to update
   * @param data - Updated user registration data as JSON
   */
  updateRegistration: async (id: string, data: UserRegistrationData): Promise<UserRegistrationResponse> => {
    // Validate the input data
    const validationResult = userRegistrationSchema.safeParse(data);
    if (!validationResult.success) {
      throw new Error(`Validation error: ${validationResult.error.message}`);
    }

    return await fetchService<UserRegistrationResponse>({
      method: "PUT",
      endpoint: `/user/register/${id}`,
      body: JSON.parse(JSON.stringify(data)),
      contentType: "application/json",
      schema: userRegistrationResponseSchema,
    });
  },

  /**
   * Delete a user registration by ID
   * @param id - The ID of the user registration to delete
   */
  deleteRegistration: async (id: string): Promise<void> => {
    return await fetchService({
      method: "DELETE",
      endpoint: `/user/register/${id}`,
    });
  },

  /**
   * Fetch user registrations filtered by trade
   * @param trade - The trade to filter by
   */
  getRegistrationsByTrade: async (
    trade: string
  ): Promise<UserRegistrationResponse[]> => {
    return await fetchService<UserRegistrationResponse[]>({
      method: "GET",
      endpoint: `/user/register/trade/${trade}`,
      schema: userRegistrationResponseArraySchema
    });
  },

  /**
   * Fetch user registrations filtered by district
   * @param district - The district to filter by
   */
  getRegistrationsByDistrict: async (
    district: string
  ): Promise<UserRegistrationResponse[]> => {
    return await fetchService<UserRegistrationResponse[]>({
      method: "GET",
      endpoint: `/user/register/district/${district}`,
      schema: userRegistrationResponseArraySchema
    });
  },

  /**
   * Fetch user registrations filtered by work location
   * @param location - The work location to filter by
   */
  getRegistrationsByWorkLocation: async (
    location: string
  ): Promise<UserRegistrationResponse[]> => {
    return await fetchService<UserRegistrationResponse[]>({
      method: "GET",
      endpoint: `/user/register/location/${location}`,
      schema: userRegistrationResponseArraySchema
    });
  },
};
