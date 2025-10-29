const Badge = ({ children, className = "", variant }) => {
  const base =
    variant === "secondary"
      ? "bg-gray-100 text-gray-800"
      : "bg-red-100 text-red-700";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${base} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge