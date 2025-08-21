import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Video, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { MeetingForm } from "@/components/meeting-form"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Updated header to use logo and proper navigation links */}
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
            <Link href="/" className="text-sm font-medium text-primary">
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
            <Link
              href="/testimonials"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Testimonials
            </Link>
            </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://imageio.forbes.com/specials-images/imageserve/61d52d4e3a76ed81ac034ea8/The-10-Tech-Trends-That-Will-Transform-Our-World/960x0.jpg?height=399&width=711&fit=bounds"
            alt="Advanced Digital Marketing Technology"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-primary/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="secondary"
              className="mb-6 bg-primary/50 text-accent-foreground border-accent/30 backdrop-blur-sm"
            >
              African Excellence in Technology
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight drop-shadow-lg">
              Empowering Your
              <span className="text-primary block">Digital Future</span>
            </h1>

            <p className="text-xl md:text-2xl text-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Professional technology consulting services rooted in African innovation. We transform businesses through
              cutting-edge solutions and cultural excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg shadow-lg"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Meeting
              </Button>
              <Link href="/meetings">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/60 text-foreground hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg bg-background/80 backdrop-blur-sm shadow-lg"
                >
                  <Video className="mr-2 h-5 w-5" />
                  Join Meeting
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent-foreground border-accent/20">
              Our Expertise
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Technology Solutions That Scale</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From custom software to digital transformation, we deliver results that drive your business forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-lg bg-card border border-border hover:shadow-lg transition-all duration-300">
              <div className="aspect-video relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/software-engineer-development-concepts-programming-260nw-2485654259-amaBBztDGK9NDLVv9CpwVnrRg9o2rV.png"
                  alt="Software Development"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">Custom Software Development</h3>
                <p className="text-muted-foreground mb-4">
                  Tailored applications built with cutting-edge technologies.
                </p>
                <p className="text-primary font-semibold">From ₦2,000,000</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg bg-card border border-border hover:shadow-lg transition-all duration-300">
              <div className="aspect-video relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/night-planet-earth-space-light-600nw-2495143773-lr5TWJI7c53mUMmFWmy62gvTUAG8vc.png"
                  alt="Cloud Solutions"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">Cloud Solutions</h3>
                <p className="text-muted-foreground mb-4">Seamless cloud transformation and migration services.</p>
                <p className="text-primary font-semibold">From ₦1,200,000</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg bg-card border border-border hover:shadow-lg transition-all duration-300">
              <div className="aspect-video relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SOPHISTICATED%2BCLOUD%2BSquarespace%2BWeb%2BDesigner%2Bin%2BBasingstoke%2C%2BWinchester%2C%2BPortsmouth%2C%2BSouthampton%2C%2BLondon%2C%2BAscot%2C%2BNewbury%2C%2BReading%2C%2BHampshire%2C%2BSurrey%2C%2BSalisbury%2C%2BNew%2BYork%2C%2BCalifornia%2C%2BItalia%2Bwebsite%2C%2Bsiti%2Bweb-QsXEhXkTE2LyaK1SJJXsobMdmsAfOF.png"
                  alt="Data Analytics"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">Data Analytics</h3>
                <p className="text-muted-foreground mb-4">Transform data into actionable business insights.</p>
                <p className="text-primary font-semibold">From ₦1,600,000</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Virtual Meeting Booking Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/artificial-intelligence-circuit-electric-line-260nw-2495924357-c2UoPK7wC1ToTL71TcdZIRGkypwJ5H.png"
            alt="AI Circuit Pattern"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-primary/5" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 bg-accent/10 text-primary border-accent/20">
                Book a Consultation
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Transform Your Business?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Schedule a free consultation with our experts. We'll discuss your challenges, explore solutions, and
                create a roadmap for your digital transformation.
              </p>
            </div>

            <MeetingForm />
          </div>
        </div>
      </section>
    </div>
  )
}
