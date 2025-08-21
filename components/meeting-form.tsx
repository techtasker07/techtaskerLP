"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, CheckCircle, AlertCircle } from "lucide-react"
import { createMeetingRequest, type MeetingFormData } from "@/lib/actions/meetings"

// African countries with their calling codes
const AFRICAN_COUNTRIES = [
  { name: "Nigeria", code: "+234" },
  { name: "South Africa", code: "+27" },
  { name: "Kenya", code: "+254" },
  { name: "Ghana", code: "+233" },
  { name: "Egypt", code: "+20" },
  { name: "Morocco", code: "+212" },
  { name: "Ethiopia", code: "+251" },
  { name: "Tanzania", code: "+255" },
  { name: "Uganda", code: "+256" },
  { name: "Algeria", code: "+213" },
  { name: "Tunisia", code: "+216" },
  { name: "Cameroon", code: "+237" },
  { name: "Ivory Coast", code: "+225" },
  { name: "Senegal", code: "+221" },
  { name: "Zimbabwe", code: "+263" },
  { name: "Zambia", code: "+260" },
  { name: "Botswana", code: "+267" },
  { name: "Rwanda", code: "+250" },
  { name: "Namibia", code: "+264" },
  { name: "Mozambique", code: "+258" }
]

interface ExtendedMeetingFormData extends MeetingFormData {
  country: string
}

export function MeetingForm() {
  const [formData, setFormData] = useState<ExtendedMeetingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    company: "",
    serviceInterest: "",
    message: "",
  })

  const [phoneCode, setPhoneCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Handle country selection and phone code update
    if (name === "country") {
      const selectedCountry = AFRICAN_COUNTRIES.find(country => country.name === value)
      setPhoneCode(selectedCountry ? selectedCountry.code : "")
      // Clear phone number when country changes
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        phone: "",
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      // Combine phone code with phone number for submission
      const submissionData = {
        ...formData,
        phone: phoneCode && formData.phone ? `${phoneCode} ${formData.phone}` : formData.phone,
      }
      
      const result = await createMeetingRequest(submissionData)

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Meeting request submitted successfully!",
        })
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          country: "",
          company: "",
          serviceInterest: "",
          message: "",
        })
        setPhoneCode("")
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to submit meeting request",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-border shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Schedule Your Virtual Meeting</CardTitle>
        <CardDescription className="text-center">
          Choose a convenient time for a 30-minute consultation with our team
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitStatus.type && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              submitStatus.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {submitStatus.type === "success" ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600" />
            )}
            <p className="text-sm font-medium">{submitStatus.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@company.com"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground disabled:opacity-50"
                disabled={isSubmitting}
              >
                <option value="">Select your country</option>
                {AFRICAN_COUNTRIES.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex">
              {phoneCode && (
                <div className="flex items-center px-3 py-2 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground">
                  {phoneCode}
                </div>
              )}
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={phoneCode ? "7011223344" : "Select country first"}
                disabled={isSubmitting || !phoneCode}
                className={phoneCode ? "rounded-l-none border-l-0" : ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Your company name"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceInterest">Service Interest</Label>
            <select
              id="serviceInterest"
              name="serviceInterest"
              value={formData.serviceInterest}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground disabled:opacity-50"
              disabled={isSubmitting}
            >
              <option value="">Select a service</option>
              <option value="software-development">Software Development</option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="cloud-solutions">Cloud Solutions</option>
              <option value="digital-transformation">Digital Transformation</option>
              <option value="ai-ml">AI & Machine Learning</option>
              <option value="technical-support">Technical Support</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Project Description</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your project, challenges, or goals..."
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
            disabled={isSubmitting}
          >
            <Calendar className="mr-2 h-5 w-5" />
            {isSubmitting ? "Submitting..." : "Schedule Meeting"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}