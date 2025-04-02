import fetchService from "./fetch";
import { Company } from "../types/company";

export type CompanyResponse = Company & {
  id: number;
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
   * Fetch a company by ID
   * @param id - Company ID
   */
  getCompanyById: async (id: number): Promise<CompanyResponse> => {
    return await fetchService({ method: "GET", endpoint: `/api/companies/${id}` });
  },

  /**
   * Create a new company
   * @param data - Company DTO
   */
  createCompany: async <T = CompanyResponse>(data: Company): Promise<T> => {
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
  updateCompany: async <T = CompanyResponse>(id: number, data: Company): Promise<T> => {
    return await fetchService<T>({
      method: "PUT",
      endpoint: `/api/companies/${id}`,
      body: JSON.parse(JSON.stringify(data)),
      contentType: "application/json",
    });
  },

  /**
   * Delete a company by ID
   * @param id - Company ID
   */
  deleteCompany: async (id: number): Promise<void> => {
    return await fetchService({
      method: "DELETE",
      endpoint: `/api/companies/${id}`,
    });
  },
};
