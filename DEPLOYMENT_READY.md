# 🚀 Deployment Ready - fead.app Email Integration

## ✅ Configuration Complete

Your fead.app is now configured to send emails via n8n webhook when deployed to production.

### **Current Webhook URL:**
```
https://fead.app.n8n.cloud/webhook/fead-app-emails
```

### **Environment Variables Set:**
- **Development**: `.env` ✅
- **Production**: `.env.production` ✅

## 📧 **Email Flow When Deployed:**

1. **User submits form** on https://fead.app
2. **Frontend calls** `https://fead.app.n8n.cloud/webhook/fead-app-emails`
3. **n8n workflow processes** the request
4. **Gmail sends emails:**
   - Notification to `sadeq.aldallal@fead.app`
   - Auto-reply to user

## 🎯 **Ready for Testing:**

### **Contact Form** sends:
```json
{
  "type": "contact",
  "formData": {
    "name": "User Name",
    "email": "user@example.com", 
    "subject": "Contact Subject",
    "message": "User message"
  },
  "timestamp": "2025-01-23T12:00:00.000Z"
}
```

### **Demo Request** sends:
```json
{
  "type": "demo",
  "formData": {
    "name": "User Name",
    "email": "user@example.com",
    "company": "Company Name", 
    "message": "Demo request message"
  },
  "timestamp": "2025-01-23T12:00:00.000Z"
}
```

## 🔧 **n8n Workflow Requirements:**

Make sure your n8n workflow:
1. ✅ **Is ACTIVE** (toggle in top-right)
2. ✅ **Has Gmail credentials** connected: `fead.app_google_account`
3. ✅ **Webhook path**: `fead-app-emails`
4. ✅ **Accepts POST requests**
5. ✅ **Has CORS headers** (if needed for https://fead.app)

## 🌐 **CORS Note:**

When deployed to https://fead.app:
- **CORS might work** if n8n allows requests from your domain
- **If CORS fails**, the n8n workflow needs CORS headers:
  ```
  Access-Control-Allow-Origin: https://fead.app
  Access-Control-Allow-Methods: POST, OPTIONS
  Access-Control-Allow-Headers: Content-Type
  ```

## 🧪 **Testing Checklist:**

Once deployed to https://fead.app:

1. **Submit Contact Form**:
   - ✅ Check browser console (no CORS errors)
   - ✅ Check n8n execution logs
   - ✅ Check your email inbox
   - ✅ Check user gets auto-reply

2. **Submit Demo Request**:
   - ✅ Check browser console (no CORS errors) 
   - ✅ Check n8n execution logs
   - ✅ Check your email inbox
   - ✅ Check user gets auto-reply

## 📁 **Files Ready for Deployment:**

- ✅ `src/services/emailService.ts` - Email service
- ✅ `src/components/modals/ContactModal.tsx` - Contact form
- ✅ `src/components/modals/DemoRequestModal.tsx` - Demo form
- ✅ `.env.production` - Production environment variables
- ✅ `n8n-workflow-with-cors.json` - n8n workflow (if needed)

## 🚀 **Deploy and Test!**

Your email integration is ready. Deploy to https://fead.app and test both forms!

**Webhook URL confirmed**: `https://fead.app.n8n.cloud/webhook/fead-app-emails` ✅