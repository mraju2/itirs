"use client";

import React from "react";
import { FloatingWrapper } from "./floating-wrapper";
import { InfoIcon } from "@/icons/info-icon";

interface SearchTooltipProps {
  keys: string[];
  examples?: string[];
  className?: string;
}

export const SearchTooltip: React.FC<SearchTooltipProps> = ({
  keys,
  examples = [],
  className = "",
}) => {
  return (
    <FloatingWrapper
      mode="hover"
      placement="bottom-start"
      renderTrigger={(props, ref) => (
        <button
          {...props}
          type="button"
          ref={ref as React.Ref<HTMLButtonElement>}
          className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-indigo-600"
        >
            <InfoIcon className="w-3.5 h-3.5" />
        </button>
      )}
      renderContent={() => (
        <div className="text-xs text-gray-700 w-64">
          <strong>Search Tips:</strong>
          <br />• Use <code>key:value</code> format
          <br />• Separate with commas
          <br />
          <br />
          {examples.length > 0 && (
            <>
              <strong>Examples:</strong>
              <br />
              {examples.map((ex, i) => (
                <div key={i}>
                  <code>{ex}</code>
                </div>
              ))}
              <br />
            </>
          )}
          <strong>Keys:</strong>{" "}
          {keys.map((key, i) => (
            <span key={i}>
              {key}
              {i < keys.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      )}
      className={className}
    />
  );
};
