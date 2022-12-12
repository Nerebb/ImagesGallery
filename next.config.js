/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  env: {
    URL: "https://xzlqgrispmodapsargkl.supabase.co",
    SERVICE_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bHFncmlzcG1vZGFwc2FyZ2tsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MDY0NTYwOSwiZXhwIjoxOTg2MjIxNjA5fQ.FEioxX2It5Rg60XaUjrpdga9PipO6WQIOHQxMZTRyr4",
    REVALIDATE_SECRET: supersecret
  },

  images: {
    domains: ['pbs.twimg.com']
  }
};
