import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "STAIT Unapologetically Strong",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
