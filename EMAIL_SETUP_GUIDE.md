# Email Setup Guide for fead.app

## Overview
The email functionality has been implemented using EmailJS, which allows sending emails directly from the frontend without a backend server. This system will:

1. Send notification emails to you (sadeq.aldallal@fead.app) when users submit contact or demo request forms
2. Send automated reply emails to users confirming their submissions
3. Use professional email templates in English

## Required Setup Steps

### 1. Create EmailJS Account
1. Go to [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
2. Sign up with your Google account (sadeq.aldallal@fead.app)
3. Verify your email address

### 2. Connect Your Gmail Account
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select "Gmail"
4. Follow the OAuth flow to connect your sadeq.aldallal@fead.app account
5. Note down the **Service ID** (e.g., "service_abc123")

### 3. Create Email Templates

#### Template 1: Contact Form Template
1. Go to "Email Templates" → "Create New Template"
2. Template ID: `contact_form` (or note the generated ID)
3. Template content:
```
Subject: {{subject}}
To: {{to_email}}
From: {{from_name}} <{{from_email}}>
Reply-To: {{reply_to}}

{{message}}

---
Sent from fead.app contact form
Name: {{from_name}}
Email: {{from_email}}
```

#### Template 2: Demo Request Template  
1. Create another template with ID: `demo_request`
2. Template content:
```
Subject: {{subject}}
To: {{to_email}}
From: {{from_name}} <{{from_email}}>
Reply-To: {{reply_to}}

{{message}}

---
Sent from fead.app demo request form
Name: {{from_name}}
Email: {{from_email}}
```

### 4. Get Your Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (e.g., "user_abc123xyz")

### 5. Create Environment File
Create a `.env` file in the project root with your EmailJS credentials:

```bash
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_CONTACT=contact_form
VITE_EMAILJS_TEMPLATE_DEMO=demo_request
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Replace the placeholder values with your actual EmailJS credentials.

### 6. Test the Integration
1. Restart your development server: `npm run dev`
2. Test the contact form on your website
3. Test the demo request form
4. Check that you receive notification emails
5. Check that users receive auto-reply emails

## Email Templates Generated

### Contact Form Auto-Reply
```
Dear [User Name],

Thank you for contacting fead.app! We've received your message and appreciate you reaching out to us.

Our team will review your inquiry and respond within 24 hours during business hours. We're committed to providing you with the best possible assistance.

In the meantime, feel free to explore our website to learn more about how our AI-powered Instagram customer support solution can transform your business communications.

If you have any urgent questions, please don't hesitate to reach out again.

Best regards,
The fead.app Team

---
This is an automated response. Please do not reply to this email.
fead.app - Transforming Instagram Customer Support with AI
```

### Demo Request Auto-Reply
```
Dear [User Name],

Thank you for your interest in fead.app! We're excited that [Company Name] is considering our AI-powered Instagram customer support solution.

We've received your demo request and our team will be in touch within 24 hours to:
- Schedule a personalized demo session
- Discuss your specific Instagram support needs
- Show you how our AI can transform your customer interactions
- Answer any questions about implementation and pricing

What you can expect in our demo:
✓ Live demonstration of AI-powered response automation
✓ Integration walkthrough with Instagram Business accounts
✓ Custom solution tailored to your business needs
✓ ROI analysis and implementation timeline

We're looking forward to showing you how fead.app can revolutionize your customer support experience!

Best regards,
The fead.app Team
Sadeq Aldallal
sadeq.aldallal@fead.app

---
This is an automated response. Please do not reply to this email.
fead.app - Transforming Instagram Customer Support with AI
```

## Security Notes
- EmailJS credentials are safe to use in frontend code
- The public key is designed to be exposed
- Rate limiting is handled by EmailJS
- Your Gmail credentials are never exposed

## Troubleshooting
- If emails aren't sending, check browser console for errors
- Verify all environment variables are set correctly
- Check EmailJS dashboard for usage and error logs
- Make sure Gmail service is connected and active

## What You Need to Provide
1. **EmailJS Service ID** (after connecting your Gmail)
2. **EmailJS Template IDs** (after creating the templates)  
3. **EmailJS Public Key** (from your account settings)

Once you provide these values, I'll help you update the `.env` file and test the integration.