// components/trade-select.tsx
"use client";

import React, { useEffect, useState } from "react";
import { tradeService } from "@/services/trade-service";
import { Trade } from "@/types/trade";

interface Props {
  value: number[];
  onChange: (selectedIds: number[]) => void;
}

export const TradeAsyncSelect: React.FC<Props> = ({ value, onChange }) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const res = await tradeService.getAllTrades();
        setTrades(res);
      } catch (err) {
        console.error("Failed to load trades:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Trade(s) <span className="block text-xs text-gray-500">ట్రేడ్లు</span>
      </label>
      <select
        multiple
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 h-32"
        value={value.map(String)}
        onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions).map((opt) =>
            parseInt(opt.value)
          );
          onChange(selected);
        }}
      >
        {loading ? (
          <option>Loading...</option>
        ) : (
          trades.map((trade) => (
            <option key={trade.id} value={trade.id} className="text-black">
              {trade.name} {trade.nameInTelugu ? `(${trade.nameInTelugu})` : ""}
            </option>
          ))
        )}
      </select>
      <p className="mt-1 text-xs text-gray-500">
        Hold Ctrl/Cmd to select multiple trades
      </p>
    </div>
  );
};
