import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abinashswain.dev"),
  title: "Abinash Swain | Senior Full Stack Developer & Systems Architect",
  description:
    "Portfolio of Abinash Swain — Full Stack Engineer specializing in React.js, Next.js, Node.js, GCP, MariaDB, Redis, and Event-Driven Microservices. 3+ years production experience in high-concurrency systems and healthcare platforms.",
  keywords: [
    "Abinash Swain",
    "Full Stack Developer",
    "Next.js Developer",
    "React.js Developer",
    "Node.js Microservices",
    "GCP Cloud Engineer",
    "TypeScript Architect",
    "Bangalore Full Stack Developer",
    "Healthcare SaaS Engineer",
    "Swastyam",
  ],
  authors: [{ name: "Abinash Swain", url: "https://abinashswain.dev" }],
  creator: "Abinash Swain",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abinashswain.dev",
    title: "Abinash Swain | Senior Full Stack Developer & Systems Architect",
    description:
      "Full Stack Engineer specializing in Next.js, Node.js, TypeScript, GCP, Redis caching, and microservices architecture.",
    siteName: "Abinash Swain Portfolio",
    images: [
      {
        url: "/images/abinash-swain.png",
        width: 800,
        height: 800,
        alt: "Abinash Swain - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abinash Swain | Senior Full Stack Developer",
    description:
      "React.js • Next.js • Node.js • GCP • Redis • Microservices Architecture",
    images: ["/images/abinash-swain.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abinash Swain",
  jobTitle: "Full Stack Developer",
  url: "https://abinashswain.dev",
  image: "https://abinashswain.dev/images/abinash-swain.png",
  sameAs: [
    "https://github.com/swain-abinash",
    "https://linkedin.com/in/swain-abinash",
    "https://npmjs.com/package/@abinashswain/node-developer-toolkit",
  ],
  knowsAbout: [
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "TypeScript",
    "MariaDB",
    "PostgreSQL",
    "Redis",
    "GCP",
    "Docker",
    "Microservices Architecture",
    "CI/CD",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Biju Patnaik University of Technology",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[var(--color-bg)] text-[var(--color-text)]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
