import { useState } from "react";

// Shows the photo, or a soft emoji box if the image is missing / fails to load.
export default function FoodImage({ src, emoji = "🍽️", alt = "", className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-primary/10 text-5xl ${className}`} aria-label={alt}>
        {emoji}
      </div>
    );
  }

  return <img src={src} alt={alt} onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}
