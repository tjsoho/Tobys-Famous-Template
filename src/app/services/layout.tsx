import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Services",
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
