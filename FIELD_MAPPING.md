# 🔍 FIELD NAME ALIGNMENT - DATABASE ↔ BACKEND ↔ FRONTEND

**CRITICAL:** All field names MUST match exactly across all layers!

## ✅ DATABASE SCHEMA → FRONTEND MAPPING

### **Patient Fields (homa_patients table)**
| Database Field | Type | Frontend Usage |
|---|---|---|
| `id` | SERIAL (INTEGER) | Patient ID (auto) |
| `name` | VARCHAR(255) | Patient name input |
| `age` | INTEGER | Age input (0-150) |
| `sex` | VARCHAR(10) | Select: male/female/other |
| `phone` | VARCHAR(15) | Phone input (+91...) |
| `email` | VARCHAR(255) | Email input (optional) |

### **Assessment Fields (homa_assessments table)**

#### **Basic Measurements**
| Database Field | Type | Frontend Input | Calculation |
|---|---|---|---|
| `height` | DECIMAL(5,2) | Number (cm) | - |
| `weight` | DECIMAL(5,2) | Number (kg) | - |
| `bmi` | DECIMAL(5,2) | **CALCULATED** | weight / (height/100)² |
| `waist_circumference` | DECIMAL(5,2) | Number (cm) | Used for scoring |

#### **Vital Signs**
| Database Field | Type | Frontend Input |
|---|---|---|
| `systolic_bp` | INTEGER | Number (mmHg) |
| `diastolic_bp` | INTEGER | Number (mmHg) |
| `heart_rate` | INTEGER | Number (bpm) |

#### **Metabolic Panel**
| Database Field | Type | Frontend Input | Calculation |
|---|---|---|---|
| `fasting_glucose` | DECIMAL(6,2) | Number (mg/dL) | Used in HOMA-IR, TYG |
| `fasting_insulin` | DECIMAL(6,2) | Number (μU/mL) | Used in HOMA-IR |
| `hba1c` | DECIMAL(4,2) | Number (%) | - |
| `c_peptide` | DECIMAL(6,2) | Number (ng/mL) | - |
| `post_lunch_blood_sugar` | DECIMAL(6,2) | Number (mg/dL) | - |
| `homa_ir` | DECIMAL(6,2) | **CALCULATED** | (glucose × insulin) / 405 |

#### **Lipid Profile**
| Database Field | Type | Frontend Input | Calculation |
|---|---|---|---|
| `total_cholesterol` | DECIMAL(6,2) | Number (mg/dL) | - |
| `ldl_cholesterol` | DECIMAL(6,2) | Number (mg/dL) | - |
| `hdl_cholesterol` | DECIMAL(6,2) | Number (mg/dL) | - |
| `triglycerides` | DECIMAL(6,2) | Number (mg/dL) | Used in TYG |
| `vldl_cholesterol` | DECIMAL(6,2) | Number (mg/dL) | - |
| `tyg_index` | DECIMAL(6,2) | **CALCULATED** | ln(triglycerides × glucose / 2) |

#### **Complete Blood Count (CBC)**
| Database Field | Type | Frontend Input |
|---|---|---|
| `hemoglobin` | DECIMAL(4,2) | Number (g/dL) |
| `hematocrit` | DECIMAL(5,2) | Number (%) |
| `rbc_count` | DECIMAL(4,2) | Number (million/μL) |
| `wbc_count` | DECIMAL(5,2) | Number (thousand/μL) |
| `platelet_count` | DECIMAL(6,1) | Number (thousand/μL) |

#### **Liver Function Tests (LFT)**
| Database Field | Type | Frontend Input |
|---|---|---|
| `sgpt_alt` | DECIMAL(6,2) | Number (U/L) |
| `sgot_ast` | DECIMAL(6,2) | Number (U/L) |
| `alkaline_phosphatase` | DECIMAL(6,2) | Number (U/L) |
| `total_bilirubin` | DECIMAL(4,2) | Number (mg/dL) |

#### **Kidney Function Tests (KFT)**
| Database Field | Type | Frontend Input |
|---|---|---|
| `creatinine` | DECIMAL(4,2) | Number (mg/dL) |
| `blood_urea` | DECIMAL(5,2) | Number (mg/dL) |
| `uric_acid` | DECIMAL(4,2) | Number (mg/dL) |

#### **Thyroid Function Tests (TFT)**
| Database Field | Type | Frontend Input |
|---|---|---|
| `tsh` | DECIMAL(6,3) | Number (μIU/mL) |
| `t3` | DECIMAL(6,2) | Number (ng/dL) |
| `t4` | DECIMAL(5,2) | Number (μg/dL) |

#### **Past History (Tick Boxes)**
| Database Field | Type | Frontend Input |
|---|---|---|
| `history_cag` | BOOLEAN | Checkbox (CAG) |
| `history_ptca` | BOOLEAN | Checkbox (PTCA) |
| `history_cva` | BOOLEAN | Checkbox (CVA/Stroke) |
| `history_alcohol` | BOOLEAN | Checkbox (Alcohol) |
| `history_smoker` | BOOLEAN | Checkbox (Smoker) |
| `history_drugs` | BOOLEAN | Checkbox (Drugs) |
| `history_menopause` | BOOLEAN | Checkbox (Menopause) |
| `history_cancer` | BOOLEAN | Checkbox (Cancer) |

#### **Family History**
| Database Field | Type | Frontend Input |
|---|---|---|
| `family_diabetes` | BOOLEAN | Checkbox |
| `family_hypertension` | BOOLEAN | Checkbox |
| `family_heart_disease` | BOOLEAN | Checkbox |

#### **Scoring & Risk**
| Database Field | Type | Frontend/Backend Calculated |
|---|---|---|
| `total_score` | INTEGER | Sum of all points (0-100) |
| `waist_score` | INTEGER | 20 if waist > 85cm, else 0 |
| `speedometer_zone` | VARCHAR(20) | green/blue_red/orange_red/red |
| `risk_category` | VARCHAR(20) | low/moderate/high/very_high |

---

## 🎯 SCORING RULES

### **Waist Score**
- Waist > 85 cm → **20 points**
- Waist ≤ 85 cm → **0 points**

### **Lab Parameters** (10 points each if abnormal)
- Abnormal CBC values
- Abnormal LFT values  
- Abnormal KFT values
- Abnormal TFT values
- etc.

### **Speedometer Zones**
- **0-39 points** → `green` (Low Risk)
- **40-59 points** → `blue_red` (Moderate Risk)
- **60-79 points** → `orange_red` (Moderate-High Risk)
- **80-100 points** → `red` (High Risk)

---

## 📦 API PAYLOAD EXAMPLE

```json
{
  "patient_id": 1,
  "height": 175.00,
  "weight": 70.00,
  "bmi": 22.86,
  "waist_circumference": 92.00,
  "systolic_bp": 130,
  "diastolic_bp": 85,
  "heart_rate": 72,
  "fasting_glucose": 90.00,
  "fasting_insulin": 10.00,
  "hba1c": 5.70,
  "c_peptide": 2.50,
  "post_lunch_blood_sugar": 140.00,
  "total_cholesterol": 200.00,
  "ldl_cholesterol": 120.00,
  "hdl_cholesterol": 45.00,
  "triglycerides": 150.00,
  "vldl_cholesterol": 30.00,
  "homa_ir": 2.22,
  "tyg_index": 8.81,
  "history_cag": false,
  "history_ptca": false,
  "history_cva": false,
  "history_alcohol": true,
  "history_smoker": true,
  "history_drugs": false,
  "history_menopause": false,
  "history_cancer": false,
  "family_diabetes": false,
  "family_hypertension": false,
  "family_heart_disease": false,
  "total_score": 40,
  "waist_score": 20,
  "speedometer_zone": "blue_red",
  "risk_category": "moderate",
  "lab_notes": "Initial assessment"
}
```

---

## ⚠️ CRITICAL RULES

1. **NEVER change database field names** without updating:
   - Backend API routes (`/api/assessments/route.ts`)
   - Frontend forms
   - This mapping document

2. **Use snake_case** for all database fields (e.g., `fasting_glucose`, NOT `fastingGlucose`)

3. **Frontend can use camelCase** in state, but MUST convert to snake_case for API calls

4. **All calculated fields** (BMI, HOMA-IR, TYG-INDEX) must use EXACT formulas:
   - BMI = weight(kg) / (height(m))²
   - HOMA-IR = (fasting_glucose × fasting_insulin) / 405
   - TYG-INDEX = ln(triglycerides × fasting_glucose / 2)

5. **Phone format**: +91 followed by 10 digits (India)

6. **INTEGER PRIMARY KEYS** everywhere (NOT UUID)

---

✅ **Last Updated:** Following backend test success
✅ **Database:** COD_HOMA_IQ_SCORE (Neon PostgreSQL)
✅ **Tables:** homa_users, homa_patients, homa_assessments

