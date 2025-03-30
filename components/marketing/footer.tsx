"use client"

import { useTranslation } from "react-i18next"
import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Footer() {
  const { t } = useTranslation()

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">BiteBase</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t("footer.description")}</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">{t("footer.product")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="text-gray-500 hover:text-primary dark:text-gray-400">
                  {t("footer.links.features")}
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-gray-500 hover:text-primary dark:text-gray-400">
                  {t("footer.links.pricing")}
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-gray-500 hover:text-primary dark:text-gray-400">
                  {t("footer.links.testimonials")}
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-500 hover:text-primary dark:text-gray-400">
                  {t("footer.links.faq")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">{t("footer.company")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                  {t("footer.links.about")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                  {t("footer.links.blog")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                  {t("footer.links.careers")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                  {t("footer.links.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">{t("footer.legal")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                  {t("footer.links.terms")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                  {t("footer.links.privacy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                  {t("footer.links.cookies")}
                </Link>
              </li>
              <li>
                <div className="pt-2">
                  <LanguageSwitcher />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            &copy; {currentYear} BiteBase. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}

