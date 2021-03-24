export default function getCurrentFullUrl() {
  if (process.env.NODE_ENV == "development")
    return "http://localhost:3000/dummy_full_url";
  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
}
