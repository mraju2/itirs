import fetchService from "./fetch";
import { JobPost } from "../types/jobPost";
import { JobPostCreate } from "../types/JobPostCreate";
export type JobPostResponse = JobPost & {
  id: number;
  createdAt?: string;
  updatedAt?: string;
};

export type PaginatedResult<T> = {
  items: T[];
  totalCount: number;
};

export const jobPostService = {
  /**
   * Get all job posts
   */
  getAllJobs: async (): Promise<JobPostResponse[]> => {
    return await fetchService({ method: "GET", endpoint: "/api/jobposts" });
  },

  /**
   * Get paginated job posts with search, filters, and sorting
   * @param pageNumber - Current page number
   * @param pageSize - Number of items per page
   * @param searchTerm - Search term for filtering job posts
   * @param filters - Additional filters as key-value pairs
   * @param sortBy - Property to sort by
   * @param isDescending - Whether to sort in descending order
   */
  getPaginatedJobs: async (
    pageNumber: number,
    pageSize: number,
    searchTerm?: string,
    filters?: Record<string, string>,
    sortBy?: string,
    isDescending: boolean = false
  ): Promise<PaginatedResult<JobPost>> => {
    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      ...(searchTerm && { searchTerm }),
      ...(sortBy && { sortBy }),
      isDescending: isDescending.toString(),
    });

    // Add filters to the query parameters
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        params.append(`filters[${key}]`, value);
      });
    }

    return await fetchService({
      method: "GET",
      endpoint: `/jobposts/paginated?${params.toString()}`,
    });
  },

  /**
   * Get a single job post by ID
   * @param id - Job post ID
   */
  getJobById: async (id: number): Promise<JobPost> => {
    return await fetchService({
      method: "GET",
      endpoint: `/api/jobposts/${id}`,
    });
  },

  /**
   * Create a new job post
   * @param data - JobPostDto object
   */
  createJob: async <T = JobPostResponse>(data: JobPostCreate): Promise<T> => {
    return await fetchService<T>({
      method: "POST",
      endpoint: "/jobposts",
      body: JSON.parse(JSON.stringify(data)),
      contentType: "application/json",
    });
  },

  /**
   * Update an existing job post
   * @param id - Job post ID
   * @param data - Updated JobPostDto
   */
  updateJob: async <T = JobPostResponse>(id: string, data: JobPost): Promise<T> => {
    return await fetchService<T>({
      method: "PUT",
      endpoint: `/api/jobposts/${id}`,
      body: JSON.parse(JSON.stringify(data)),
      contentType: "application/json",
    });
  },

  /**
   * Delete a job post
   * @param id - Job post ID
   */
  deleteJob: async (id: number): Promise<void> => {
    return await fetchService({
      method: "DELETE",
      endpoint: `/api/jobposts/${id}`,
    });
  },
};
