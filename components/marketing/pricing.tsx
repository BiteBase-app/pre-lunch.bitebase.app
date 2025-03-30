"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export function Pricing() {
  const { t } = useTranslation()
  const [isAnnual, setIsAnnual] = useState(true)

  const plans = [
    {
      name: t("pricing.starter.name"),
      description: t("pricing.starter.description"),
      price: isAnnual ? "$29" : "$39",
      duration: isAnnual ? t("pricing.annually") : t("pricing.monthly"),
      features: [
        t("pricing.starter.features.basic"),
        t("pricing.starter.features.reports"),
        t("pricing.starter.features.users", { count: 3 }),
        t("pricing.starter.features.support"),
      ],
      cta: t("pricing.starter.cta"),
      popular: false,
    },
    {
      name: t("pricing.professional.name"),
      description: t("pricing.professional.description"),
      price: isAnnual ? "$79" : "$99",
      duration: isAnnual ? t("pricing.annually") : t("pricing.monthly"),
      features: [
        t("pricing.professional.features.everything"),
        t("pricing.professional.features.ai"),
        t("pricing.professional.features.users", { count: 10 }),
        t("pricing.professional.features.priority"),
        t("pricing.professional.features.api"),
      ],
      cta: t("pricing.professional.cta"),
      popular: true,
    },
    {
      name: t("pricing.enterprise.name"),
      description: t("pricing.enterprise.description"),
      price: t("pricing.enterprise.price"),
      duration: "",
      features: [
        t("pricing.enterprise.features.everything"),
        t("pricing.enterprise.features.dedicated"),
        t("pricing.enterprise.features.unlimited"),
        t("pricing.enterprise.features.training"),
        t("pricing.enterprise.features.custom"),
      ],
      cta: t("pricing.enterprise.cta"),
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("pricing.title")}</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">{t("pricing.subtitle")}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={cn("text-sm", !isAnnual && "font-medium")}>{t("pricing.monthly")}</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span className={cn("text-sm", isAnnual && "font-medium")}>{t("pricing.annually")}</span>
            <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
              {t("pricing.save")}
            </span>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 pt-12 md:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn("flex flex-col", plan.popular && "border-primary shadow-md dark:border-primary")}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  {t("pricing.popular")}
                </div>
              )}
              <CardHeader className="flex-1">
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.duration && (
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">{plan.duration}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

