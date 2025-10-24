import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/components/core/HeaderWrapper";
import FooterWrapper from "@/components/core/FooterWrapper";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Client Website",
	description: "Client Website",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<script dangerouslySetInnerHTML={{ __html: `window.__clipara = {};window.__clipara.organisationId = 1666;` }} />
				<script defer src="https://widget.getclipara.com/widget.js" type="text/javascript" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
				<HeaderWrapper />
				<main className="">{children}</main>
				<FooterWrapper />

			</body>
		</html>
	);
}
