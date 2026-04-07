"use client";

const baseUrl = "https://wnfdesignstudio.com";

/**
 * SEO: Renders JSON-LD structured data for Google rich results.
 * - ArchitectureBusiness: Powers the business knowledge panel
 * - WebSite: Enables sitelinks search box in SERPs
 * - Organization: Associates logo with the brand
 */
const JsonLd = () => {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ArchitectureBusiness",
    name: "WNF Studio",
    image: `${baseUrl}/assets/logo/logo.png`,
    "@id": baseUrl,
    url: baseUrl,
    telephone: "+918530070800",
    email: "info@wnfdesignstudio.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: ["https://www.instagram.com/studio_wnf/"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WNF Studio",
    url: baseUrl,
    publisher: {
      "@type": "Organization",
      name: "WNF Studio",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/assets/logo/logo.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
};

export default JsonLd;
