// robots .ts file for nextjs excluding all admin pages and including all of the rest of the pages

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
  };
}
