# C.O.D. H.O.M.A I.Q TEST - Cardiometabolic Risk Assessment

Comprehensive health assessment system by **Dr. Muddu Surendra Nehru MD**, Professor of Medicine at Homa Health Care Center.

## Features

- ✅ Patient Management System
- ✅ Comprehensive Health Assessments
- ✅ Complete Laboratory Analysis (CBC, Lipid Profile, LFT, KFT, TFT)
- ✅ HOMA-IR Calculation
- ✅ Cardiometabolic Risk Scoring
- ✅ Admin Panel for Data Management
- ✅ Database Integration with Supabase/Neon PostgreSQL

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Neon PostgreSQL (Supabase)
- **Analytics**: Vercel Analytics
- **Fonts**: Geist Sans & Mono

## Prerequisites

- Node.js 18+ 
- npm or pnpm
- Supabase/Neon PostgreSQL account

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
DATABASE_URL=your_neon_database_connection_string_here
```

### 3. Set Up Database

Run the SQL schema in your Neon/Supabase database:

```bash
# Copy the contents of database/schema.sql and run it in your Supabase SQL Editor
```

The database includes two main tables:
- `homa_patients` - Patient information (UUID primary key)
- `homa_assessments` - Health assessments and lab values (UUID primary key)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Access Admin Panel

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to manage patients and assessments.

## Project Structure

```
├── app/
│   ├── admin/
│   │   └── page.tsx         # Admin panel
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── loading.tsx          # Loading component
│   └── page.tsx             # Homepage
├── components/
│   ├── lab-values-form.tsx  # Comprehensive lab values form
│   └── ui/                  # shadcn/ui components
├── database/
│   └── schema.sql           # Database schema
├── lib/
│   ├── supabase/
│   │   └── client.ts        # Supabase client
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## Database Schema

### homa_patients Table
- Patient demographics (name, age, gender, phone, email)
- UUID primary key
- Timestamps (created_at, updated_at)

### homa_assessments Table
- Basic measurements (height, weight, BMI, waist circumference)
- Vital signs (blood pressure, heart rate)
- Metabolic panel (glucose, insulin, HbA1c, HOMA-IR)
- Lipid profile (cholesterol, LDL, HDL, triglycerides)
- Complete Blood Count (hemoglobin, WBC, RBC, platelets)
- Liver Function Tests (ALT, AST, ALP, bilirubin)
- Kidney Function Tests (creatinine, urea, uric acid)
- Thyroid Function Tests (TSH, T3, T4)
- Risk assessment (score, category)
- Family history (diabetes, hypertension, heart disease)
- Lab notes and test dates

## Features

### Patient Management
- Add, view, edit, and delete patients
- Search patients by name, email, or phone
- View patient assessment history

### Health Assessments
- Complete cardiometabolic risk evaluation
- Comprehensive lab value entry
- Automated HOMA-IR calculation
- Risk category classification (low, moderate, high, very_high)

### Lab Values
- Complete Blood Count (CBC)
- Lipid Profile
- Metabolic/Diabetes Panel
- Liver Function Tests (LFT)
- Kidney Function Tests (KFT)
- Thyroid Function Tests (TFT)
- Custom lab notes and observations

## Deployment

### Deploy to Vercel

```bash
vercel
```

Make sure to add your environment variables in the Vercel project settings.

## Contact

**Dr. Muddu Surendra Nehru MD**  
Professor of Medicine  
Homa Health Care Center  
Phone: 09963721999  
Website: [www.homahealthcarecenter.in](http://www.homahealthcarecenter.in)

## License

© 2025 Homa Health Care Center. All rights reserved.

