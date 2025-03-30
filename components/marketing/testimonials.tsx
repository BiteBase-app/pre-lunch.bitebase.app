"use client"

import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Testimonials() {
  const { t } = useTranslation()

  const testimonials = [
    {
      name: "Alex Johnson",
      role: t("testimonials.roles.owner"),
      content: t("testimonials.quotes.alex"),
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
    },
    {
      name: "Sarah Chen",
      role: t("testimonials.roles.manager"),
      content: t("testimonials.quotes.sarah"),
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SC",
    },
    {
      name: "Miguel Rodriguez",
      role: t("testimonials.roles.chef"),
      content: t("testimonials.quotes.miguel"),
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MR",
    },
    {
      name: "Priya Patel",
      role: t("testimonials.roles.franchise"),
      content: t("testimonials.quotes.priya"),
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PP",
    },
  ]

  return (
    <section id="testimonials" className="bg-muted/50 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("testimonials.title")}</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
              {t("testimonials.subtitle")}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 pt-12 md:grid-cols-2 lg:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-none bg-background shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

