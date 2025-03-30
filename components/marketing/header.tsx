"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { usePathname } from "next/navigation"
import { Menu, X, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export function Header() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <Utensils className="h-6 w-6 text-primary" />
            <span className="font-display font-bold">{t("common.appName")}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/#features" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {t("common.features")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/#pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {t("common.pricing")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t("common.testimonials")}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/40 to-primary p-6 no-underline outline-none focus:shadow-md"
                          href="/#testimonials"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">{t("common.testimonials")}</div>
                          <p className="text-sm leading-tight text-white/90">
                            See what our customers are saying about BiteBase
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/#testimonials/restaurants"
                        >
                          <div className="text-sm font-medium leading-none">Restaurants</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Success stories from restaurants using BiteBase
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/#testimonials/cafes"
                        >
                          <div className="text-sm font-medium leading-none">Cafes</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Success stories from cafes using BiteBase
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/#faq" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t("common.faq")}</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost">{t("common.login")}</Button>
            </Link>
            <Link href="/subscribe">
              <Button>{t("common.startTrial")}</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden p-4 border-t">
          <nav className="flex flex-col space-y-4">
            <Link href="/#features" className="px-2 py-1 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
              {t("common.features")}
            </Link>
            <Link href="/#pricing" className="px-2 py-1 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
              {t("common.pricing")}
            </Link>
            <Link
              href="/#testimonials"
              className="px-2 py-1 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("common.testimonials")}
            </Link>
            <Link href="/#faq" className="px-2 py-1 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
              {t("common.faq")}
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  {t("common.login")}
                </Button>
              </Link>
              <Link href="/subscribe" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full">{t("common.startTrial")}</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

