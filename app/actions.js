"use server"

import { Resend } from "resend"

/**
 * Server action to send an email using Resend.
 * This function is called from the client-side form.
 */
export async function sendEmail(formData) {
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // 1. Basic Validation
  if (!name || !email || !message) {
    return { error: "Please fill in all fields." }
  }

  // 2. Setup Resend
  // Replace with your API key in .env.local
  const resendApiKey = process.env.RESEND_API_KEY
  
  // FALLBACK for first-time setup: 
  // If the API key is missing, we simulate a successful send so the UI works.
  if (!resendApiKey || resendApiKey === "re_123456789") {
    console.log("--- MOCK EMAIL SEND (Key Missing) ---")
    console.log(`From: ${name} <${email}>`)
    console.log(`Message: ${message}`)
    console.log("-------------------------------------")
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    return { success: true, mock: true }
  }

  const resend = new Resend(resendApiKey)

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Verifying domain later, use this for testing
      to: "swapnilg8682@gmail.com", // Your email where you want to receive messages
      subject: `New Message from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `
    })

    if (error) {
      console.error("Resend Error:", error)
      return { error: "Failed to send message. Please try again later." }
    }

    return { success: true }
  } catch (err) {
    console.error("Server Action Error:", err)
    return { error: "An unexpected error occurred." }
  }
}
