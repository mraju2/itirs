import React from "react";
import { Checkbox } from "./check-box";

interface CheckBoxGroupProps {
  title: string;
  options: string[];
  groupKey: string; // for ID prefix
}

export const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({
  title,
  options,
  groupKey,
}) => (
  <div className="mb-5">
    <h4 className="font-medium mb-3">{title}</h4>
    {options.map((option, index) => (
      <Checkbox key={index} id={`${groupKey}-${index}`} label={option} />
    ))}
  </div>
);
