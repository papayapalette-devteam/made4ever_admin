const Card = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-sm ${className || ""}`}>{children}</div>
);

export default Card