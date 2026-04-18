"use server"

import { Resend } from "resend"

export async function sendEmail(formData) {
  // Capture the form data
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  console.log("-----------------------------------------")
  console.log("📩 NEW FORM SUBMISSION RECEIVED")
  console.log(`Name: ${name}, Email: ${email}`)

  // 1. Validation
  if (!name || !email || !message) {
    console.log("❌ Validation failed: Missing fields")
    return { success: false, error: "Please fill in all fields." }
  }

  // 2. Setup Resend
  const resendApiKey = process.env.RESEND_API_KEY
  console.log("Checking API Key:", resendApiKey ? "✅ Found" : "❌ NOT FOUND in .env.local")

  if (!resendApiKey || resendApiKey === "re_123456789") {
    console.log("⚠️ Running in MOCK MODE (No real email will be sent because key is missing or is placeholder)")
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { success: true, mock: true }
  }

  const resend = new Resend(resendApiKey)

  try {
    console.log("🚀 Sending to Resend API...")
    
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "swapnilg8682@gmail.com",
      subject: `New Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #6d28d9;">New Message from Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `
    })

    if (error) {
      console.error("❌ Resend API Error:", JSON.stringify(error, null, 2))
      return { success: false, error: error.message }
    }

    console.log("✅ SUCCESS! Email sent. Resend ID:", data.id)
    return { success: true }

  } catch (err) {
    console.error("❌ CRITICAL SERVER ERROR:", err)
    return { success: false, error: "The server encountered an error sending the mail." }
  }
}

