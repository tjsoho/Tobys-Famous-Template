import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Work",
};

export default function WorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
