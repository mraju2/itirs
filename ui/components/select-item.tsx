import React, { ReactNode } from "react";

interface SelectItemProps {
  value: string; // The value of the select item (used for type checking)
  children: ReactNode; // The content to display inside the item
  onClick: () => void; // Function to call when the item is clicked
}

export const SelectItem = ({ children, onClick }: SelectItemProps) => {
  return (
    <div className="p-2 cursor-pointer hover:bg-gray-100" onClick={onClick}>
      {children}
    </div>
  );
};
