import { createClient } from "../lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Calendar, User, Mail, Phone, Video, ExternalLink } from "lucide-react"
import Link from "next/link"

export default async function AdminMeetingsPage() {
  const supabase = await createClient()

  // Check if user is authenticated (basic admin check)
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Fetch all meetings
  const { data: meetings, error } = await supabase
    .from("meetings")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching meetings:", error)
    return <div>Error loading meetings</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "scheduled":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Meeting Management</h1>
          <p className="text-muted-foreground">Manage and schedule client meetings</p>
        </div>

        <div className="grid gap-6">
          {meetings?.map((meeting) => (
            <Card key={meeting.id} className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      {meeting.first_name} {meeting.last_name}
                    </CardTitle>
                    <CardDescription>{meeting.company || "Individual Client"}</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(meeting.meeting_status)}>{meeting.meeting_status}</Badge>
                    {meeting.meeting_status === "scheduled" && (
                      <Link href={`/meeting/${meeting.jitsi_room_id}`} target="_blank">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          <Video className="w-4 h-4 mr-2" />
                          Join Meeting
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-sm">{meeting.email}</span>
                  </div>
                  {meeting.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-sm">{meeting.phone}</span>
                    </div>
                  )}
                  {meeting.meeting_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm">
                        {new Date(meeting.meeting_date).toLocaleDateString()} at{" "}
                        {new Date(meeting.meeting_date).toLocaleTimeString()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm">Created {new Date(meeting.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {meeting.service_interest && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Service Interest:</p>
                    <Badge variant="outline" className="capitalize">
                      {meeting.service_interest.replace("-", " ")}
                    </Badge>
                  </div>
                )}

                {meeting.message && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Message:</p>
                    <p className="text-sm bg-muted/30 p-3 rounded-lg">{meeting.message}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">Room ID:</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded">{meeting.jitsi_room_id}</code>
                  {meeting.meeting_status === "scheduled" && (
                    <Link href={`/meeting/${meeting.jitsi_room_id}`} target="_blank">
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Open Room
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {meetings?.length === 0 && (
            <Card className="border-border">
              <CardContent className="text-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No meetings found</h3>
                <p className="text-muted-foreground">Meeting requests will appear here once submitted.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
