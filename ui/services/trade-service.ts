import { fetchService } from "./fetch";
import { Trade } from "../types/trade";

interface RawTrade {
  tradeId: number;
  tradeName: string;
  tradeNameTelugu: string;
}

export const tradeService = {
  // ✅ Fetch all trades and map to Trade[]
  getAllTrades: async (): Promise<Trade[]> => {
    const rawData = await fetchService({
      method: "GET",
      endpoint: "/Trades",
    }) as RawTrade[];

    return rawData.map((t) => ({
      id: t.tradeId.toString(),
      name: t.tradeName,
      nameInTelugu: t.tradeNameTelugu,
    }));
  },

  // ✅ Fetch trade by ID and map to Trade
  getTradeById: async (id: number): Promise<Trade> => {
    const t = await fetchService({
      method: "GET",
      endpoint: `/Trades/${id}`,
    }) as RawTrade;

    return {
      id: t.tradeId.toString(),
      name: t.tradeName,
      nameInTelugu: t.tradeNameTelugu,
    };
  },

  // ✅ Search trades (by English or Telugu name)
  searchTrades: async (query: string): Promise<Trade[]> => {
    const all = await tradeService.getAllTrades();
    return all.filter((t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      (t.nameInTelugu?.includes(query) ?? false)
    );
  },
};
