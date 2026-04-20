// src/app/robots.js
// ✅ Yeh file NEW create karo — Google crawler ke liye instructions

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://wnfdesignstudio.com/sitemap.xml",
    host: "https://wnfdesignstudio.com",
  };
}