

export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = "https://wnfdesignstudio.com";

  // Static pages
  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: "monthly" },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${baseUrl}/projects`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: "yearly" },
  ];

  // Project pages — apne sare project IDs yahan add karo
  const projectIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const projectPages = projectIds.map((id) => ({
    url: `${baseUrl}/projects/${id}`,
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: new Date(),
  }));

  return [
    ...staticPages.map((page) => ({
      ...page,
      lastModified: new Date(),
    })),
    ...projectPages,
  ];
}