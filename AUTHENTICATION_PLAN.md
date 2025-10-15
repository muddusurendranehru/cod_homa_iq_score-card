# Authentication System - Patient/Customer Login PRIMARY

## Build Order (Following Your Rules)

### Phase 1: Database ✅
- [x] Database "heart" schema ready
- [ ] Database created in Neon
- [ ] Tables created (run schema)

### Phase 2: Backend Authentication (100% complete before frontend)

#### PRIMARY: Patient/Customer Authentication
1. **Patient Sign Up** (email, password, confirm password)
   - Hash passwords with bcrypt
   - Store in `homa_patients` table
   - Generate JWT token
   
2. **Patient Login** (email, password)
   - Verify credentials
   - Return JWT token
   - Redirect to Patient Dashboard

3. **Patient Dashboard** (after login)
   - View own health records
   - View own assessments
   - Update personal information
   - View HOMA-IR scores
   - View risk assessment

#### SECONDARY: Admin Authentication
4. **Admin Login** (separate, for staff only)
   - Different credentials
   - Access to admin panel
   - Manage all patients
   - View all assessments

### Phase 3: Frontend (Only after backend 100% working)
1. Patient Sign Up page
2. Patient Login page  
3. Patient Dashboard
4. Admin Login page (secondary)
5. Admin Panel (secondary)

---

## Current Status

❌ **BLOCKER**: Database "heart" not created yet
- Need to create database in Neon
- Need to run schema to create tables

Once database is ready:
✅ Build patient authentication system (PRIMARY)
✅ Build admin authentication (SECONDARY)
✅ Then build frontend pages

---

## Tables Needed

### homa_patients (already in schema)
- id (UUID) - primary key
- name
- email ← for login
- password_hash ← for authentication
- age, gender, phone
- created_at, updated_at

### homa_assessments (already in schema)
- Links to patients via patient_id
- Stores all health data

---

## Next Steps

1. **CREATE "heart" DATABASE** (do this now!)
2. Build patient authentication endpoints
3. Build admin authentication endpoints
4. Test backend 100%
5. Only then: Build frontend

