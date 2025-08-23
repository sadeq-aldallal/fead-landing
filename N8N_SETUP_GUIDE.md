# n8n Email Setup Guide - Simple & Step by Step

## Why n8n is Perfect for This

✅ **You Already Use It** - No new tools to learn!  
✅ **Visual & Simple** - Drag and drop workflow  
✅ **Gmail Integration** - Direct connection to your Google Workspace  
✅ **Free & Fast** - No additional costs or complexity  
✅ **Easy to Modify** - Change templates anytime in the UI  

## Step 1: Import the Workflow

1. **Open your n8n instance**
2. **Click "Import from File" or "+"** 
3. **Upload the `n8n-workflow.json` file** I created
4. **The workflow will appear** with all nodes connected

## Step 2: Connect Gmail (One Time Setup)

1. **Click on any Gmail node** (Send Contact Notification)
2. **Click "Create New Credential"**
3. **Choose "OAuth2"**
4. **Click "Connect my account"**
5. **Sign in with `sadeq.aldallal@fead.app`**
6. **Authorize n8n to send emails**
7. **Copy this credential to all other Gmail nodes**

## Step 3: Activate the Webhook

1. **Click on the "Webhook" node**
2. **Copy the webhook URL** (looks like: `https://your-n8n.com/webhook/fead-app-emails`)
3. **Click "Listen for Test Event" to activate**

## Step 4: Update Your Website

1. **Create `.env` file** in your project root:
```bash
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/fead-app-emails
```

2. **Restart your dev server**:
```bash
npm run dev
```

## Step 5: Test Everything

1. **Test Contact Form**:
   - Fill out contact form on website
   - Check: You receive notification email
   - Check: User receives auto-reply

2. **Test Demo Request**:
   - Fill out demo request form
   - Check: You receive high-priority notification
   - Check: User receives detailed auto-reply

## What the Workflow Does

### 📥 **Receives Form Data**
- Webhook receives JSON from your website
- Contains form type (`contact` or `demo`) and all form data

### 📧 **For Contact Forms**:
1. **Sends you notification** with:
   - Professional HTML formatting
   - All form details (name, email, subject, message)
   - Reply-to set to user's email
   
2. **Sends user auto-reply** with:
   - Branded fead.app template
   - Professional acknowledgment
   - 24-hour response promise

### 🎯 **For Demo Requests**:
1. **Sends you high-priority notification** with:
   - Highlighted as demo request
   - Company details
   - Follow-up reminder
   
2. **Sends user detailed auto-reply** with:
   - What to expect in demo
   - Your contact information
   - Professional follow-up promise

## Workflow Visual Structure

```
Webhook (receives data)
    ↓
If Contact Form? → Send Notification → Send Auto-Reply
    ↓
If Demo Request? → Send Notification → Send Auto-Reply
```

## Email Templates Included

### ✅ Contact Form Templates
- **Notification to you**: Clean, professional with form data
- **Auto-reply to user**: Branded acknowledgment

### ✅ Demo Request Templates  
- **Notification to you**: High-priority styling with company info
- **Auto-reply to user**: Detailed demo information

## Customization (Easy!)

Want to change email templates?
1. **Open n8n workflow**
2. **Click on any Gmail node**
3. **Edit the HTML message**
4. **Save and test**

## What You Need to Provide

1. **Your n8n instance URL**
2. **Gmail OAuth connection** (one-time setup)
3. **Webhook URL** (generated automatically)

That's it! Much simpler than Google Cloud Platform, and you already know n8n!

## Troubleshooting

- **Emails not sending?** Check Gmail OAuth connection
- **Webhook not receiving?** Make sure workflow is active
- **Wrong email format?** Check the HTML templates in Gmail nodes

This solution is perfect for your needs and much easier to manage! 🚀