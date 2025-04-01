import React, { useState, ReactNode, cloneElement, ReactElement } from "react";

interface CustomSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  children: ReactNode;
  className?: string;
}

interface SelectItemProps {
  value: string;
  children: ReactNode;
  onClick: () => void;
}

export const CustomSelect = ({
  value,
  onValueChange,
  placeholder,
  children,
  className,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="flex items-center justify-between p-2 border rounded cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || placeholder}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
          {React.Children.map(children, (child) =>
            cloneElement(child as ReactElement<SelectItemProps>, {
              onClick: () => handleSelect((child as ReactElement<SelectItemProps>).props.value),
            })
          )}
        </div>
      )}
    </div>
  );
};