import type { Metadata } from "next";
import { buildPageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("blog");
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



