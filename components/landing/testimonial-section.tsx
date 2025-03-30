import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export function TestimonialSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Trusted by Restaurant Owners Nationwide
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See how BiteBaseAI has helped restaurant entrepreneurs make better decisions and build successful
              businesses.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard
            quote="BiteBaseAI helped us identify the perfect location for our Italian restaurant. The demographic and competitor analysis was spot on, and we're now exceeding our revenue projections by 20%."
            author="Michael Rodriguez"
            role="Owner, Bella Cucina"
            location="Chicago, IL"
          />
          <TestimonialCard
            quote="The market insights from BiteBaseAI were invaluable. We adjusted our menu and pricing based on their recommendations and saw an immediate 15% increase in average check size."
            author="Sarah Johnson"
            role="Co-founder, Urban Plate"
            location="Seattle, WA"
          />
          <TestimonialCard
            quote="As a first-time restaurant owner, I was overwhelmed by the market research process. BiteBaseAI simplified everything and gave me the confidence to move forward with my business plan."
            author="David Chen"
            role="Owner, Spice House"
            location="Austin, TX"
          />
          <TestimonialCard
            quote="The geospatial analysis helped us identify an underserved neighborhood that our competitors had overlooked. Six months in, and we're already planning our second location."
            author="Jennifer Williams"
            role="CEO, Fresh Bites Cafe"
            location="Denver, CO"
          />
          <TestimonialCard
            quote="We used BiteBaseAI to analyze three potential locations for our new restaurant. The data clearly showed which one had the best combination of foot traffic, demographics, and competitive landscape."
            author="Robert Thompson"
            role="Director, Culinary Ventures"
            location="Miami, FL"
          />
          <TestimonialCard
            quote="The financial projections were remarkably accurate. Our actual first-year performance was within 8% of what BiteBaseAI predicted based on the location and concept."
            author="Lisa Martinez"
            role="CFO, Taste Collective"
            location="Portland, OR"
          />
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  location: string
}

function TestimonialCard({ quote, author, role, location }: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <Quote className="h-8 w-8 text-primary/40" />
        <p className="mt-4 text-pretty">{quote}</p>
        <div className="mt-6 flex items-center">
          <div className="h-10 w-10 rounded-full bg-muted"></div>
          <div className="ml-4">
            <p className="text-sm font-medium">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

