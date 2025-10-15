# Backend Setup Guide - COD HOMA IQ SCORE

## ✅ Database Phase: COMPLETE

- ✅ Database created: `COD_HOMA_IQ_SCORE`
- ✅ 3 Tables created with INTEGER primary keys
- ✅ Test data inserted and verified

---

## 🚀 Backend Phase: STARTED

### What We've Built:

#### 1. **Database Connection** (`lib/db.ts`)
- PostgreSQL connection pool
- Query helpers
- Connection testing

#### 2. **Authentication System** (`lib/auth.ts`)
- Password hashing (bcrypt)
- JWT token generation
- Token verification

#### 3. **API Routes Created:**

##### **Authentication Endpoints:**
- `POST /api/auth/signup` - Staff signup (email, password, confirmPassword)
- `POST /api/auth/login` - Staff login (email, password)
- `POST /api/auth/logout` - Staff logout

##### **Patient Endpoints:**
- `GET /api/patients` - Fetch all patients
- `POST /api/patients` - Create patient
- `GET /api/patients/[id]` - Fetch single patient
- `PUT /api/patients/[id]` - Update patient
- `DELETE /api/patients/[id]` - Delete patient

##### **Assessment Endpoints:**
- `GET /api/assessments` - Fetch all assessments (optional: filter by patient_id)
- `POST /api/assessments` - Create assessment with all fields

---

## ⚙️ Setup Steps:

### Step 1: Create `.env.local` file

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### Step 2: Update `.env.local` with your values

```env
DATABASE_URL=postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/COD_HOMA_IQ_SCORE?sslmode=require

JWT_SECRET=your-random-secret-key-at-least-32-characters-long
```

### Step 3: Test Backend

Restart the dev server:

```bash
npm run dev
```

Visit: `http://localhost:3031`

---

## 🧪 API Testing Guide

### Test Signup:
```bash
POST http://localhost:3031/api/auth/signup
Content-Type: application/json

{
  "name": "Dr. Nehru",
  "email": "doctor@homahealth.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "phone": "+919876543210",
  "role": "doctor"
}
```

### Test Login:
```bash
POST http://localhost:3031/api/auth/login
Content-Type: application/json

{
  "email": "doctor@homahealth.com",
  "password": "SecurePass123"
}
```

### Test Patient Create:
```bash
POST http://localhost:3031/api/patients
Content-Type: application/json

{
  "name": "Rajesh Kumar",
  "age": 45,
  "sex": "male",
  "phone": "+919963721999",
  "email": "rajesh@example.com"
}
```

### Test Patients Fetch:
```bash
GET http://localhost:3031/api/patients
```

### Test Assessment Create:
```bash
POST http://localhost:3031/api/assessments
Content-Type: application/json

{
  "patient_id": 1,
  "height": 170,
  "weight": 85.5,
  "bmi": 29.58,
  "waist_circumference": 92,
  "systolic_bp": 140,
  "diastolic_bp": 90,
  "fasting_glucose": 126.5,
  "history_smoker": true,
  "history_alcohol": true,
  "total_score": 75,
  "speedometer_zone": "orange_red"
}
```

---

## 📋 Validation Rules:

### Phone Numbers:
- **Format**: `+91XXXXXXXXXX` (10 digits after +91)
- **Example**: `+919963721999`

### Passwords:
- Minimum 8 characters
- Hashed with bcrypt (cost factor 12)

### Age:
- Between 0 and 150

### Sex:
- Must be: `male`, `female`, or `other`

---

## 🔒 Security Features:

1. ✅ Password hashing (bcrypt)
2. ✅ JWT authentication (7-day expiry)
3. ✅ Input validation
4. ✅ SQL injection prevention (parameterized queries)
5. ✅ Email format validation
6. ✅ Phone format validation (India)

---

## 🎯 Next Steps:

1. ✅ **Test all API endpoints** (use Postman or Thunder Client)
2. ⏳ **Build Frontend** (after backend success)
3. ⏳ **Create Login/Signup pages**
4. ⏳ **Create Dashboard**
5. ⏳ **Integrate speedometer visualization**

---

## 📦 Installed Dependencies:

- `pg` - PostgreSQL client
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `@types/pg` - TypeScript types for pg
- `@types/bcryptjs` - TypeScript types for bcrypt
- `@types/jsonwebtoken` - TypeScript types for JWT

---

## 🐛 Troubleshooting:

### If you see database connection errors:
1. Check `.env.local` has correct `DATABASE_URL`
2. Verify Neon database is accessible
3. Check if `COD_HOMA_IQ_SCORE` database exists

### If you see JWT errors:
1. Ensure `JWT_SECRET` is set in `.env.local`
2. Make sure it's at least 32 characters

---

## 📁 File Structure:

```
app/
├── api/
│   ├── auth/
│   │   ├── signup/route.ts
│   │   ├── login/route.ts
│   │   └── logout/route.ts
│   ├── patients/
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   └── assessments/
│       └── route.ts
lib/
├── db.ts
└── auth.ts
```

---

**Status: Ready for Backend Testing! 🚀**

