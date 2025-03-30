"use client"

import { useTranslation } from "react-i18next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function Faq() {
  const { t } = useTranslation()

  const faqs = [
    {
      question: t("faq.questions.what"),
      answer: t("faq.answers.what"),
    },
    {
      question: t("faq.questions.how"),
      answer: t("faq.answers.how"),
    },
    {
      question: t("faq.questions.data"),
      answer: t("faq.answers.data"),
    },
    {
      question: t("faq.questions.support"),
      answer: t("faq.answers.support"),
    },
    {
      question: t("faq.questions.cancel"),
      answer: t("faq.answers.cancel"),
    },
  ]

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("faq.title")}</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">{t("faq.subtitle")}</p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl pt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

