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
        <div className="text-xs text-gray-700 w-72 space-y-2">
          <div>
            <strong className="text-sm">Search Syntax:</strong>
            <ul className="list-disc pl-4 mt-1 space-y-1">
              {[
                { text: "Use basic format", code: "key:value" },
                { text: "Use quotes for spaces", code: 'name:"John Doe"' },
                { text: "Ends with", code: "email:gmail.com%" },
                { text: "Starts with", code: "name:%John" },
                {
                  text: "Multiple filters (comma-separated)",
                  code: 'name:"John", city:Mumbai',
                },
              ].map((item, i) => (
                <li key={i}>
                  {item.text}: <code>{item.code}</code>
                </li>
              ))}
            </ul>
          </div>

          {examples.length > 0 && (
            <div>
              <strong className="text-sm">Examples:</strong>
              <ul className="pl-4 mt-1 list-disc space-y-1">
                {examples.map((ex, i) => (
                  <li key={i}>
                    <code>{ex}</code>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {keys.length > 0 && (
            <div>
              <strong className="text-sm">Available Keys:</strong>
              <div className="mt-1 text-gray-600">{keys.join(", ")}</div>
            </div>
          )}
        </div>
      )}
      className={className}
    />
  );
};
