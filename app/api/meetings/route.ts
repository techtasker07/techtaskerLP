import { createClient } from "../lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { firstName, lastName, email, phone, company, serviceInterest, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "First name, last name, and email are required" }, { status: 400 })
    }

    // Generate a unique Jitsi room ID
    const jitsiRoomId = `techtasker-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`

    // Insert meeting request into database
    const { data, error } = await supabase
      .from("meetings")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        company,
        service_interest: serviceInterest,
        message,
        jitsi_room_id: jitsiRoomId,
        meeting_status: "pending",
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to create meeting request" }, { status: 500 })
    }

    // Here you could add email notification logic
    // await sendConfirmationEmail(email, data);

    return NextResponse.json({
      success: true,
      meeting: data,
      message: "Meeting request submitted successfully! We'll contact you soon to schedule your consultation.",
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email parameter is required" }, { status: 400 })
    }

    // Get meetings for the specified email
    const { data, error } = await supabase
      .from("meetings")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch meetings" }, { status: 500 })
    }

    return NextResponse.json({ meetings: data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
