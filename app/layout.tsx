import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display as PlayfairDisplay, EB_Garamond as EBGaramond } from "next/font/google"
import "./globals.css"
import "./embedded-chat-widget.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import N8nChatWidget from "@/components/n8n-chat-widget"

const playfair = PlayfairDisplay({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const garamond = EBGaramond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Clean Machine Mobile Detailing | Premium Automotive Care",
  description:
    "Exceptional automotive detailing services delivered with meticulous attention to detail and white-glove service.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add custom styles for the n8n chat button */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          /* Custom styles for n8n chat button */
          .n8n-chat-button {
            background-color: #5E1514 !important; /* burgundy color from your theme */
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2) !important;
          }
          
          .n8n-chat-button:hover {
            background-color: #7a1c1a !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25) !important;
          }
          
          /* Ensure the chat window has the right styling */
          .n8n-chat-window-header {
            background-color: #0F2C52 !important; /* navy-dark color from your theme */
          }
        `,
          }}
        />
      </head>
      <body className={`${playfair.variable} ${garamond.variable} font-garamond bg-ivory text-navy-dark`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <N8nChatWidget />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
