import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Code, Database, Cloud, Smartphone, Shield, Zap, ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ServicesPage() {
  const services = [
    {
      icon: Code,
      title: "Custom Software Development",
      description:
        "Tailored applications built with cutting-edge technologies to solve your unique business challenges.",
      features: ["Web Applications", "Mobile Apps", "Desktop Software", "API Development"],
      price: "From ₦2,000,000",
      image: "/images/software-development.png",
    },
    {
      icon: Cloud,
      title: "Cloud Solutions & Migration",
      description: "Seamless cloud transformation with scalable infrastructure and optimized performance.",
      features: ["AWS/Azure Setup", "Cloud Migration", "DevOps Implementation", "Infrastructure as Code"],
      price: "From ₦1,200,000",
      image: "/images/cloud-computing.png",
    },
    {
      icon: Database,
      title: "Data Analytics & Intelligence",
      description: "Transform your data into actionable insights with advanced analytics and visualization.",
      features: ["Business Intelligence", "Data Warehousing", "Predictive Analytics", "Custom Dashboards"],
      price: "From ₦1,600,000",
      image: "/images/data-analytics.png",
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that engage users and drive growth.",
      features: ["iOS Development", "Android Development", "React Native", "Flutter"],
      price: "From ₦3,200,000",
      image: "/images/mobile-development.png",
    },
    {
      icon: Shield,
      title: "Cybersecurity Solutions",
      description: "Comprehensive security assessments and implementations to protect your digital assets.",
      features: ["Security Audits", "Penetration Testing", "Compliance Solutions", "Security Training"],
      price: "From ₦1,000,000",
      image: "/images/cybersecurity.png",
    },
    {
      icon: Zap,
      title: "Digital Transformation",
      description: "End-to-end digital transformation strategies that modernize your business operations.",
      features: ["Process Automation", "Legacy System Modernization", "Digital Strategy", "Change Management"],
      price: "From ₦4,000,000",
      image: "/images/digital-transformation.png",
    },
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
            <Link href="/services" className="text-sm font-medium text-primary">
              Services
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/testimonials"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Testimonials
            </Link>
          </nav>

          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Book Consultation</span>
            <span className="sm:hidden">Book</span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/software-development.png"
            alt="Technology services"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-primary/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="secondary"
              className="mb-6 bg-accent/20 text-accent-foreground border-accent/30 backdrop-blur-sm"
            >
              Professional Services
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 drop-shadow-lg">
              Technology Solutions
              <span className="text-primary block">That Drive Results</span>
            </h1>

            <p className="text-xl text-foreground/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
              From custom software development to digital transformation, we deliver comprehensive technology solutions
              that empower African businesses to compete globally.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20 overflow-hidden"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  <Badge variant="outline" className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm">
                    {service.price}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <ArrowRight className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how our services can help you achieve your technology goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 bg-transparent"
                >
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
