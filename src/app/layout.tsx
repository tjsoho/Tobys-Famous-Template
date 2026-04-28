import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import HeaderWrapper from "@/components/core/HeaderWrapper";
import FooterWrapper from "@/components/core/FooterWrapper";
import Analytics from "@/components/Analytics";
import TrackingScripts from "@/components/TrackingScripts";
import HoldPage from "@/components/HoldPage";
import { fetchSiteSettings } from "@/data/site-settings";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

// Per-page metadata is generated via generateMetadata() in each page.tsx.

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const hdrs = await headers();
	const pathname = hdrs.get("x-pathname") ?? "";
	const isAdmin = pathname.startsWith("/admin");

	const settings = await fetchSiteSettings();
	const showHoldPage = settings.holdpage_enabled && !isAdmin;

	return (
		<html lang="en">
			<head>
				{showHoldPage ? (
					<meta name="robots" content="noindex, nofollow" />
				) : (
					<meta
						name="robots"
						content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
					/>
				)}
				<script dangerouslySetInnerHTML={{ __html: `window.__clipara = {};window.__clipara.organisationId = 1666;` }} />
				<script defer src="https://widget.getclipara.com/widget.js" type="text/javascript" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased ${showHoldPage ? "overflow-hidden" : ""}`}
			>
				<Toaster
					position="top-right"
					toastOptions={{
						duration: 3000,
						style: {
							background: '#000',
							color: '#fff',
							border: '1px solid rgba(255, 255, 255, 0.2)',
						},
					}}
				/>

				{showHoldPage ? (
					<HoldPage
						title={settings.holdpage_title}
						subtitle={settings.holdpage_subtitle}
						imageUrl={settings.holdpage_image_url}
					/>
				) : (
					<>
						<Suspense fallback={null}>
							<Analytics
								enabled={process.env.NODE_ENV === "production"}
								debounce={300}
							/>
						</Suspense>
						<Suspense fallback={null}>
							<TrackingScripts />
						</Suspense>
						<HeaderWrapper />
						<main className="">{children}</main>
						<FooterWrapper />
					</>
				)}
			</body>
		</html>
	);
}
