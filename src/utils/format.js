// "350 SYP" / "720SYP" / 450  ->  350 / 720 / 450
export const parsePrice = (value) =>
  typeof value === "number"
    ? value
    : Number(String(value).replace(/[^\d.]/g, "")) || 0;

// 1250 -> "1,250 SYP"
export const formatPrice = (amount) =>
  `${Number(amount).toLocaleString("en-US")} SYP`;

// "Chicken Shawarma Wrap" -> "chicken-shawarma-wrap"
export const slugify = (text) =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
