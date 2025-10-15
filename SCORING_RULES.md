# 🎯 SCORING RULES - C.O.D. HOMA IQ Score Card

## **Final Scoring System (Updated)**

### **1. Waist Circumference** ⭐
- **Waist > 85 cm** = **20 points**
- Waist ≤ 85 cm = 0 points

### **2. Past History (Tick Boxes)** ⭐
Each checked = **10 points**
- history_cag (CAG)
- history_ptca (PTCA)
- history_cva (CVA/Stroke)
- history_alcohol (Alcohol Use)
- history_smoker (Smoker)
- history_drugs (Drug Use)
- history_menopause (Menopause)
- history_cancer (Cancer)

### **3. Family History** ⭐ NEW
Each checked = **5 points**
- family_diabetes
- family_hypertension
- family_heart_disease

### **4. HOMA-IR (Calculated)**⭐ NEW
- **HOMA-IR > 2.5** = **10 points**
- HOMA-IR ≤ 2.5 = 0 points
- Formula: (fasting_glucose × fasting_insulin) / 405

### **5. TYG-INDEX (Calculated)** ⭐ NEW
- **TYG-INDEX > 8.5** = **10 points**
- TYG-INDEX ≤ 8.5 = 0 points
- Formula: ln(triglycerides × fasting_glucose / 2)

### **6. Blood Tests Abnormal** ⭐ NEW
Each abnormal test = **5 points**

**CBC (Complete Blood Count):**
- Hemoglobin: Outside 12-18 g/dL
- Hematocrit: Outside normal range
- RBC, WBC, Platelet counts: Outside normal range

**Lipid Profile:**
- Total Cholesterol > 200 mg/dL
- LDL > 100 mg/dL
- HDL < 40 mg/dL
- Triglycerides > 150 mg/dL

**Liver Function (LFT):**
- ALT/SGPT > 40 U/L
- AST/SGOT > 40 U/L
- Alkaline Phosphatase: Abnormal
- Bilirubin: Abnormal

**Kidney Function (KFT):**
- Creatinine: Outside 0.6-1.2 mg/dL
- Urea: Abnormal
- Uric Acid: Abnormal

**Thyroid Function (TFT):**
- TSH: Outside 0.4-4.0 mIU/L
- T3, T4: Abnormal

---

## **Total Score Calculation**

```
Total Score = 
  waist_score (0 or 20) +
  past_history_score (10 × number checked) +
  family_history_score (5 × number checked) +
  homa_ir_score (0 or 10) +
  tyg_index_score (0 or 10) +
  blood_tests_abnormal_score (5 × number abnormal)
```

**Maximum Possible Score:** 100+

---

## **Speedometer Zones**

- **80-100 points**: 🔴 **RED** (Very High Risk)
- **60-79 points**: 🟠 **ORANGE-RED** (High Risk)
- **40-59 points**: 🔵 **BLUE-RED** (Moderate Risk)
- **20-39 points**: 🟢 **GREEN** (Low-Moderate Risk)
- **0-19 points**: 🟢 **GREEN** (Low Risk)

---

## **Risk Categories**

- **≥80 points**: `very_high`
- **60-79 points**: `high`
- **40-59 points**: `moderate`
- **<40 points**: `low`

---

## **Database Fields Used**

### From `homa_assessments` table:
- `waist_circumference` (DECIMAL)
- `history_*` fields (8 BOOLEAN fields)
- `family_*` fields (3 BOOLEAN fields)
- `homa_ir` (DECIMAL - calculated)
- `tyg_index` (DECIMAL - calculated)
- `hemoglobin`, `total_cholesterol`, `ldl_cholesterol`, etc. (DECIMAL)
- `total_score` (INTEGER - calculated)
- `speedometer_zone` (VARCHAR)
- `risk_category` (VARCHAR)

---

✅ **All calculations happen automatically on form input!**
✅ **Scoring updates in real-time as user fills the form!**
✅ **Perfect alignment with database schema!**

