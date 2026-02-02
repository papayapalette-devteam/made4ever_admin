const Button = ({ children, className = "", variant, size, ...props }) => {
  const base =
    "flex items-center justify-center font-medium rounded-lg transition-all";
  const styles =
    variant === "outline"
      ? "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
      : "bg-red-600 text-white hover:bg-red-700";
  const padding = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2";
  return (
    <button className={`${base} ${styles} ${padding} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button