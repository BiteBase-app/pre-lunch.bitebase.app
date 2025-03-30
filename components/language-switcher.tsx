"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [mounted, setMounted] = useState(false)

  // Languages supported by the application
  const languages = [
    { code: "en", name: "English" },
    { code: "th", name: "ไทย" },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    localStorage.setItem("language", lng)
  }

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="h-9 w-9 rounded-md px-0">
        <Globe className="h-4 w-4" />
        <span className="sr-only">Toggle language</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 rounded-md px-3">
          <Globe className="mr-2 h-4 w-4" />
          {languages.find((lang) => lang.code === i18n.language)?.name || "English"}
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className="flex items-center justify-between"
          >
            {language.name}
            {i18n.language === language.code && <Check className="ml-2 h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

