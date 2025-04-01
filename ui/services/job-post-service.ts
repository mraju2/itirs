import fetchService from "./fetch";
import { JobPost } from "../types/jobpost";

export type JobPostResponse = JobPost & {
  id: number;
  createdAt?: string;
  updatedAt?: string;
};

export const jobPostService = {
  /**
   * Get all job posts
   */
  getAllJobs: async (): Promise<JobPostResponse[]> => {
    return await fetchService({ method: "GET", endpoint: "/api/jobposts" });
  },

  /**
   * Get a single job post by ID
   * @param id - Job post ID
   */
  getJobById: async (id: number): Promise<JobPostResponse> => {
    return await fetchService({ method: "GET", endpoint: `/api/jobposts/${id}` });
  },

  /**
   * Create a new job post
   * @param data - JobPostDto object
   */
  createJob: async <T = JobPostResponse>(data: JobPost): Promise<T> => {
    return await fetchService<T>({
      method: "POST",
      endpoint: "/api/jobposts",
      body: JSON.parse(JSON.stringify(data)),
      contentType: "application/json",
    });
  },

  /**
   * Update an existing job post
   * @param id - Job post ID
   * @param data - Updated JobPostDto
   */
  updateJob: async <T = JobPostResponse>(id: number, data: JobPost): Promise<T> => {
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
