import { MeetingLink } from "../components/meeting-link"
import { Button } from "../components/ui/button"
import { ArrowLeft, Code } from "lucide-react"
import Link from "next/link"

export default function MeetingsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Code className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Techtasker Solutions</span>
          </div>
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Meeting Access</h1>
            <p className="text-lg text-muted-foreground">
              Join your scheduled consultation or search for your meetings
            </p>
          </div>

          <MeetingLink />
        </div>
      </div>
    </div>
  )
}
