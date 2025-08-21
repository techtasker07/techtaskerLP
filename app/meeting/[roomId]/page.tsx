import { notFound } from "next/navigation"
import { createClient } from "../lib/supabase/server"
import { JitsiMeet } from "../components/jitsi-meet"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Calendar, User, Building, Mail, Phone, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface MeetingPageProps {
  params: {
    roomId: string
  }
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const supabase = await createClient()

  // Fetch meeting details
  const { data: meeting, error } = await supabase
    .from("meetings")
    .select("*")
    .eq("jitsi_room_id", params.roomId)
    .single()

  if (error || !meeting) {
    notFound()
  }

  // Check if meeting is scheduled
  if (meeting.meeting_status !== "scheduled") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center">Meeting Not Available</CardTitle>
            <CardDescription className="text-center">
              This meeting is currently {meeting.meeting_status}. Please contact us for more information.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const displayName = `${meeting.first_name} ${meeting.last_name}`

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Badge variant="secondary" className="bg-accent/10 text-accent-foreground border-accent/20">
            Techtasker Solutions Meeting
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Meeting Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Meeting Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-medium">{displayName}</p>
                    <p className="text-sm text-muted-foreground">Participant</p>
                  </div>
                </div>

                {meeting.company && (
                  <div className="flex items-center gap-3">
                    <Building className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium">{meeting.company}</p>
                      <p className="text-sm text-muted-foreground">Company</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-medium">{meeting.email}</p>
                    <p className="text-sm text-muted-foreground">Email</p>
                  </div>
                </div>

                {meeting.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium">{meeting.phone}</p>
                      <p className="text-sm text-muted-foreground">Phone</p>
                    </div>
                  </div>
                )}

                {meeting.meeting_date && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium">{new Date(meeting.meeting_date).toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(meeting.meeting_date).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                )}

                {meeting.service_interest && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Service Interest</p>
                    <Badge variant="outline" className="capitalize">
                      {meeting.service_interest.replace("-", " ")}
                    </Badge>
                  </div>
                )}

                {meeting.message && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Message</p>
                    <p className="text-sm">{meeting.message}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Meeting Room */}
          <div className="lg:col-span-3">
            <JitsiMeet
              roomName={params.roomId}
              displayName={displayName}
              email={meeting.email}
              onMeetingEnd={() => {
                // Redirect to home page when meeting ends
                window.location.href = "/"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
