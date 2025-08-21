import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Users, Target, Award, Globe, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for excellence in every project, delivering solutions that exceed expectations and drive meaningful results.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in the power of partnership, working closely with our clients to understand their unique challenges and goals.",
    },
    {
      icon: Award,
      title: "Innovation",
      description: "We embrace cutting-edge technologies and innovative approaches to solve complex business problems.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Rooted in African excellence, we deliver world-class solutions that compete on the global stage.",
    },
  ]

  const team = [
    {
      name: "Kwame Asante",
      role: "Founder & CEO",
      description:
        "15+ years in enterprise software development with expertise in cloud architecture and digital transformation.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Amara Okafor",
      role: "CTO",
      description:
        "Former senior engineer at major tech companies, specializing in scalable systems and AI/ML implementations.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Kofi Mensah",
      role: "Lead Developer",
      description:
        "Full-stack developer with deep expertise in modern web technologies and mobile application development.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Zara Ndovu",
      role: "UX/UI Designer",
      description:
        "Award-winning designer focused on creating intuitive, accessible, and culturally-aware user experiences.",
      image: "/placeholder.svg?height=300&width=300",
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
            <Link
              href="/services"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link href="/about" className="text-sm font-medium text-primary">
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
            Book Consultation
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-accent/10 text-accent-foreground border-accent/20">
              Our Story
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Empowering Africa's
              <span className="text-primary block">Digital Future</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Founded with a vision to showcase African excellence in technology, Techtasker Solutions bridges the gap
              between innovative ideas and world-class implementation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent-foreground border-accent/20">
                Our Mission
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Building Tomorrow's Solutions Today
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that Africa's technological potential is limitless. Our mission is to harness this potential
                by delivering world-class technology solutions that drive economic growth, create opportunities, and
                showcase the continent's innovation capabilities.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Every project we undertake is an opportunity to demonstrate that African talent can compete and excel on
                the global stage, while staying true to our cultural values of community, excellence, and integrity.
              </p>
              <Link href="/services">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-8">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Techtasker Solutions Team"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent-foreground border-accent/20">
              Our Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Drives Us Forward</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core values guide every decision we make and every solution we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-border hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-lg bg-primary/10 w-fit mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent-foreground border-accent/20">
              Our Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet the Experts</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our diverse team of technology professionals brings together decades of experience and a shared passion
              for innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-border hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="w-32 h-32 rounded-full object-cover mx-auto"
                    />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">{member.name}</CardTitle>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{member.description}</CardDescription>
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Work Together?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how we can help transform your business with innovative technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/testimonials">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 bg-transparent"
                >
                  Read Client Stories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
