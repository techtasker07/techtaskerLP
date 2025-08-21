"use server"

import { createClient } from "../lib/supabase/server"
import { revalidatePath } from "next/cache"
import { sendMeetingNotificationEmails } from "../lib/email/resend"

export interface MeetingFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  serviceInterest?: string
  message?: string
}

function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

function calculateScheduledTime(): Date {
  const now = new Date()
  const currentHour = now.getHours()
  const scheduledTime = new Date(now)

  if (currentHour < 12) {
    // AM: schedule 5 hours later
    scheduledTime.setHours(scheduledTime.getHours() + 5)
  } else {
    // PM: schedule 10 hours later
    scheduledTime.setHours(scheduledTime.getHours() + 10)
  }

  return scheduledTime
}

export async function createMeetingRequest(formData: MeetingFormData) {
  try {
    const supabase = await createClient()

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      return {
        success: false,
        error: "First name, last name, and email are required",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    // Generate a unique Jitsi room ID
    const jitsiRoomId = `techtasker-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`

    const inviteCode = generateInviteCode()
    const scheduledTime = calculateScheduledTime()
    const meetingLink = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/meeting/${jitsiRoomId}`

    // Insert meeting request into database
    const { data, error } = await supabase
      .from("meetings")
      .insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service_interest: formData.serviceInterest,
        message: formData.message,
        jitsi_room_id: jitsiRoomId,
        meeting_status: "scheduled", // Changed from pending to scheduled
        invite_code: inviteCode,
        scheduled_time: scheduledTime.toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return {
        success: false,
        error: "Failed to create meeting request. Please try again.",
      }
    }

    try {
      const emailResult = await sendMeetingNotificationEmails({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company,
        serviceInterest: formData.serviceInterest,
        message: formData.message,
        inviteCode,
        scheduledTime: scheduledTime.toLocaleString(),
        meetingLink,
      })

      if (!emailResult.success) {
        console.error("Email notification failed:", emailResult.error)
        // Continue with success response even if email fails
      }
    } catch (emailError) {
      console.error("Email notification error:", emailError)
      // Continue with success response even if email fails
    }

    // Revalidate the page to show updated data
    revalidatePath("/")

    return {
      success: true,
      meeting: data,
      message: `Meeting scheduled successfully! You'll receive a confirmation email with your invite code: ${inviteCode}`,
    }
  } catch (error) {
    console.error("Server action error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function getMeetingsByEmail(email: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("meetings")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return {
        success: false,
        error: "Failed to fetch meetings",
      }
    }

    return {
      success: true,
      meetings: data,
    }
  } catch (error) {
    console.error("Server action error:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

export async function updateMeetingStatus(meetingId: string, status: string, meetingDate?: string) {
  try {
    const supabase = await createClient()

    // Check if user is authenticated (admin functionality)
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return {
        success: false,
        error: "Unauthorized: Admin access required",
      }
    }

    const updateData: any = {
      meeting_status: status,
    }

    if (meetingDate) {
      updateData.meeting_date = meetingDate
    }

    const { data, error } = await supabase.from("meetings").update(updateData).eq("id", meetingId).select().single()

    if (error) {
      console.error("Database error:", error)
      return {
        success: false,
        error: "Failed to update meeting status",
      }
    }

    revalidatePath("/admin/meetings")

    return {
      success: true,
      meeting: data,
    }
  } catch (error) {
    console.error("Server action error:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}
