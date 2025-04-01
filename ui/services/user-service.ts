import fetchService from "./fetch";
import { UserRegistrationData } from "../types/user";

export type UserRegistrationRequest = {
  endpoint: string;
  data?: Record<string, unknown> | FormData;
  isFormData?: boolean;
  headers?: Record<string, string>;
};

export type UserRegistrationResponse = {
  id: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  dateOfBirth: number;
  trade: string;
  otherTrade?: string;
  address: string;
  mandal: string;
  district: string;
  passYear: number;
  percentage: number;
  experience: string;
  salaryExpectation: number;
  workLocation: string;
  phoneNumber: string;
  email: string;
  itiName: string;
  about: string;
  createdAt: string;
  updatedAt: string;
};

export const userService = {
  /**
   * Fetch all user registrations from the API
   */
  getAllRegistrations: async (): Promise<UserRegistrationResponse[]> => {
    return await fetchService({ method: "GET", endpoint: "/user" });
  },

  /**
   * Fetch a single user registration by ID
   * @param id - The ID of the user registration
   */
  getRegistrationById: async (
    id: string
  ): Promise<UserRegistrationResponse> => {
    return await fetchService({
      method: "GET",
      endpoint: `/user/register/${id}`,
    });
  },

  /**
   * Create a new user registration (JSON Object only)
   * @param data - User registration data as JSON
   */
  createRegistration: async <T = UserRegistrationResponse>(
    data: UserRegistrationData
  ): Promise<T> => {
    return await fetchService<T>({
      method: "POST",
      endpoint: "/User",
      body: JSON.parse(JSON.stringify(data)),
      contentType: "application/json",
    });
  },

  /**
   * Update an existing user registration by ID (JSON Object only)
   * @param id - The ID of the user registration to update
   * @param data - Updated user registration data as JSON
   */
  updateRegistration: async <T = UserRegistrationResponse>(
    id: string,
    data: UserRegistrationData
  ): Promise<T> => {
    return await fetchService<T>({
      method: "PUT",
      endpoint: `/user/register/${id}`,
      body: JSON.parse(JSON.stringify(data)),
      contentType: "application/json",
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
    return await fetchService({
      method: "GET",
      endpoint: `/user/register/trade/${trade}`,
    });
  },

  /**
   * Fetch user registrations filtered by district
   * @param district - The district to filter by
   */
  getRegistrationsByDistrict: async (
    district: string
  ): Promise<UserRegistrationResponse[]> => {
    return await fetchService({
      method: "GET",
      endpoint: `/user/register/district/${district}`,
    });
  },

  /**
   * Fetch user registrations filtered by work location
   * @param location - The work location to filter by
   */
  getRegistrationsByWorkLocation: async (
    location: string
  ): Promise<UserRegistrationResponse[]> => {
    return await fetchService({
      method: "GET",
      endpoint: `/user/register/location/${location}`,
    });
  },
};
