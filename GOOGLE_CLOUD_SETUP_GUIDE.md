# Google Cloud Platform Email Setup Guide

## Why Google Cloud Platform is Better Than EmailJS

✅ **Professional & Enterprise-Grade**
- Full integration with your Google Workspace Business
- Better deliverability rates
- Professional domain authentication
- Enterprise security and compliance

✅ **More Reliable & Scalable**
- Google's infrastructure
- No third-party dependencies
- Automatic scaling
- Better uptime guarantees

✅ **Full Control**
- Custom email templates
- Advanced error handling
- Detailed logging and monitoring
- Rate limiting control

✅ **Cost Effective**
- Google Cloud Functions: Free tier includes 2M invocations/month
- Gmail API: Free for reasonable usage
- Only pay for what you use

## Setup Steps

### 1. Google Cloud Project Setup

1. **Create/Select Project**
   ```bash
   # Go to https://console.cloud.google.com/
   # Create new project or select existing one
   # Project ID example: fead-app-prod
   ```

2. **Enable Required APIs**
   ```bash
   # Enable these APIs in Google Cloud Console:
   # - Cloud Functions API
   # - Gmail API
   # - Cloud Build API
   # - Cloud Logging API
   ```

### 2. Gmail API OAuth Setup

1. **Create OAuth 2.0 Credentials**
   - Go to Google Cloud Console → APIs & Services → Credentials
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: Web application
   - Authorized redirect URIs: `https://developers.google.com/oauthplayground`

2. **Get Refresh Token**
   - Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground)
   - Click settings gear → "Use your own OAuth credentials"
   - Enter your Client ID and Client Secret
   - Select Gmail API v1 → `https://www.googleapis.com/auth/gmail.send`
   - Authorize and get refresh token

### 3. Deploy Cloud Function

1. **Install Google Cloud CLI**
   ```bash
   # Install gcloud CLI: https://cloud.google.com/sdk/docs/install
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

2. **Deploy Function**
   ```bash
   cd cloud-functions/send-email
   
   gcloud functions deploy sendEmail \
     --runtime nodejs18 \
     --trigger-http \
     --allow-unauthenticated \
     --set-env-vars GMAIL_CLIENT_ID="your_client_id",GMAIL_CLIENT_SECRET="your_client_secret",GMAIL_REFRESH_TOKEN="your_refresh_token"
   ```

3. **Get Function URL**
   ```bash
   # After deployment, you'll get a URL like:
   # https://your-region-your-project.cloudfunctions.net/sendEmail
   ```

### 4. Update Frontend Configuration

1. **Create .env file**
   ```bash
   # In your project root
   VITE_CLOUD_FUNCTION_URL=https://your-region-your-project.cloudfunctions.net/sendEmail
   ```

2. **Restart Development Server**
   ```bash
   npm run dev
   ```

## Alternative: Using Cloud Run (More Scalable)

If you expect high email volumes, you can deploy the same function to Cloud Run:

```bash
# Create Dockerfile
cat > cloud-functions/send-email/Dockerfile << EOF
FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
EOF

# Deploy to Cloud Run
gcloud run deploy fead-email-service \
  --source ./cloud-functions/send-email \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GMAIL_CLIENT_ID="your_client_id",GMAIL_CLIENT_SECRET="your_client_secret",GMAIL_REFRESH_TOKEN="your_refresh_token"
```

## Email Templates Included

### Contact Form Notification (to you)
- Professional HTML template
- Form data clearly displayed
- Direct reply functionality

### Contact Form Auto-Reply (to user)
- Branded template with fead.app logo
- Professional acknowledgment
- Clear next steps

### Demo Request Notification (to you)
- High-priority styling
- All demo request details
- Clear call-to-action for follow-up

### Demo Request Auto-Reply (to user)
- Detailed demo information
- What to expect
- Professional contact information

## Security Features

✅ **OAuth 2.0 Authentication**
✅ **Scoped Gmail API Access**
✅ **Environment Variable Protection**
✅ **CORS Configuration**
✅ **Rate Limiting**
✅ **Error Handling & Logging**

## Monitoring & Logs

- View function logs: `gcloud functions logs read sendEmail`
- Google Cloud Console → Cloud Functions → sendEmail → Logs
- Set up alerts for errors
- Monitor email delivery success rates

## What You Need to Provide

1. **Google Cloud Project ID**
2. **OAuth 2.0 Client ID & Secret** (from Gmail API setup)
3. **Refresh Token** (from OAuth playground)
4. **Deployed Cloud Function URL**

## Cost Estimate

- **Cloud Functions**: FREE (up to 2M calls/month)
- **Gmail API**: FREE (reasonable usage)
- **Cloud Logging**: ~$0.50/GB
- **Total Monthly Cost**: Under $5 for most businesses

This is significantly more professional and reliable than EmailJS while being cost-effective!

## Testing

Once deployed, test both forms:
1. Contact form → Check notification email to you + auto-reply to user
2. Demo request → Check notification email to you + auto-reply to user
3. Monitor Cloud Function logs for any errors

## Support

If you need help with any of these steps, I can guide you through the specific setup process once you have your Google Cloud Project ready.