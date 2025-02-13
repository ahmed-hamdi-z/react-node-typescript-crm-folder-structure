// src/components/ToggleButton.tsx
import React from "react";
import { ToggleButtonProps } from "@/interfaces/dashboard/toggles-interface";


const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  isActive,
  onClick,
  icon,
}) => {
  return (
    <button
      type="button"
      className={`${
        isActive ? "btn-primary" : "btn-outline-primary"
      } btn flex items-center`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

export default ToggleButton;