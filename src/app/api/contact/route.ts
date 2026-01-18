import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = "karakayaceylin@gmail.com";

export async function POST(request: Request) {
  try {
    const { name, email, projectType, message } = await request.json();

    // Validate required fields
    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check environment variables
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("Missing SMTP credentials");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create transporter with explicit Gmail settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Project Inquiry: ${projectType} - from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 1px solid #eee; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="margin: 20px 0;">
            <p style="margin: 5px 0; color: #666;"><strong>Name:</strong></p>
            <p style="margin: 5px 0 15px; color: #1a1a1a; font-size: 16px;">${name}</p>

            <p style="margin: 5px 0; color: #666;"><strong>Email:</strong></p>
            <p style="margin: 5px 0 15px; color: #1a1a1a; font-size: 16px;">
              <a href="mailto:${email}" style="color: #1a1a1a;">${email}</a>
            </p>

            <p style="margin: 5px 0; color: #666;"><strong>Project Type:</strong></p>
            <p style="margin: 5px 0 15px; color: #1a1a1a; font-size: 16px; text-transform: capitalize;">${projectType}</p>

            <p style="margin: 5px 0; color: #666;"><strong>Message:</strong></p>
            <p style="margin: 5px 0; color: #1a1a1a; font-size: 16px; white-space: pre-wrap;">${message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

          <p style="color: #999; font-size: 12px;">
            This message was sent from your portfolio website contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Project Type: ${projectType}

Message:
${message}

---
This message was sent from your portfolio website contact form.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to send email: ${errorMessage}` },
      { status: 500 }
    );
  }
}
