# Conference Inquiry Form - Implementation Plan

## Overview
Create a multi-step conference inquiry form similar to the client's existing website (chernomorebg.com/events-request.html) using EmailJS for email notifications.

---

## Step 1: EmailJS Setup (External - User Action Required)

### 1.1 Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up for a free account
- Free plan includes: 200 emails/month, 2 email templates, 100 contacts

### 1.2 Configure Email Service
- Add an email service (Gmail, Outlook, or custom SMTP)
- For Gmail: Enable "App Passwords" in Google Account settings
- Connect the service to EmailJS

### 1.3 Create Email Template
- Template name: `conference_inquiry`
- Template ID: Will be generated (e.g., `template_abc123`)
- Email content should include all form fields

### 1.4 Get Credentials
- **Service ID**: e.g., `service_xyz789`
- **Template ID**: e.g., `template_abc123`
- **Public Key**: e.g., `user_def456`

---

## Step 2: Install Dependencies

```bash
npm install @emailjs/browser
```

---

## Step 3: Create Environment Configuration

### 3.1 Update `.env.example`
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_INQUIRY_EMAIL=info@chernomorebg.com
```

### 3.2 Create `.env` file (local development)
```env
VITE_EMAILJS_SERVICE_ID=service_xyz789
VITE_EMAILJS_TEMPLATE_ID=template_abc123
VITE_EMAILJS_PUBLIC_KEY=user_def456
VITE_INQUIRY_EMAIL=info@chernomorebg.com
```

---

## Step 4: Create Conference Inquiry Form Component

### 4.1 File: `src/components/ConferenceInquiryForm.tsx`

**Multi-step form with 7 steps:**

| Step | Title | Fields |
|------|-------|--------|
| 1 | Тип събитие | Event type (conference, seminar, training, meeting, other) |
| 2 | Дата и време | Preferred date, start time, end time, duration |
| 3 | Брой участници | Number of attendees |
| 4 | Избор на зала | Hall selection (Cherno More, Varna, Galata, Odesos, Bulgaria) |
| 5 | Подредба на залата | Setup type (theater, classroom, U-shape, boardroom) |
| 6 | Допълнителни изисквания | Catering, equipment, special requests |
| 7 | Контакти | Name, company, phone, email, notes |

**Component Features:**
- Progress indicator showing current step
- Form validation at each step
- Back/Next navigation
- Summary review before submission
- Loading state during submission
- Success/error messages

---

## Step 5: Update Conference Page

### 5.1 File: `src/pages/Conference.tsx`

**Changes:**
- Add "Изпрати запитване" button that opens the inquiry form modal
- Keep existing "Резервирай" button for room bookings
- Add modal/dialog wrapper for the inquiry form

---

## Step 6: Create Email Template Content

### 6.1 Email Template Structure (for EmailJS dashboard)

```
Subject: Ново запитване за конферентна зала - {{name}}

Ново запитване за конферентна зала:

--- ОСНОВНА ИНФОРМАЦИЯ ---
Тип събитие: {{event_type}}
Дата: {{event_date}}
Начало: {{start_time}}
Край: {{end_time}}
Брой участници: {{attendees}}

--- ЗАЛА ---
Избрана зала: {{hall}}
Подредба: {{setup}}

--- ДОПЪЛНИТЕЛНИ ИЗИСКВАНИЯ ---
Кетъринг: {{catering}}
Оборудване: {{equipment}}
Специални изисквания: {{special_requests}}

--- КОНТАКТИ ---
Име: {{name}}
Компания: {{company}}
Телефон: {{phone}}
Email: {{email}}
Бележки: {{notes}}
```

---

## Step 7: Testing

### 7.1 Local Testing
- Test form validation
- Test email submission
- Verify email is received at configured address
- Test all 7 steps flow

### 7.2 Edge Cases
- Required field validation
- Invalid email format
- Past date selection
- Minimum/maximum attendees

---

## Step 8: Deployment Notes

### 8.1 Environment Variables
- Add EmailJS credentials to production environment
- Vercel: Settings > Environment Variables
- Netlify: Site Settings > Environment Variables

### 8.2 EmailJS Production
- Verify email service is active
- Test with production email address

---

## File Structure

```
src/
├── components/
│   ├── ConferenceInquiryForm.tsx    (NEW - Main form component)
│   └── ...
├── pages/
│   ├── Conference.tsx               (MODIFIED - Add inquiry button)
│   └── ...
├── utils/
│   └── emailjs.ts                   (NEW - EmailJS configuration)
└── ...
.env                                 (NEW - Environment variables)
```

---

## Estimated Implementation Time

| Task | Time |
|------|------|
| EmailJS setup (user) | 15 min |
| Install dependencies | 5 min |
| Create form component | 2-3 hours |
| Update Conference page | 30 min |
| Testing | 1 hour |
| **Total** | **3-4 hours** |

---

## Future Enhancements (Optional)

1. **Admin Dashboard**: View all inquiries in a table
2. **Database Storage**: Save inquiries to Supabase/Firebase
3. **Auto-reply Email**: Send confirmation email to user
4. **File Upload**: Allow users to attach documents
5. **Calendar Integration**: Check hall availability in real-time
6. **Multi-language Support**: BG, EN, RU, UA, DE
