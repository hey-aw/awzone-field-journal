import type { Metadata } from "next";
import { ThemeProvider } from "@/components/themes/provider";
import { AuthProvider } from "@/components/auth-provider";
import "./globals.css";
import { inter } from "./fonts";

export const metadata: Metadata = {
  title: {
    default: "AWzone",
    template: "%s — AWzone",
  },
  description:
    "A public notebook for experiments, prototypes, and reflections at the intersection of learning, AI, and product design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
