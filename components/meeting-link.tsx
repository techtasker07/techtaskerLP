"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Video, Copy, ExternalLink, Search } from "lucide-react"
import Link from "next/link"

export function MeetingLink() {
  const [roomId, setRoomId] = useState("")
  const [searchEmail, setSearchEmail] = useState("")
  const [meetings, setMeetings] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!searchEmail) return

    setIsSearching(true)
    try {
      const response = await fetch(`/api/meetings?email=${encodeURIComponent(searchEmail)}`)
      const data = await response.json()

      if (data.meetings) {
        setMeetings(data.meetings)
      }
    } catch (error) {
      console.error("Error searching meetings:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const generateMeetingLink = (jitsiRoomId: string) => {
    return `${window.location.origin}/meeting/${jitsiRoomId}`
  }

  return (
    <div className="space-y-6">
      {/* Direct Room Access */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Join Meeting Room</CardTitle>
          <CardDescription>Enter a room ID to join a meeting directly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="roomId" className="sr-only">
                Room ID
              </Label>
              <Input
                id="roomId"
                placeholder="Enter room ID (e.g., techtasker-1234567890-abc123)"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </div>
            <Link href={roomId ? `/meeting/${roomId}` : "#"}>
              <Button disabled={!roomId} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Video className="w-4 h-4 mr-2" />
                Join Meeting
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Search Meetings by Email */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Find Your Meetings</CardTitle>
          <CardDescription>Search for your scheduled meetings using your email address</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <Label htmlFor="searchEmail" className="sr-only">
                Email Address
              </Label>
              <Input
                id="searchEmail"
                type="email"
                placeholder="Enter your email address"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />
            </div>
            <Button onClick={handleSearch} disabled={!searchEmail || isSearching}>
              <Search className="w-4 h-4 mr-2" />
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>

          {meetings.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Your Meetings:</h4>
              {meetings.map((meeting) => (
                <div key={meeting.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">
                        {meeting.first_name} {meeting.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">{meeting.company || "Individual Meeting"}</p>
                    </div>
                    <Badge
                      className={
                        meeting.meeting_status === "scheduled"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : meeting.meeting_status === "pending"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-gray-100 text-gray-800 border-gray-200"
                      }
                    >
                      {meeting.meeting_status}
                    </Badge>
                  </div>

                  {meeting.meeting_date && (
                    <p className="text-sm text-muted-foreground mb-3">
                      Scheduled: {new Date(meeting.meeting_date).toLocaleString()}
                    </p>
                  )}

                  <div className="flex items-center gap-2">
                    {meeting.meeting_status === "scheduled" && (
                      <Link href={`/meeting/${meeting.jitsi_room_id}`} target="_blank">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          <Video className="w-4 h-4 mr-2" />
                          Join Meeting
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generateMeetingLink(meeting.jitsi_room_id))}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Link
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {meetings.length === 0 && searchEmail && !isSearching && (
            <p className="text-sm text-muted-foreground text-center py-4">No meetings found for this email address.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
