import fetchService from "./fetch";
import { JobPost, JobPostCreate, JobPostUpdate, JobPostStatus, JobApplicationCreate, JobApplication } from "../types/jobpost"
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
    return await fetchService({ method: "GET", endpoint: "jobposts" });
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
    try {
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
        endpoint: `jobposts/paginated?${params.toString()}`,
      });
    } catch (error) {
      console.error("Error fetching paginated jobs:", error);
      throw error;
    }
  },

  /**
   * Get a single job post by ID
   * @param id - Job post ID
   */
  getJobById: async (id: string): Promise<JobPost> => {
    try {
      return await fetchService({
        method: "GET",
        endpoint: `jobposts/${id}`,
      });
    } catch (error) {
      console.error(`Error fetching job with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new job post
   * @param data - JobPostDto object
   */
  createJob: async <T = JobPostResponse>(data: JobPostCreate): Promise<T> => {
    try {
      return await fetchService<T>({
        method: "POST",
        endpoint: "jobposts",
        body: JSON.parse(JSON.stringify(data)),
        contentType: "application/json",
      });
    } catch (error) {
      console.error("Error creating job:", error);
      throw error;
    }
  },

  /**
   * Update an existing job post
   * @param id - Job post ID
   * @param data - Updated JobPostDto
   */
  updateJob: async <T = JobPostResponse>(id: string, data: JobPostUpdate): Promise<T> => {
    try {
      return await fetchService<T>({
        method: "PUT",
        endpoint: `jobposts/${id}`,
        body: JSON.parse(JSON.stringify(data)),
        contentType: "application/json",
      });
    } catch (error) {
      console.error(`Error updating job with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a job post
   * @param id - Job post ID
   */
  deleteJob: async (id: number): Promise<void> => {
    try {
      return await fetchService({
        method: "DELETE",
        endpoint: `jobposts/${id}`,
      });
    } catch (error) {
      console.error(`Error deleting job with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Update the status of a job post
   * @param jobPostId - Job post ID
   * @param status - New status for the job post
   * @param changedBy - User performing the action
   */
  updateJobPostStatus: async (
    jobPostId: string,
    status: JobPostStatus,
    changedBy: string | null = null
  ): Promise<void> => {
    try {
      const payload = {
        jobPostId,
        status,
        changedBy,
      };

      return await fetchService({
        method: "PATCH",
        endpoint: "jobposts/status",
        body: JSON.parse(JSON.stringify(payload)),
        contentType: "application/json",
      });
    } catch (error) {
      console.error(`Error updating job status for ID ${jobPostId}:`, error);
      throw error;
    }
  },


   /**
   * Submit a job application
   * @param application - Job application details
   */
  applyForJob: async (application: JobApplicationCreate): Promise<void> => {
    try {
      await fetchService({
        method: 'POST',
        endpoint: 'jobapplications',
        body: JSON.parse(JSON.stringify(application)),
        contentType: 'application/json',
      });
    } catch (error) {
      console.error('Error submitting job application:', error);
      throw error;
    }
  },

  /**
   * Get applications for a specific job post
   * @param jobId - Job post ID
   */
  getApplicationsByJobId: async (jobId: string): Promise<JobApplication[]> => {
    try {
      return await fetchService<JobApplication[]>({
        method: "GET",
        endpoint: `jobapplications/job/${jobId}`,
      });
    } catch (error) {
      console.error(`Error fetching applications for job ID ${jobId}:`, error);
      throw error;
    }
  },
};
