import { fetchService } from "./fetch";
import { District } from "../types/district";

export const districtService = {
  getDistrictById: async (id: number): Promise<District> => {
    return await fetchService({ method: "GET", endpoint: `/districts/${id}` });
  },

  getDistrictsByStateId: async (stateId: number): Promise<District[]> => {
    return await fetchService({ method: "GET", endpoint: `/districts/state/${stateId}` });
  },

  searchDistrictsByState: async (stateId: number, query: string): Promise<District[]> => {
    const districts = await districtService.getDistrictsByStateId(stateId);
    return districts.filter(d =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      (d.nameTelugu?.includes(query) ?? false)
    );
  }
};
