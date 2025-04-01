interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

export const Button = ({
  children,
  onClick,
  disabled,
  variant = "primary",
}: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded-lg transition-all font-semibold";

  const primaryStyles = "bg-blue-600 hover:bg-blue-700 text-white";
  const secondaryStyles =
    "bg-slate-300 hover:bg-slate-400 text-slate-900 border border-slate-500";
  const disabledStyles = "bg-slate-400 cursor-not-allowed text-gray-700";

  const buttonStyles = disabled
    ? `${baseStyles} ${disabledStyles}`
    : `${baseStyles} ${
        variant === "primary" ? primaryStyles : secondaryStyles
      }`;

  return (
    <button onClick={onClick} disabled={disabled} className={buttonStyles}>
      {children}
    </button>
  );
};
