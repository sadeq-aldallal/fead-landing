# Fead Deployment Test Report

**Test Date:** 2025-09-02T08:09:24.717Z

## Summary

- **Total Tests:** 18
- **Passed:** 8 ✅
- **Failed:** 1 ❌
- **Warnings:** 3 ⚠️
- **Info:** 6 📝

## Test Results

### FAIL (1)

❌ **Navigation Flow**: Expected /business/ URL, got: https://d2jwts34z44xxd.cloudfront.net/dashboard
   - Time: 2025-09-02T08:09:19.613Z

### WARNING (3)

⚠️ **Console Error**: Console error: Failed to load resource: the server responded with a status of 403 ()
   - Time: 2025-09-02T08:09:16.545Z

⚠️ **Error Responses**: HTTP errors: 1
   - Time: 2025-09-02T08:09:24.717Z

⚠️ **HTTP Error**: 403 - https://d2jwts34z44xxd.cloudfront.net/dashboard
   - Time: 2025-09-02T08:09:24.717Z

### PASS (8)

✅ **Landing Page Load**: Page loaded successfully
   - URL: https://d2jwts34z44xxd.cloudfront.net/
   - Time: 2025-09-02T08:09:05.573Z

✅ **Get Started Button**: Found with selector: button:has-text("Get Started")
   - Time: 2025-09-02T08:09:09.203Z

✅ **Get Started Visibility**: Button is visible
   - Time: 2025-09-02T08:09:09.215Z

✅ **Business App Load**: Business app loaded successfully
   - URL: https://d2jwts34z44xxd.cloudfront.net/business/
   - Time: 2025-09-02T08:09:10.137Z

✅ **Business App URL**: Correctly serving from /business/ path: https://d2jwts34z44xxd.cloudfront.net/business/
   - Time: 2025-09-02T08:09:13.205Z

✅ **Business Content**: Found business indicator: text=Sign In
   - Time: 2025-09-02T08:09:13.216Z

✅ **Content Difference**: Different content served - similarity: 18.6%
   - Time: 2025-09-02T08:09:24.716Z

✅ **Title Difference**: Different titles: Landing="fead.app" vs Business="fead.app - Business Dashboard"
   - Time: 2025-09-02T08:09:24.717Z

### INFO (6)

📝 **Landing Page Title**: Title: "fead.app"
   - Time: 2025-09-02T08:09:09.194Z

📝 **Business App Title**: Title: "fead.app - Business Dashboard"
   - Time: 2025-09-02T08:09:13.205Z

📝 **Network Analysis**: Total requests: 19
   - Time: 2025-09-02T08:09:24.717Z

📝 **Landing Requests**: Landing page requests: 13
   - Time: 2025-09-02T08:09:24.717Z

📝 **Business Requests**: Business app requests: 6
   - Time: 2025-09-02T08:09:24.717Z

📝 **Asset Loading**: JS files: 5, CSS files: 5
   - Time: 2025-09-02T08:09:24.717Z

## Screenshots

- **Landing page initial load**: `01-landing-page.png`
- **Business application initial load**: `02-business-app.png`
- **Before clicking Get Started**: `03-before-navigation.png`
- **After clicking Get Started**: `04-after-navigation.png`
