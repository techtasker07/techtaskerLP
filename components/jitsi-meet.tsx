"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Video, VideoOff, Mic, MicOff, Phone, Users } from "lucide-react"

interface JitsiMeetProps {
  roomName: string
  displayName?: string
  email?: string
  onMeetingEnd?: () => void
}

declare global {
  interface Window {
    JitsiMeetExternalAPI: any
  }
}

export function JitsiMeet({ roomName, displayName = "Guest", email, onMeetingEnd }: JitsiMeetProps) {
  const jitsiContainerRef = useRef<HTMLDivElement>(null)
  const [api, setApi] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isJoined, setIsJoined] = useState(false)
  const [participantCount, setParticipantCount] = useState(0)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [isAudioMuted, setIsAudioMuted] = useState(false)

  useEffect(() => {
    // Load Jitsi Meet External API script
    const script = document.createElement("script")
    script.src = "https://meet.jit.si/external_api.js"
    script.async = true
    script.onload = initializeJitsi
    document.head.appendChild(script)

    return () => {
      if (api) {
        api.dispose()
      }
      document.head.removeChild(script)
    }
  }, [])

  const initializeJitsi = () => {
    if (!jitsiContainerRef.current || !window.JitsiMeetExternalAPI) return

    const domain = "meet.jit.si"
    const options = {
      roomName: roomName,
      width: "100%",
      height: 600,
      parentNode: jitsiContainerRef.current,
      userInfo: {
        displayName: displayName,
        email: email,
      },
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        enableWelcomePage: false,
        prejoinPageEnabled: false,
        disableModeratorIndicator: false,
        startScreenSharing: false,
        enableEmailInStats: false,
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          "microphone",
          "camera",
          "closedcaptions",
          "desktop",
          "fullscreen",
          "fodeviceselection",
          "hangup",
          "profile",
          "chat",
          "recording",
          "livestreaming",
          "etherpad",
          "sharedvideo",
          "settings",
          "raisehand",
          "videoquality",
          "filmstrip",
          "invite",
          "feedback",
          "stats",
          "shortcuts",
          "tileview",
          "videobackgroundblur",
          "download",
          "help",
          "mute-everyone",
        ],
        SETTINGS_SECTIONS: ["devices", "language", "moderator", "profile", "calendar"],
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        SHOW_BRAND_WATERMARK: false,
        BRAND_WATERMARK_LINK: "",
        SHOW_POWERED_BY: false,
        DISPLAY_WELCOME_PAGE_CONTENT: false,
        DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
        APP_NAME: "Techtasker Solutions",
        NATIVE_APP_NAME: "Techtasker Solutions",
        DEFAULT_BACKGROUND: "#15803d",
      },
    }

    const jitsiApi = new window.JitsiMeetExternalAPI(domain, options)
    setApi(jitsiApi)

    // Event listeners
    jitsiApi.addEventListener("videoConferenceJoined", () => {
      setIsLoading(false)
      setIsJoined(true)
      console.log("[v0] User joined the meeting")
    })

    jitsiApi.addEventListener("videoConferenceLeft", () => {
      setIsJoined(false)
      console.log("[v0] User left the meeting")
      if (onMeetingEnd) {
        onMeetingEnd()
      }
    })

    jitsiApi.addEventListener("participantJoined", () => {
      jitsiApi.getNumberOfParticipants().then((count: number) => {
        setParticipantCount(count)
        console.log("[v0] Participant joined, total:", count)
      })
    })

    jitsiApi.addEventListener("participantLeft", () => {
      jitsiApi.getNumberOfParticipants().then((count: number) => {
        setParticipantCount(count)
        console.log("[v0] Participant left, total:", count)
      })
    })

    jitsiApi.addEventListener("audioMuteStatusChanged", (event: any) => {
      setIsAudioMuted(event.muted)
      console.log("[v0] Audio mute status:", event.muted)
    })

    jitsiApi.addEventListener("videoMuteStatusChanged", (event: any) => {
      setIsVideoMuted(event.muted)
      console.log("[v0] Video mute status:", event.muted)
    })

    jitsiApi.addEventListener("readyToClose", () => {
      console.log("[v0] Meeting ready to close")
      if (onMeetingEnd) {
        onMeetingEnd()
      }
    })
  }

  const toggleAudio = () => {
    if (api) {
      api.executeCommand("toggleAudio")
    }
  }

  const toggleVideo = () => {
    if (api) {
      api.executeCommand("toggleVideo")
    }
  }

  const hangUp = () => {
    if (api) {
      api.executeCommand("hangup")
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="border-border shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Virtual Meeting Room</CardTitle>
              <CardDescription>Room: {roomName}</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-accent/10 text-accent-foreground border-accent/20">
                <Users className="w-4 h-4 mr-1" />
                {participantCount} participant{participantCount !== 1 ? "s" : ""}
              </Badge>
              {isJoined && (
                <Badge variant="outline" className="border-green-500 text-green-700">
                  Connected
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading meeting room...</p>
              </div>
            </div>
          )}

          <div ref={jitsiContainerRef} className={`w-full ${isLoading ? "hidden" : "block"}`} />

          {isJoined && (
            <div className="flex items-center justify-center gap-4 mt-6 p-4 bg-muted/30 rounded-lg">
              <Button
                variant={isAudioMuted ? "destructive" : "outline"}
                size="sm"
                onClick={toggleAudio}
                className="flex items-center gap-2"
              >
                {isAudioMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                {isAudioMuted ? "Unmute" : "Mute"}
              </Button>

              <Button
                variant={isVideoMuted ? "destructive" : "outline"}
                size="sm"
                onClick={toggleVideo}
                className="flex items-center gap-2"
              >
                {isVideoMuted ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                {isVideoMuted ? "Start Video" : "Stop Video"}
              </Button>

              <Button variant="destructive" size="sm" onClick={hangUp} className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Leave Meeting
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
