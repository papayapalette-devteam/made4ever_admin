const Avatar = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
  />
);

export default Avatar