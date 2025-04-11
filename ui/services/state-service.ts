import { fetchService } from "./fetch";
import { State } from "../types/state";

export const stateService = {
  getAllStates: async (): Promise<State[]> => {
    return await fetchService({ method: "GET", endpoint: "/states" });
  },

  getStateById: async (id: number): Promise<State> => {
    return await fetchService({ method: "GET", endpoint: `/states/${id}` });
  },

  searchStates: async (query: string): Promise<State[]> => {
    const all = await stateService.getAllStates();
    return all.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      (s.nameTelugu?.includes(query) ?? false)
    );
  }
};
