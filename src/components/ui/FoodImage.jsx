export default function FoodImage({ src, alt = "", className = "" }) {
  return <img src={src} alt={alt} loading="lazy" className={`bg-line object-cover text-transparent ${className}`} />;
}
