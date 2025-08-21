import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Star, Quote, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, FinTech Innovations",
      company: "Lagos, Nigeria",
      rating: 5,
      testimonial:
        "Techtasker Solutions transformed our entire payment infrastructure. Their expertise in fintech and understanding of the African market was invaluable. The team delivered beyond our expectations.",
      image: "/placeholder.svg?height=300&width=300",
      project: "Payment Platform Development",
      result: "300% increase in transaction volume",
    },
    {
      name: "Michael Osei",
      role: "CTO, AgriTech Ghana",
      company: "Accra, Ghana",
      rating: 5,
      testimonial:
        "The mobile app they developed for our farmers has revolutionized how we connect with rural communities. The user experience is intuitive, and the backend infrastructure is rock-solid.",
      image: "/placeholder.svg?height=300&width=300",
      project: "Mobile App & IoT Integration",
      result: "50,000+ active farmers onboarded",
    },
    {
      name: "Dr. Amina Hassan",
      role: "Director, HealthCare Plus",
      company: "Nairobi, Kenya",
      rating: 5,
      testimonial:
        "Their telemedicine platform has enabled us to reach patients in remote areas. The security features and compliance with healthcare regulations were handled expertly.",
      image: "/placeholder.svg?height=300&width=300",
      project: "Telemedicine Platform",
      result: "10,000+ remote consultations monthly",
    },
    {
      name: "James Mwangi",
      role: "Founder, EduTech Kenya",
      company: "Mombasa, Kenya",
      rating: 5,
      testimonial:
        "The e-learning platform they built has transformed education in our region. The offline capabilities and multi-language support show their deep understanding of our needs.",
      image: "/placeholder.svg?height=300&width=300",
      project: "E-Learning Platform",
      result: "100,000+ students enrolled",
    },
    {
      name: "Fatima Al-Rashid",
      role: "Operations Manager, LogiFlow",
      company: "Cairo, Egypt",
      rating: 5,
      testimonial:
        "Their supply chain management system has streamlined our operations across 5 countries. The real-time tracking and analytics have improved our efficiency by 40%.",
      image: "/placeholder.svg?height=300&width=300",
      project: "Supply Chain Management System",
      result: "40% improvement in operational efficiency",
    },
    {
      name: "Robert Banda",
      role: "CEO, Mining Solutions Ltd",
      company: "Lusaka, Zambia",
      rating: 5,
      testimonial:
        "The IoT monitoring system they developed has enhanced our mining operations' safety and productivity. Their attention to detail and industry knowledge is exceptional.",
      image: "/placeholder.svg?height=300&width=300",
      project: "IoT Monitoring System",
      result: "25% increase in operational safety",
    },
  ]

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "15+", label: "Countries Served" },
    { number: "24/7", label: "Support Available" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/techtasker-logo.png"
              alt="Techtasker Solutions"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-foreground">Techtasker Solutions</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link href="/testimonials" className="text-sm font-medium text-primary">
              Testimonials
            </Link>
          </nav>

          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            Book Consultation
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-accent/10 text-accent-foreground border-accent/20">
              Client Success Stories
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Trusted by Leaders
              <span className="text-primary block">Across Africa</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover how we've helped businesses across the continent achieve their technology goals and drive
              meaningful growth through innovative solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle className="text-lg font-bold text-foreground">{testimonial.name}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">{testimonial.role}</CardDescription>
                        <CardDescription className="text-xs text-accent">{testimonial.company}</CardDescription>
                      </div>
                    </div>
                    <Quote className="h-6 w-6 text-primary/30 flex-shrink-0" />
                  </div>

                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.testimonial}"</p>

                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {testimonial.project}
                    </Badge>
                    <div className="flex items-center text-sm text-accent">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      {testimonial.result}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent-foreground border-accent/20">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Want to See Detailed Case Studies?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Explore in-depth case studies showcasing our problem-solving approach, technical implementation, and
              measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                View Case Studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 bg-transparent"
                >
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Join Our Success Stories?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how we can help you achieve similar results for your business.
            </p>
            <Link href="/">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Your Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
