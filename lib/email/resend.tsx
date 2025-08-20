import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailData {
  firstName: string
  lastName: string
  email: string
  company?: string
  serviceInterest?: string
  message?: string
  inviteCode: string
  scheduledTime: string
  meetingLink: string
}

export async function sendMeetingNotificationEmails(data: EmailData) {
  const adminEmail = process.env.ADMIN_EMAIL || "techtasker7@gmail.com"

  // Email template for admin
  const adminEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e40af;">New Meeting Request - Techtasker Solutions</h2>
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #334155; margin-top: 0;">Meeting Details</h3>
        <p><strong>Invite Code:</strong> ${data.inviteCode}</p>
        <p><strong>Scheduled Time:</strong> ${data.scheduledTime}</p>
        <p><strong>Meeting Link:</strong> <a href="${data.meetingLink}" style="color: #1e40af;">${data.meetingLink}</a></p>
      </div>
      
      <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #334155; margin-top: 0;">Client Information</h3>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
        ${data.serviceInterest ? `<p><strong>Service Interest:</strong> ${data.serviceInterest}</p>` : ""}
        ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ""}
      </div>
    </div>
  `

  // Email template for user
  const userEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e40af;">Meeting Confirmation - Techtasker Solutions</h2>
      
      <p>Dear ${data.firstName},</p>
      
      <p>Thank you for scheduling a consultation with Techtasker Solutions. Your meeting has been confirmed!</p>
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #334155; margin-top: 0;">Your Meeting Details</h3>
        <p><strong>Invite Code:</strong> ${data.inviteCode}</p>
        <p><strong>Scheduled Time:</strong> ${data.scheduledTime}</p>
        <p><strong>Meeting Link:</strong> <a href="${data.meetingLink}" style="color: #1e40af;">Join Meeting</a></p>
      </div>
      
      <p>Please save this information and join the meeting at the scheduled time using the link above.</p>
      
      <p>We look forward to discussing how Techtasker Solutions can help transform your business with cutting-edge technology.</p>
      
      <p>Best regards,<br>The Techtasker Solutions Team</p>
    </div>
  `

  try {
    // Send email to admin
    const adminEmailResult = await resend.emails.send({
      from: "Techtasker Solutions <noreply@techtasker.com>",
      to: [adminEmail],
      subject: `New Meeting Request from ${data.firstName} ${data.lastName}`,
      html: adminEmailHtml,
    })

    // Send email to user
    const userEmailResult = await resend.emails.send({
      from: "Techtasker Solutions <noreply@techtasker.com>",
      to: [data.email],
      subject: "Meeting Confirmation - Techtasker Solutions",
      html: userEmailHtml,
    })

    return {
      success: true,
      adminEmailId: adminEmailResult.data?.id,
      userEmailId: userEmailResult.data?.id,
    }
  } catch (error) {
    console.error("Email sending failed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown email error",
    }
  }
}
