import fetchService from "./fetch";
import { Company,CompanyCreate, CompanyUpdate } from "../types/company";
import { PaginatedResult } from "../types/pagination"; // adjust path as needed


export type CompanyResponse = Company & {
  id: string;
  createdAt?: string;
  updatedAt?: string;
};

export const companyService = {
  /**
   * Fetch all companies
   */
  getAllCompanies: async (): Promise<CompanyResponse[]> => {
    return await fetchService({ method: "GET", endpoint: "/Companies" });
  },


  /**
 * Search companies by query string
 * @param query - search keyword
 */
searchCompanies: async (query: string): Promise<{ id: string; name: string }[]> => {
  return await fetchService({
    method: "GET",
    endpoint: `/Companies/search?query=${encodeURIComponent(query)}`,
  });
},


  /**
 * Fetch paginated companies with optional search, sorting, and filters
 */
  getPaginatedCompanies: async (
    pageNumber: number,
    pageSize: number,
    searchTerm: string = "",
    sortBy: string = "",
    isDescending: boolean = false,
    filters: Record<string, string> = {}
  ) => {
    const params = new URLSearchParams();

    // Append query parameters
    params.append("pageNumber", pageNumber.toString());
    params.append("pageSize", pageSize.toString());
    if (searchTerm) params.append("searchTerm", searchTerm);
    if (sortBy) params.append("sortBy", sortBy);
    params.append("isDescending", isDescending.toString());

    // Append filters: filters[city]=value
    for (const [key, value] of Object.entries(filters)) {
      params.append(`filters[${key}]`, value);
    }

    try {
      const response = await fetchService({
        method: "GET",
        endpoint: `/Companies/paginated?${params.toString()}`,
      });

      const result = response as PaginatedResult<Company>;
      return result;

    } catch (error) {
      console.error("Failed to fetch paginated companies:", error);

      // Optional fallback (UI-friendly empty result)
      return {
        items: [],
        totalCount: 0,
      };
    }
  },




  /**
   * Fetch a company by ID
   * @param id - Company ID
   */
  getCompanyById: async (id: string): Promise<CompanyResponse> => {
    return await fetchService({ method: "GET", endpoint: `/Companies/${id}` });
  },

  /**
   * Create a new company
   * @param data - Company DTO
   */
  createCompany: async <T = CompanyResponse>(data: CompanyCreate): Promise<T> => {
    return await fetchService<T>({
      method: "POST",
      endpoint: "/Companies",
      body: JSON.parse(JSON.stringify(data)),
      contentType: "application/json",
    });
  },

  /**
   * Update a company
   * @param id - Company ID
   * @param data - Company DTO
   */
  updateCompany: async <T = CompanyResponse>(id: string, data: CompanyUpdate): Promise<T> => {
    return await fetchService<T>({
      method: "PUT",
      endpoint: `/Companies/${id}`,
      body: JSON.parse(JSON.stringify(data)),
      contentType: "application/json",
    });
  },

  /**
   * Delete a company by ID
   * @param id - Company ID
   */
  deleteCompany: async (id: string): Promise<void> => {
    return await fetchService({
      method: "DELETE",
      endpoint: `/api/Companies/${id}`,
    });
  },
};
