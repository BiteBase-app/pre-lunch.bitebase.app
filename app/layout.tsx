import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProviderWrapper } from "@/components/auth-provider-wrapper"
import { I18nProvider } from "@/components/i18n-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BiteBase - Restaurant Business Intelligence",
  description: "Powerful analytics and insights for your restaurant business",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviderWrapper>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <I18nProvider>
              {children}
            </I18nProvider>
          </ThemeProvider>
        </AuthProviderWrapper>
      </body>
    </html>
  )
}

