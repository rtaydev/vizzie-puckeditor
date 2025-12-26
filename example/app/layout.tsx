import type { Metadata } from "next";
import "@puck-editor/nextjs/styles";
import "./globals.css";

export const metadata: Metadata = {
  title: "Puck Editor Example",
  description: "Example Next.js app using @puck-editor/nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

