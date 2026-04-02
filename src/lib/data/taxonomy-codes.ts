/**
 * NUCC Health Care Provider Taxonomy Code Set
 *
 * The National Uniform Claim Committee (NUCC) Health Care Provider Taxonomy is a
 * standardized classification system used in the NPI Registry. Codes are 10-character
 * alphanumeric strings organized hierarchically:
 *   Level 1: Grouping (e.g., "Allopathic & Osteopathic Physicians")
 *   Level 2: Classification (e.g., "Internal Medicine")
 *   Level 3: Specialization (e.g., "Cardiovascular Disease")
 *
 * This is a representative subset of the most commonly used codes (~200+).
 * Source: NUCC taxonomy code set (https://taxonomy.nucc.org/)
 */

export interface TaxonomyCode {
    /** 10-character alphanumeric code (e.g., "207RC0000X") */
    code: string;
    /** Level 1 grouping (e.g., "Allopathic & Osteopathic Physicians") */
    grouping: string;
    /** Level 2 classification (e.g., "Internal Medicine") */
    classification: string;
    /** Level 3 specialization (e.g., "Cardiovascular Disease") or "" if none */
    specialization: string;
    /** Brief description of the provider type */
    definition: string;
}

// ── Grouping constants ──────────────────────────────────────────────────────
const PHYSICIANS = "Allopathic & Osteopathic Physicians";
const BEHAVIORAL = "Behavioral Health & Social Service Providers";
const CHIRO = "Chiropractic Providers";
const DENTAL = "Dental Providers";
const DIETARY = "Dietary & Nutritional Service Providers";
const EMERGENCY = "Emergency Medical Service Providers";
const EYE = "Eye and Vision Services Providers";
const NURSING = "Nursing Service Providers";
const NRS_RELATED = "Nursing Service Related Providers";
const PHARMACY = "Pharmacy Service Providers";
const PA = "Physician Assistants & Advanced Practice Nursing Providers";
const PODIATRIC = "Podiatric Medicine & Surgery Service Providers";
const RESPIRATORY = "Respiratory, Developmental, Rehabilitative and Restorative Service Providers";
const SPEECH = "Speech, Language and Hearing Service Providers";
const TECHNO = "Technologists, Technicians & Other Technical Service Providers";
const AGENCIES = "Agencies";
const AMBULANCE = "Ambulance Service Providers";
const HOSPITALS = "Hospitals";
const LABS = "Laboratories";
const MANAGED_CARE = "Managed Care Organizations";
const NURSING_CUSTODIAL = "Nursing & Custodial Care Facilities";
const RESIDENTIAL = "Residential Treatment Facilities";
const SUPPLIERS = "Suppliers";
const TRANS_SERVICES = "Transportation Services";
const OTHER = "Other Service Providers";
const GROUP = "Group";

export const TAXONOMY_CODES: TaxonomyCode[] = [
    // ═══════════════════════════════════════════════════════════════════════
    // BEHAVIORAL HEALTH & SOCIAL SERVICE PROVIDERS
    // ═══════════════════════════════════════════════════════════════════════
    { code: "101Y00000X", grouping: BEHAVIORAL, classification: "Counselor", specialization: "", definition: "A provider who is trained and educated in the performance of behavior health services through interpersonal communications, analyses, and processes." },
    { code: "101YA0400X", grouping: BEHAVIORAL, classification: "Counselor", specialization: "Addiction (Substance Use Disorder)", definition: "A counselor who specializes in the treatment of substance use disorders." },
    { code: "101YM0800X", grouping: BEHAVIORAL, classification: "Counselor", specialization: "Mental Health", definition: "A counselor who specializes in the treatment of mental health issues." },
    { code: "101YP1600X", grouping: BEHAVIORAL, classification: "Counselor", specialization: "Pastoral", definition: "A counselor who integrates spiritual and religious values into counseling practice." },
    { code: "101YP2500X", grouping: BEHAVIORAL, classification: "Counselor", specialization: "Professional", definition: "A counselor who provides professional counseling services." },
    { code: "101YS0200X", grouping: BEHAVIORAL, classification: "Counselor", specialization: "School", definition: "A counselor who assists students in educational, personal, and social development." },
    { code: "102L00000X", grouping: BEHAVIORAL, classification: "Psychoanalyst", specialization: "", definition: "A practitioner of psychoanalysis, a form of therapy rooted in psychoanalytic theory." },
    { code: "102X00000X", grouping: BEHAVIORAL, classification: "Poetry Therapist", specialization: "", definition: "A therapist who uses poetry and other forms of literature for therapeutic purposes." },
    { code: "103G00000X", grouping: BEHAVIORAL, classification: "Clinical Neuropsychologist", specialization: "", definition: "A psychologist who specializes in applied science of brain-behavior relationships." },
    { code: "103T00000X", grouping: BEHAVIORAL, classification: "Psychologist", specialization: "", definition: "A provider trained in the science of behavior and mental processes." },
    { code: "103TA0400X", grouping: BEHAVIORAL, classification: "Psychologist", specialization: "Addiction (Substance Use Disorder)", definition: "A psychologist specializing in the assessment and treatment of substance use disorders." },
    { code: "103TA0700X", grouping: BEHAVIORAL, classification: "Psychologist", specialization: "Adult Development & Aging", definition: "A psychologist specializing in adult development and the aging process." },
    { code: "103TC0700X", grouping: BEHAVIORAL, classification: "Psychologist", specialization: "Clinical", definition: "A psychologist specializing in the diagnosis and treatment of mental disorders." },
    { code: "103TC2200X", grouping: BEHAVIORAL, classification: "Psychologist", specialization: "Clinical Child & Adolescent", definition: "A psychologist specializing in the diagnosis and treatment of mental health conditions in children and adolescents." },
    { code: "103TF0000X", grouping: BEHAVIORAL, classification: "Psychologist", specialization: "Family", definition: "A psychologist specializing in family dynamics and therapy." },
    { code: "103TH0100X", grouping: BEHAVIORAL, classification: "Psychologist", specialization: "Health Service", definition: "A psychologist trained to deliver health services in clinical settings." },
    { code: "103TP2701X", grouping: BEHAVIORAL, classification: "Psychologist", specialization: "Prescribing (Medical)", definition: "A psychologist authorized to prescribe psychotropic medications." },
    { code: "103TS0200X", grouping: BEHAVIORAL, classification: "Psychologist", specialization: "School", definition: "A psychologist who works in educational settings to support students." },
    { code: "104100000X", grouping: BEHAVIORAL, classification: "Social Worker", specialization: "", definition: "A provider who helps people solve and cope with problems in their everyday lives." },
    { code: "1041C0700X", grouping: BEHAVIORAL, classification: "Social Worker", specialization: "Clinical", definition: "A social worker who diagnoses and treats mental, behavioral, and emotional disorders." },
    { code: "1041S0200X", grouping: BEHAVIORAL, classification: "Social Worker", specialization: "School", definition: "A social worker who works in educational settings." },
    { code: "106H00000X", grouping: BEHAVIORAL, classification: "Marriage & Family Therapist", specialization: "", definition: "A therapist who treats mental and emotional disorders within the context of marriage and family systems." },

    // ═══════════════════════════════════════════════════════════════════════
    // CHIROPRACTIC PROVIDERS
    // ═══════════════════════════════════════════════════════════════════════
    { code: "111N00000X", grouping: CHIRO, classification: "Chiropractor", specialization: "", definition: "A provider who diagnoses and treats neuromuscular disorders, primarily through manual adjustment and/or manipulation of the spine." },
    { code: "111NI0013X", grouping: CHIRO, classification: "Chiropractor", specialization: "Independent Medical Examiner", definition: "A chiropractor who performs independent medical examinations." },
    { code: "111NI0900X", grouping: CHIRO, classification: "Chiropractor", specialization: "Internist", definition: "A chiropractor with additional training in internal disorders." },
    { code: "111NN0400X", grouping: CHIRO, classification: "Chiropractor", specialization: "Neurology", definition: "A chiropractor with additional training in neurology." },
    { code: "111NR0200X", grouping: CHIRO, classification: "Chiropractor", specialization: "Radiology", definition: "A chiropractor with additional training in radiology." },
    { code: "111NS0005X", grouping: CHIRO, classification: "Chiropractor", specialization: "Sports Physician", definition: "A chiropractor specializing in sports medicine." },
    { code: "111NX0100X", grouping: CHIRO, classification: "Chiropractor", specialization: "Occupational Health", definition: "A chiropractor specializing in occupational health." },
    { code: "111NX0800X", grouping: CHIRO, classification: "Chiropractor", specialization: "Orthopedic", definition: "A chiropractor with additional training in orthopedics." },
    { code: "111NP0017X", grouping: CHIRO, classification: "Chiropractor", specialization: "Pediatric Chiropractor", definition: "A chiropractor specializing in the care of children." },

    // ═══════════════════════════════════════════════════════════════════════
    // DENTAL PROVIDERS
    // ═══════════════════════════════════════════════════════════════════════
    { code: "122300000X", grouping: DENTAL, classification: "Dentist", specialization: "", definition: "A provider who diagnoses, treats, and helps prevent diseases and conditions of the teeth and oral cavity." },
    { code: "1223D0001X", grouping: DENTAL, classification: "Dentist", specialization: "Dental Public Health", definition: "A dentist specializing in community dental health programs." },
    { code: "1223E0200X", grouping: DENTAL, classification: "Dentist", specialization: "Endodontics", definition: "A dentist specializing in root canal treatment and diseases of the dental pulp." },
    { code: "1223G0001X", grouping: DENTAL, classification: "Dentist", specialization: "General Practice", definition: "A dentist providing comprehensive dental care." },
    { code: "1223P0106X", grouping: DENTAL, classification: "Dentist", specialization: "Oral and Maxillofacial Pathology", definition: "A dentist specializing in the diagnosis of diseases affecting the oral and maxillofacial regions." },
    { code: "1223P0221X", grouping: DENTAL, classification: "Dentist", specialization: "Pediatric Dentistry", definition: "A dentist specializing in the oral care of children." },
    { code: "1223P0300X", grouping: DENTAL, classification: "Dentist", specialization: "Periodontics", definition: "A dentist specializing in the treatment of diseases of the gums and supporting structures of the teeth." },
    { code: "1223P0700X", grouping: DENTAL, classification: "Dentist", specialization: "Prosthodontics", definition: "A dentist specializing in dentures, bridges, and implants." },
    { code: "1223S0112X", grouping: DENTAL, classification: "Dentist", specialization: "Oral and Maxillofacial Surgery", definition: "A dentist specializing in surgery of the mouth, jaws, and face." },
    { code: "1223X0008X", grouping: DENTAL, classification: "Dentist", specialization: "Oral and Maxillofacial Radiology", definition: "A dentist specializing in radiographic imaging of the oral and maxillofacial region." },
    { code: "1223X0400X", grouping: DENTAL, classification: "Dentist", specialization: "Orthodontics and Dentofacial Orthopedics", definition: "A dentist specializing in the correction of malocclusion and facial irregularities." },
    { code: "124Q00000X", grouping: DENTAL, classification: "Dental Hygienist", specialization: "", definition: "A provider who cleans teeth and provides preventive dental care." },
    { code: "126800000X", grouping: DENTAL, classification: "Dental Assistant", specialization: "", definition: "A provider who assists dentists during dental procedures." },

    // ═══════════════════════════════════════════════════════════════════════
    // DIETARY & NUTRITIONAL SERVICE PROVIDERS
    // ═══════════════════════════════════════════════════════════════════════
    { code: "133V00000X", grouping: DIETARY, classification: "Dietitian, Registered", specialization: "", definition: "A food and nutrition expert who has met academic and professional requirements." },
    { code: "133VN1006X", grouping: DIETARY, classification: "Dietitian, Registered", specialization: "Nutrition, Metabolic", definition: "A registered dietitian specializing in metabolic nutrition." },
    { code: "136A00000X", grouping: DIETARY, classification: "Dietetic Technician, Registered", specialization: "", definition: "A technician trained in food and nutrition who works under a dietitian." },

    // ═══════════════════════════════════════════════════════════════════════
    // EYE AND VISION SERVICES PROVIDERS
    // ═══════════════════════════════════════════════════════════════════════
    { code: "152W00000X", grouping: EYE, classification: "Optometrist", specialization: "", definition: "A provider who examines, diagnoses, treats, and manages diseases and disorders of the visual system." },
    { code: "152WC0802X", grouping: EYE, classification: "Optometrist", specialization: "Corneal and Contact Management", definition: "An optometrist specializing in corneal diseases and contact lens fitting." },
    { code: "152WL0500X", grouping: EYE, classification: "Optometrist", specialization: "Low Vision Rehabilitation", definition: "An optometrist specializing in low vision rehabilitation." },
    { code: "152WP0200X", grouping: EYE, classification: "Optometrist", specialization: "Pediatrics", definition: "An optometrist specializing in children's eye care." },
    { code: "152WS0006X", grouping: EYE, classification: "Optometrist", specialization: "Sports Vision", definition: "An optometrist specializing in sports-related vision care." },
    { code: "152WV0400X", grouping: EYE, classification: "Optometrist", specialization: "Vision Therapy", definition: "An optometrist specializing in therapeutic vision exercises." },
    { code: "156FX1700X", grouping: EYE, classification: "Technician/Technologist", specialization: "Ocularist", definition: "A technician who designs, fabricates, and fits ocular prostheses." },
    { code: "156FX1800X", grouping: EYE, classification: "Technician/Technologist", specialization: "Optician", definition: "A technician who designs, verifies, and fits lenses and frames." },
    { code: "156FX1900X", grouping: EYE, classification: "Technician/Technologist", specialization: "Orthoptist", definition: "A provider who evaluates and treats disorders of eye movement." },

    // ═══════════════════════════════════════════════════════════════════════
    // EMERGENCY MEDICAL SERVICE PROVIDERS
    // ═══════════════════════════════════════════════════════════════════════
    { code: "146N00000X", grouping: EMERGENCY, classification: "Electrodiagnostic Medicine Specialist", specialization: "", definition: "A provider specializing in electrodiagnostic medicine." },
    { code: "171100000X", grouping: OTHER, classification: "Acupuncturist", specialization: "", definition: "A provider who practices acupuncture for treatment of health conditions." },
    { code: "174400000X", grouping: OTHER, classification: "Specialist", specialization: "", definition: "A provider with specialized training in a specific area." },
    { code: "174H00000X", grouping: OTHER, classification: "Health Educator", specialization: "", definition: "A provider who educates individuals and communities about health-related topics." },
    { code: "174M00000X", grouping: OTHER, classification: "Veterinarian", specialization: "", definition: "A medical professional who practices veterinary medicine." },
    { code: "175L00000X", grouping: OTHER, classification: "Naturopath", specialization: "", definition: "A provider who practices naturopathic medicine, using natural therapies." },
    { code: "176B00000X", grouping: OTHER, classification: "Midwife", specialization: "", definition: "A provider who assists in childbirth and provides prenatal and postnatal care." },

    // ═══════════════════════════════════════════════════════════════════════
    // NURSING SERVICE PROVIDERS
    // ═══════════════════════════════════════════════════════════════════════
    { code: "163W00000X", grouping: NURSING, classification: "Registered Nurse", specialization: "", definition: "A nurse who has completed a program of nursing education and is licensed to practice." },
    { code: "163WA0400X", grouping: NURSING, classification: "Registered Nurse", specialization: "Addiction (Substance Use Disorder)", definition: "A registered nurse specializing in the care of patients with substance use disorders." },
    { code: "163WC0400X", grouping: NURSING, classification: "Registered Nurse", specialization: "Case Management", definition: "A registered nurse who coordinates care for patients across healthcare settings." },
    { code: "163WC3500X", grouping: NURSING, classification: "Registered Nurse", specialization: "Cardiac Rehabilitation", definition: "A registered nurse specializing in cardiac rehabilitation programs." },
    { code: "163WG0000X", grouping: NURSING, classification: "Registered Nurse", specialization: "General Practice", definition: "A registered nurse providing general nursing care." },
    { code: "163WG0600X", grouping: NURSING, classification: "Registered Nurse", specialization: "Gastroenterology", definition: "A registered nurse specializing in gastroenterology." },
    { code: "163WI0600X", grouping: NURSING, classification: "Registered Nurse", specialization: "Infection Control", definition: "A registered nurse specializing in infection prevention and control." },
    { code: "163WP0808X", grouping: NURSING, classification: "Registered Nurse", specialization: "Psychiatric/Mental Health", definition: "A registered nurse specializing in psychiatric and mental health care." },
    { code: "163WP0809X", grouping: NURSING, classification: "Registered Nurse", specialization: "Psychiatric/Mental Health, Adult", definition: "A registered nurse specializing in adult psychiatric and mental health care." },
    { code: "163WP2201X", grouping: NURSING, classification: "Registered Nurse", specialization: "Ambulatory Care", definition: "A registered nurse working in ambulatory care settings." },
    { code: "163WX0002X", grouping: NURSING, classification: "Registered Nurse", specialization: "Obstetric, High-Risk", definition: "A registered nurse specializing in high-risk obstetric care." },
    { code: "163WX0003X", grouping: NURSING, classification: "Registered Nurse", specialization: "Obstetric, Inpatient", definition: "A registered nurse specializing in inpatient obstetric care." },
    { code: "164W00000X", grouping: NURSING, classification: "Licensed Practical Nurse", specialization: "", definition: "A nurse who has completed a practical nursing program and is licensed to provide basic nursing care." },
    { code: "167G00000X", grouping: NURSING, classification: "Licensed Psychiatric Technician", specialization: "", definition: "A technician licensed to provide care to patients with psychiatric disorders." },

    // ═══════════════════════════════════════════════════════════════════════
    // PHARMACY SERVICE PROVIDERS
    // ═══════════════════════════════════════════════════════════════════════
    { code: "183500000X", grouping: PHARMACY, classification: "Pharmacist", specialization: "", definition: "A provider who prepares and dispenses medications and provides drug information to patients and healthcare providers." },
    { code: "1835G0000X", grouping: PHARMACY, classification: "Pharmacist", specialization: "General Practice", definition: "A pharmacist providing general pharmaceutical services." },
    { code: "1835N0905X", grouping: PHARMACY, classification: "Pharmacist", specialization: "Nuclear Pharmacy", definition: "A pharmacist specializing in the preparation and dispensing of radioactive medications." },
    { code: "1835P1200X", grouping: PHARMACY, classification: "Pharmacist", specialization: "Pharmacotherapy", definition: "A pharmacist specializing in pharmacotherapy management." },
    { code: "1835P1300X", grouping: PHARMACY, classification: "Pharmacist", specialization: "Pharmacy", definition: "A pharmacist providing clinical pharmacy services." },
    { code: "183700000X", grouping: PHARMACY, classification: "Pharmacy Technician", specialization: "", definition: "A technician who assists pharmacists in preparing and dispensing medications." },

    // ═══════════════════════════════════════════════════════════════════════
    // PHYSICIAN ASSISTANTS & ADVANCED PRACTICE NURSING PROVIDERS
    // ═══════════════════════════════════════════════════════════════════════
    { code: "363A00000X", grouping: PA, classification: "Physician Assistant", specialization: "", definition: "A provider who practices medicine under the supervision of or in collaboration with a physician." },
    { code: "363AM0700X", grouping: PA, classification: "Physician Assistant", specialization: "Medical", definition: "A physician assistant practicing in a medical specialty." },
    { code: "363AS0400X", grouping: PA, classification: "Physician Assistant", specialization: "Surgical", definition: "A physician assistant practicing in surgical settings." },
    { code: "363L00000X", grouping: PA, classification: "Nurse Practitioner", specialization: "", definition: "An advanced practice registered nurse who provides primary and specialty care." },
    { code: "363LA2100X", grouping: PA, classification: "Nurse Practitioner", specialization: "Acute Care", definition: "A nurse practitioner specializing in the care of acutely ill patients." },
    { code: "363LA2200X", grouping: PA, classification: "Nurse Practitioner", specialization: "Adult Health", definition: "A nurse practitioner specializing in adult health care." },
    { code: "363LC0200X", grouping: PA, classification: "Nurse Practitioner", specialization: "Critical Care Medicine", definition: "A nurse practitioner specializing in critical care medicine." },
    { code: "363LC1500X", grouping: PA, classification: "Nurse Practitioner", specialization: "Community Health", definition: "A nurse practitioner specializing in community health." },
    { code: "363LF0000X", grouping: PA, classification: "Nurse Practitioner", specialization: "Family", definition: "A nurse practitioner providing comprehensive family care." },
    { code: "363LG0600X", grouping: PA, classification: "Nurse Practitioner", specialization: "Gerontology", definition: "A nurse practitioner specializing in the care of older adults." },
    { code: "363LN0000X", grouping: PA, classification: "Nurse Practitioner", specialization: "Neonatal", definition: "A nurse practitioner specializing in newborn care." },
    { code: "363LN0005X", grouping: PA, classification: "Nurse Practitioner", specialization: "Neonatal, Critical Care", definition: "A nurse practitioner specializing in critical care of newborns." },
    { code: "363LP0200X", grouping: PA, classification: "Nurse Practitioner", specialization: "Pediatrics", definition: "A nurse practitioner specializing in the care of children." },
    { code: "363LP0222X", grouping: PA, classification: "Nurse Practitioner", specialization: "Pediatrics, Critical Care", definition: "A nurse practitioner specializing in pediatric critical care." },
    { code: "363LP0808X", grouping: PA, classification: "Nurse Practitioner", specialization: "Psychiatric/Mental Health", definition: "A nurse practitioner specializing in psychiatric and mental health care." },
    { code: "363LP1700X", grouping: PA, classification: "Nurse Practitioner", specialization: "Perinatal", definition: "A nurse practitioner specializing in perinatal care." },
    { code: "363LS0200X", grouping: PA, classification: "Nurse Practitioner", specialization: "School", definition: "A nurse practitioner working in school settings." },
    { code: "363LW0102X", grouping: PA, classification: "Nurse Practitioner", specialization: "Women's Health", definition: "A nurse practitioner specializing in women's health." },
    { code: "363LX0001X", grouping: PA, classification: "Nurse Practitioner", specialization: "Obstetrics & Gynecology", definition: "A nurse practitioner specializing in obstetrics and gynecology." },
    { code: "363LX0106X", grouping: PA, classification: "Nurse Practitioner", specialization: "Occupational Health", definition: "A nurse practitioner specializing in occupational health." },
    { code: "364S00000X", grouping: PA, classification: "Clinical Nurse Specialist", specialization: "", definition: "An advanced practice nurse who provides expertise in a specialized area of nursing." },
    { code: "364SA2100X", grouping: PA, classification: "Clinical Nurse Specialist", specialization: "Acute Care", definition: "A clinical nurse specialist in acute care settings." },
    { code: "364SA2200X", grouping: PA, classification: "Clinical Nurse Specialist", specialization: "Adult Health", definition: "A clinical nurse specialist in adult health." },
    { code: "364SC0200X", grouping: PA, classification: "Clinical Nurse Specialist", specialization: "Critical Care Medicine", definition: "A clinical nurse specialist in critical care." },
    { code: "364SC1501X", grouping: PA, classification: "Clinical Nurse Specialist", specialization: "Community Health/Public Health", definition: "A clinical nurse specialist in community and public health." },
    { code: "364SE0003X", grouping: PA, classification: "Clinical Nurse Specialist", specialization: "Emergency", definition: "A clinical nurse specialist in emergency care." },
    { code: "364SF0001X", grouping: PA, classification: "Clinical Nurse Specialist", specialization: "Family Health", definition: "A clinical nurse specialist in family health." },
    { code: "364SG0600X", grouping: PA, classification: "Clinical Nurse Specialist", specialization: "Gerontology", definition: "A clinical nurse specialist in gerontology." },
    { code: "364SN0000X", grouping: PA, classification: "Clinical Nurse Specialist", specialization: "Neonatal", definition: "A clinical nurse specialist in neonatal care." },
    { code: "364SP0200X", grouping: PA, classification: "Clinical Nurse Specialist", specialization: "Pediatrics", definition: "A clinical nurse specialist in pediatric care." },
    { code: "364SP0807X", grouping: PA, classification: "Clinical Nurse Specialist", specialization: "Psychiatric/Mental Health, Child & Adolescent", definition: "A clinical nurse specialist in child/adolescent psychiatry." },
    { code: "364SP0808X", grouping: PA, classification: "Clinical Nurse Specialist", specialization: "Psychiatric/Mental Health", definition: "A clinical nurse specialist in psychiatric and mental health." },
    { code: "364SP0809X", grouping: PA, classification: "Clinical Nurse Specialist", specialization: "Psychiatric/Mental Health, Adult", definition: "A clinical nurse specialist in adult psychiatric and mental health." },
    { code: "364SP0810X", grouping: PA, classification: "Clinical Nurse Specialist", specialization: "Psychiatric/Mental Health, Child & Family", definition: "A clinical nurse specialist in child and family psychiatric care." },
    { code: "364SP0811X", grouping: PA, classification: "Clinical Nurse Specialist", specialization: "Psychiatric/Mental Health, Chronically Ill", definition: "A clinical nurse specialist in care of chronically mentally ill patients." },
    { code: "364SP0812X", grouping: PA, classification: "Clinical Nurse Specialist", specialization: "Psychiatric/Mental Health, Community", definition: "A clinical nurse specialist in community psychiatric and mental health." },
    { code: "364SW0102X", grouping: PA, classification: "Clinical Nurse Specialist", specialization: "Women's Health", definition: "A clinical nurse specialist in women's health." },
    { code: "367500000X", grouping: PA, classification: "Nurse Anesthetist, Certified Registered", specialization: "", definition: "A registered nurse who administers anesthesia for surgical and other procedures." },
    { code: "367A00000X", grouping: PA, classification: "Advanced Practice Midwife", specialization: "", definition: "A certified nurse-midwife who provides prenatal, labor, delivery, and postpartum care." },
    { code: "367H00000X", grouping: PA, classification: "Anesthesiologist Assistant", specialization: "", definition: "A provider who assists anesthesiologists in developing and implementing anesthesia care plans." },

    // ═══════════════════════════════════════════════════════════════════════
    // PODIATRIC MEDICINE & SURGERY
    // ═══════════════════════════════════════════════════════════════════════
    { code: "213E00000X", grouping: PODIATRIC, classification: "Podiatrist", specialization: "", definition: "A provider who diagnoses and treats conditions of the foot, ankle, and related structures." },
    { code: "213EG0000X", grouping: PODIATRIC, classification: "Podiatrist", specialization: "General Practice", definition: "A podiatrist providing general podiatric care." },
    { code: "213EP0504X", grouping: PODIATRIC, classification: "Podiatrist", specialization: "Public Medicine", definition: "A podiatrist practicing in public health settings." },
    { code: "213EP1101X", grouping: PODIATRIC, classification: "Podiatrist", specialization: "Primary Podiatric Medicine", definition: "A podiatrist providing primary podiatric care." },
    { code: "213ES0000X", grouping: PODIATRIC, classification: "Podiatrist", specialization: "Sports Medicine", definition: "A podiatrist specializing in sports-related foot and ankle conditions." },
    { code: "213ES0103X", grouping: PODIATRIC, classification: "Podiatrist", specialization: "Foot & Ankle Surgery", definition: "A podiatrist specializing in surgical treatment of the foot and ankle." },
    { code: "213ES0131X", grouping: PODIATRIC, classification: "Podiatrist", specialization: "Foot Surgery", definition: "A podiatrist specializing in foot surgery." },

    // ═══════════════════════════════════════════════════════════════════════
    // RESPIRATORY, REHABILITATIVE PROVIDERS
    // ═══════════════════════════════════════════════════════════════════════
    { code: "225100000X", grouping: RESPIRATORY, classification: "Physical Therapist", specialization: "", definition: "A provider who evaluates and treats conditions that limit the body's ability to move and perform functional activities." },
    { code: "2251C2600X", grouping: RESPIRATORY, classification: "Physical Therapist", specialization: "Cardiopulmonary", definition: "A physical therapist specializing in cardiopulmonary rehabilitation." },
    { code: "2251E1200X", grouping: RESPIRATORY, classification: "Physical Therapist", specialization: "Ergonomics", definition: "A physical therapist specializing in ergonomic assessment and intervention." },
    { code: "2251E1300X", grouping: RESPIRATORY, classification: "Physical Therapist", specialization: "Electrophysiology, Clinical", definition: "A physical therapist specializing in clinical electrophysiology." },
    { code: "2251G0304X", grouping: RESPIRATORY, classification: "Physical Therapist", specialization: "Geriatrics", definition: "A physical therapist specializing in the care of older adults." },
    { code: "2251H1200X", grouping: RESPIRATORY, classification: "Physical Therapist", specialization: "Hand", definition: "A physical therapist specializing in hand rehabilitation." },
    { code: "2251H1300X", grouping: RESPIRATORY, classification: "Physical Therapist", specialization: "Human Factors", definition: "A physical therapist specializing in human factors and ergonomics." },
    { code: "2251N0400X", grouping: RESPIRATORY, classification: "Physical Therapist", specialization: "Neurology", definition: "A physical therapist specializing in neurological rehabilitation." },
    { code: "2251P0200X", grouping: RESPIRATORY, classification: "Physical Therapist", specialization: "Pediatrics", definition: "A physical therapist specializing in pediatric rehabilitation." },
    { code: "2251S0007X", grouping: RESPIRATORY, classification: "Physical Therapist", specialization: "Sports", definition: "A physical therapist specializing in sports rehabilitation." },
    { code: "2251X0800X", grouping: RESPIRATORY, classification: "Physical Therapist", specialization: "Orthopedic", definition: "A physical therapist specializing in orthopedic conditions." },
    { code: "225200000X", grouping: RESPIRATORY, classification: "Physical Therapy Assistant", specialization: "", definition: "A provider who assists physical therapists in treatment implementation." },
    { code: "225X00000X", grouping: RESPIRATORY, classification: "Occupational Therapist", specialization: "", definition: "A provider who helps people participate in daily activities and occupations through therapeutic use of everyday activities." },
    { code: "225XE1200X", grouping: RESPIRATORY, classification: "Occupational Therapist", specialization: "Ergonomics", definition: "An occupational therapist specializing in ergonomic assessment." },
    { code: "225XG0600X", grouping: RESPIRATORY, classification: "Occupational Therapist", specialization: "Gerontology", definition: "An occupational therapist specializing in care of older adults." },
    { code: "225XH1200X", grouping: RESPIRATORY, classification: "Occupational Therapist", specialization: "Hand", definition: "An occupational therapist specializing in hand rehabilitation." },
    { code: "225XH1300X", grouping: RESPIRATORY, classification: "Occupational Therapist", specialization: "Human Factors", definition: "An occupational therapist specializing in human factors." },
    { code: "225XN1300X", grouping: RESPIRATORY, classification: "Occupational Therapist", specialization: "Neurorehabilitation", definition: "An occupational therapist specializing in neurorehabilitation." },
    { code: "225XP0200X", grouping: RESPIRATORY, classification: "Occupational Therapist", specialization: "Pediatrics", definition: "An occupational therapist specializing in pediatric care." },
    { code: "225XR0403X", grouping: RESPIRATORY, classification: "Occupational Therapist", specialization: "Driving and Community Mobility", definition: "An occupational therapist specializing in driving rehabilitation." },
    { code: "226300000X", grouping: RESPIRATORY, classification: "Kinesiotherapist", specialization: "", definition: "A provider who uses exercise and movement to treat disease and injury." },
    { code: "227800000X", grouping: RESPIRATORY, classification: "Respiratory Therapist, Certified", specialization: "", definition: "A provider who evaluates and treats patients with breathing disorders." },
    { code: "227900000X", grouping: RESPIRATORY, classification: "Respiratory Therapist, Registered", specialization: "", definition: "A registered respiratory therapist with advanced certification." },
    { code: "229N00000X", grouping: RESPIRATORY, classification: "Anaplastologist", specialization: "", definition: "A provider who fabricates prostheses for facial and body defects." },

    // ═══════════════════════════════════════════════════════════════════════
    // SPEECH, LANGUAGE AND HEARING PROVIDERS
    // ═══════════════════════════════════════════════════════════════════════
    { code: "231H00000X", grouping: SPEECH, classification: "Audiologist", specialization: "", definition: "A provider who evaluates and treats hearing and balance disorders." },
    { code: "231HA2400X", grouping: SPEECH, classification: "Audiologist", specialization: "Assistive Technology Practitioner", definition: "An audiologist specializing in assistive hearing technology." },
    { code: "231HA2500X", grouping: SPEECH, classification: "Audiologist", specialization: "Assistive Technology Supplier", definition: "An audiologist who supplies assistive hearing technology." },
    { code: "235500000X", grouping: SPEECH, classification: "Specialist/Technologist", specialization: "", definition: "A specialist or technologist in speech, language, and hearing." },
    { code: "2355A2700X", grouping: SPEECH, classification: "Specialist/Technologist", specialization: "Audiology Assistant", definition: "A technologist who assists audiologists." },
    { code: "2355S0801X", grouping: SPEECH, classification: "Specialist/Technologist", specialization: "Speech-Language Assistant", definition: "A technologist who assists speech-language pathologists." },
    { code: "235Z00000X", grouping: SPEECH, classification: "Speech-Language Pathologist", specialization: "", definition: "A provider who evaluates and treats communication and swallowing disorders." },

    // ═══════════════════════════════════════════════════════════════════════
    // ALLOPATHIC & OSTEOPATHIC PHYSICIANS
    // ═══════════════════════════════════════════════════════════════════════

    // -- Allergy & Immunology --
    { code: "207K00000X", grouping: PHYSICIANS, classification: "Allergy & Immunology", specialization: "", definition: "A physician who specializes in the evaluation and management of allergic diseases and immune system disorders." },
    { code: "207KA0200X", grouping: PHYSICIANS, classification: "Allergy & Immunology", specialization: "Allergy", definition: "A physician specializing in the diagnosis and treatment of allergic conditions." },
    { code: "207KI0005X", grouping: PHYSICIANS, classification: "Allergy & Immunology", specialization: "Clinical & Laboratory Immunology", definition: "A physician specializing in clinical and laboratory immunology." },

    // -- Anesthesiology --
    { code: "207L00000X", grouping: PHYSICIANS, classification: "Anesthesiology", specialization: "", definition: "A physician who specializes in the administration of anesthesia and pain management." },
    { code: "207LA0401X", grouping: PHYSICIANS, classification: "Anesthesiology", specialization: "Addiction Medicine", definition: "An anesthesiologist with additional training in addiction medicine." },
    { code: "207LC0200X", grouping: PHYSICIANS, classification: "Anesthesiology", specialization: "Critical Care Medicine", definition: "An anesthesiologist specializing in critical care of surgical patients." },
    { code: "207LP2900X", grouping: PHYSICIANS, classification: "Anesthesiology", specialization: "Pain Medicine", definition: "An anesthesiologist specializing in the management of pain." },
    { code: "207LP3000X", grouping: PHYSICIANS, classification: "Anesthesiology", specialization: "Pediatric Anesthesiology", definition: "An anesthesiologist specializing in anesthesia for children." },

    // -- Dermatology --
    { code: "207N00000X", grouping: PHYSICIANS, classification: "Dermatology", specialization: "", definition: "A physician who specializes in the diagnosis and treatment of skin diseases." },
    { code: "207ND0101X", grouping: PHYSICIANS, classification: "Dermatology", specialization: "MOHS-Micrographic Surgery", definition: "A dermatologist specializing in Mohs micrographic surgery for skin cancer." },
    { code: "207NI0002X", grouping: PHYSICIANS, classification: "Dermatology", specialization: "Clinical & Laboratory Dermatological Immunology", definition: "A dermatologist specializing in dermatological immunology." },
    { code: "207NP0225X", grouping: PHYSICIANS, classification: "Dermatology", specialization: "Pediatric Dermatology", definition: "A dermatologist specializing in skin conditions in children." },
    { code: "207NS0135X", grouping: PHYSICIANS, classification: "Dermatology", specialization: "Procedural Dermatology", definition: "A dermatologist specializing in procedural and surgical dermatology." },

    // -- Emergency Medicine --
    { code: "207P00000X", grouping: PHYSICIANS, classification: "Emergency Medicine", specialization: "", definition: "A physician who specializes in the immediate recognition, evaluation, care, and disposition of patients with acute illness and injury." },
    { code: "207PE0004X", grouping: PHYSICIANS, classification: "Emergency Medicine", specialization: "Emergency Medical Services", definition: "A physician specializing in emergency medical services systems." },
    { code: "207PE0005X", grouping: PHYSICIANS, classification: "Emergency Medicine", specialization: "Undersea and Hyperbaric Medicine", definition: "A physician specializing in undersea and hyperbaric medicine." },
    { code: "207PH0002X", grouping: PHYSICIANS, classification: "Emergency Medicine", specialization: "Hospice and Palliative Medicine", definition: "An emergency physician with additional training in hospice and palliative care." },
    { code: "207PP0204X", grouping: PHYSICIANS, classification: "Emergency Medicine", specialization: "Pediatric Emergency Medicine", definition: "A physician specializing in emergency care of children." },
    { code: "207PS0010X", grouping: PHYSICIANS, classification: "Emergency Medicine", specialization: "Sports Medicine", definition: "An emergency physician with additional training in sports medicine." },
    { code: "207PT0002X", grouping: PHYSICIANS, classification: "Emergency Medicine", specialization: "Medical Toxicology", definition: "A physician specializing in the diagnosis and management of poisoning." },

    // -- Family Medicine --
    { code: "207Q00000X", grouping: PHYSICIANS, classification: "Family Medicine", specialization: "", definition: "A physician who provides continuing and comprehensive health care for the individual and family." },
    { code: "207QA0000X", grouping: PHYSICIANS, classification: "Family Medicine", specialization: "Adolescent Medicine", definition: "A family physician with additional training in adolescent health care." },
    { code: "207QA0401X", grouping: PHYSICIANS, classification: "Family Medicine", specialization: "Addiction Medicine", definition: "A family physician specializing in addiction medicine." },
    { code: "207QA0505X", grouping: PHYSICIANS, classification: "Family Medicine", specialization: "Adult Medicine", definition: "A family physician focusing on adult medical care." },
    { code: "207QG0300X", grouping: PHYSICIANS, classification: "Family Medicine", specialization: "Geriatric Medicine", definition: "A family physician specializing in the care of older adults." },
    { code: "207QS0010X", grouping: PHYSICIANS, classification: "Family Medicine", specialization: "Sports Medicine", definition: "A family physician with additional training in sports medicine." },
    { code: "207QS1201X", grouping: PHYSICIANS, classification: "Family Medicine", specialization: "Sleep Medicine", definition: "A family physician specializing in sleep disorders." },

    // -- Internal Medicine --
    { code: "207R00000X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "", definition: "A physician who provides long-term, comprehensive care to adults, managing both common and complex illnesses." },
    { code: "207RA0000X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Adolescent Medicine", definition: "An internist with additional training in adolescent health care." },
    { code: "207RA0001X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Advanced Heart Failure and Transplant Cardiology", definition: "An internist specializing in advanced heart failure and transplant cardiology." },
    { code: "207RA0201X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Allergy & Immunology", definition: "An internist with additional training in allergy and immunology." },
    { code: "207RA0401X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Addiction Medicine", definition: "An internist with additional training in addiction medicine." },
    { code: "207RC0000X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Cardiovascular Disease", definition: "An internist specializing in the diagnosis and treatment of heart and blood vessel diseases." },
    { code: "207RC0001X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Clinical Cardiac Electrophysiology", definition: "An internist specializing in the management of cardiac rhythm disorders." },
    { code: "207RC0200X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Critical Care Medicine", definition: "An internist specializing in the care of critically ill patients." },
    { code: "207RE0101X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Endocrinology, Diabetes & Metabolism", definition: "An internist specializing in hormonal disorders, diabetes, and metabolic diseases." },
    { code: "207RG0100X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Gastroenterology", definition: "An internist specializing in the diagnosis and treatment of digestive system disorders." },
    { code: "207RG0300X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Geriatric Medicine", definition: "An internist specializing in the care of elderly patients." },
    { code: "207RH0000X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Hematology", definition: "An internist specializing in the diagnosis and treatment of blood disorders." },
    { code: "207RH0002X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Hospice and Palliative Medicine", definition: "An internist with additional training in hospice and palliative care." },
    { code: "207RH0003X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Hematology & Oncology", definition: "An internist specializing in blood disorders and cancer treatment." },
    { code: "207RI0001X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Clinical & Laboratory Immunology", definition: "An internist specializing in immunological disorders." },
    { code: "207RI0008X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Hepatology", definition: "An internist specializing in liver diseases." },
    { code: "207RI0011X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Interventional Cardiology", definition: "An internist specializing in catheter-based treatment of heart disease." },
    { code: "207RI0200X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Infectious Disease", definition: "An internist specializing in the diagnosis and treatment of infectious diseases." },
    { code: "207RN0300X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Nephrology", definition: "An internist specializing in the diagnosis and treatment of kidney diseases." },
    { code: "207RP1001X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Pulmonary Disease", definition: "An internist specializing in the diagnosis and treatment of lung diseases." },
    { code: "207RR0500X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Rheumatology", definition: "An internist specializing in the treatment of arthritis and other rheumatic diseases." },
    { code: "207RS0010X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Sports Medicine", definition: "An internist with additional training in sports medicine." },
    { code: "207RS0012X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Sleep Medicine", definition: "An internist specializing in sleep disorders." },
    { code: "207RT0003X", grouping: PHYSICIANS, classification: "Internal Medicine", specialization: "Transplant Hepatology", definition: "An internist specializing in liver transplantation." },

    // -- Medical Genetics --
    { code: "207SC0300X", grouping: PHYSICIANS, classification: "Medical Genetics", specialization: "Clinical Cytogenetics", definition: "A physician specializing in cytogenetic analysis for disease diagnosis." },
    { code: "207SG0201X", grouping: PHYSICIANS, classification: "Medical Genetics", specialization: "Clinical Genetics (M.D.)", definition: "A physician specializing in the diagnosis and management of genetic disorders." },
    { code: "207SG0202X", grouping: PHYSICIANS, classification: "Medical Genetics", specialization: "Clinical Biochemical Genetics", definition: "A physician specializing in biochemical genetics." },
    { code: "207SM0001X", grouping: PHYSICIANS, classification: "Medical Genetics", specialization: "Molecular Genetic Pathology", definition: "A physician specializing in molecular genetic pathology." },

    // -- Neurological Surgery --
    { code: "207T00000X", grouping: PHYSICIANS, classification: "Neurological Surgery", specialization: "", definition: "A physician who specializes in the surgical treatment of disorders of the nervous system." },

    // -- Nuclear Medicine --
    { code: "207U00000X", grouping: PHYSICIANS, classification: "Nuclear Medicine", specialization: "", definition: "A physician who specializes in the use of radioactive substances in diagnosis and treatment." },
    { code: "207UN0901X", grouping: PHYSICIANS, classification: "Nuclear Medicine", specialization: "Nuclear Cardiology", definition: "A nuclear medicine specialist focusing on cardiac imaging." },
    { code: "207UN0903X", grouping: PHYSICIANS, classification: "Nuclear Medicine", specialization: "Nuclear Imaging & Therapy", definition: "A nuclear medicine specialist focusing on imaging and therapy." },

    // -- Obstetrics & Gynecology --
    { code: "207V00000X", grouping: PHYSICIANS, classification: "Obstetrics & Gynecology", specialization: "", definition: "A physician who specializes in the medical and surgical care of women, including reproductive health." },
    { code: "207VC0200X", grouping: PHYSICIANS, classification: "Obstetrics & Gynecology", specialization: "Critical Care Medicine", definition: "An OB/GYN specializing in critical care." },
    { code: "207VE0102X", grouping: PHYSICIANS, classification: "Obstetrics & Gynecology", specialization: "Reproductive Endocrinology", definition: "An OB/GYN specializing in reproductive endocrinology and infertility." },
    { code: "207VG0400X", grouping: PHYSICIANS, classification: "Obstetrics & Gynecology", specialization: "Gynecology", definition: "A physician specializing in gynecological care." },
    { code: "207VM0101X", grouping: PHYSICIANS, classification: "Obstetrics & Gynecology", specialization: "Maternal & Fetal Medicine", definition: "An OB/GYN specializing in high-risk pregnancies." },
    { code: "207VX0000X", grouping: PHYSICIANS, classification: "Obstetrics & Gynecology", specialization: "Obstetrics", definition: "A physician specializing in pregnancy and childbirth." },

    // -- Ophthalmology --
    { code: "207W00000X", grouping: PHYSICIANS, classification: "Ophthalmology", specialization: "", definition: "A physician who specializes in the comprehensive care of the eye and visual system." },
    { code: "207WX0200X", grouping: PHYSICIANS, classification: "Ophthalmology", specialization: "Ophthalmic Plastic and Reconstructive Surgery", definition: "An ophthalmologist specializing in plastic and reconstructive surgery of the eye area." },

    // -- Orthopaedic Surgery --
    { code: "207X00000X", grouping: PHYSICIANS, classification: "Orthopaedic Surgery", specialization: "", definition: "A physician who specializes in the preservation, investigation, and restoration of the form and function of the musculoskeletal system." },
    { code: "207XP3100X", grouping: PHYSICIANS, classification: "Orthopaedic Surgery", specialization: "Pediatric Orthopaedic Surgery", definition: "An orthopedic surgeon specializing in children's musculoskeletal conditions." },
    { code: "207XS0106X", grouping: PHYSICIANS, classification: "Orthopaedic Surgery", specialization: "Hand Surgery", definition: "An orthopedic surgeon specializing in hand surgery." },
    { code: "207XS0114X", grouping: PHYSICIANS, classification: "Orthopaedic Surgery", specialization: "Adult Reconstructive Orthopaedic Surgery", definition: "An orthopedic surgeon specializing in adult joint reconstruction." },
    { code: "207XS0117X", grouping: PHYSICIANS, classification: "Orthopaedic Surgery", specialization: "Orthopaedic Surgery of the Spine", definition: "An orthopedic surgeon specializing in spine surgery." },
    { code: "207XX0004X", grouping: PHYSICIANS, classification: "Orthopaedic Surgery", specialization: "Foot and Ankle Surgery", definition: "An orthopedic surgeon specializing in foot and ankle surgery." },
    { code: "207XX0005X", grouping: PHYSICIANS, classification: "Orthopaedic Surgery", specialization: "Sports Medicine", definition: "An orthopedic surgeon with additional training in sports medicine." },
    { code: "207XX0801X", grouping: PHYSICIANS, classification: "Orthopaedic Surgery", specialization: "Orthopaedic Trauma", definition: "An orthopedic surgeon specializing in trauma cases." },

    // -- Otolaryngology --
    { code: "207Y00000X", grouping: PHYSICIANS, classification: "Otolaryngology", specialization: "", definition: "A physician who specializes in the medical and surgical treatment of the ears, nose, throat, and related structures." },
    { code: "207YP0228X", grouping: PHYSICIANS, classification: "Otolaryngology", specialization: "Pediatric Otolaryngology", definition: "An ENT physician specializing in conditions in children." },
    { code: "207YS0123X", grouping: PHYSICIANS, classification: "Otolaryngology", specialization: "Facial Plastic Surgery", definition: "An ENT physician specializing in facial plastic and reconstructive surgery." },
    { code: "207YX0007X", grouping: PHYSICIANS, classification: "Otolaryngology", specialization: "Plastic Surgery within the Head & Neck", definition: "An ENT physician specializing in plastic surgery of the head and neck." },
    { code: "207YX0602X", grouping: PHYSICIANS, classification: "Otolaryngology", specialization: "Otolaryngic Allergy", definition: "An ENT physician specializing in allergic conditions." },
    { code: "207YX0901X", grouping: PHYSICIANS, classification: "Otolaryngology", specialization: "Otology & Neurotology", definition: "An ENT physician specializing in ear diseases and hearing." },
    { code: "207YX0905X", grouping: PHYSICIANS, classification: "Otolaryngology", specialization: "Otolaryngology/Facial Plastic Surgery", definition: "An ENT physician combining otolaryngology and facial plastic surgery." },

    // -- Pathology --
    { code: "207ZP0101X", grouping: PHYSICIANS, classification: "Pathology", specialization: "Anatomic Pathology", definition: "A pathologist specializing in the study of tissues and organs." },
    { code: "207ZP0102X", grouping: PHYSICIANS, classification: "Pathology", specialization: "Anatomic Pathology & Clinical Pathology", definition: "A pathologist specializing in both anatomic and clinical pathology." },
    { code: "207ZP0104X", grouping: PHYSICIANS, classification: "Pathology", specialization: "Chemical Pathology", definition: "A pathologist specializing in the chemical analysis of body substances." },
    { code: "207ZP0105X", grouping: PHYSICIANS, classification: "Pathology", specialization: "Clinical Pathology", definition: "A pathologist specializing in laboratory medicine." },
    { code: "207ZB0001X", grouping: PHYSICIANS, classification: "Pathology", specialization: "Blood Banking & Transfusion Medicine", definition: "A pathologist specializing in blood banking and transfusion medicine." },
    { code: "207ZC0006X", grouping: PHYSICIANS, classification: "Pathology", specialization: "Clinical Informatics", definition: "A pathologist specializing in clinical informatics." },
    { code: "207ZC0500X", grouping: PHYSICIANS, classification: "Pathology", specialization: "Cytopathology", definition: "A pathologist specializing in the study of cells for disease diagnosis." },
    { code: "207ZD0900X", grouping: PHYSICIANS, classification: "Pathology", specialization: "Dermatopathology", definition: "A pathologist specializing in the pathology of skin diseases." },
    { code: "207ZF0201X", grouping: PHYSICIANS, classification: "Pathology", specialization: "Forensic Pathology", definition: "A pathologist specializing in determining cause and manner of death." },
    { code: "207ZH0000X", grouping: PHYSICIANS, classification: "Pathology", specialization: "Hematology", definition: "A pathologist specializing in blood diseases." },
    { code: "207ZN0500X", grouping: PHYSICIANS, classification: "Pathology", specialization: "Neuropathology", definition: "A pathologist specializing in diseases of the nervous system." },

    // -- Pediatrics --
    { code: "208000000X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "", definition: "A physician who specializes in the physical, emotional, and social health of children from birth to young adulthood." },
    { code: "2080A0000X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Adolescent Medicine", definition: "A pediatrician specializing in adolescent health care." },
    { code: "2080C0008X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Child Abuse Pediatrics", definition: "A pediatrician specializing in the diagnosis and treatment of child abuse." },
    { code: "2080H0002X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Hospice and Palliative Medicine", definition: "A pediatrician with additional training in hospice and palliative care." },
    { code: "2080I0007X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Clinical & Laboratory Immunology", definition: "A pediatrician specializing in immunological disorders." },
    { code: "2080N0001X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Neonatal-Perinatal Medicine", definition: "A pediatrician specializing in the care of newborns." },
    { code: "2080P0006X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Developmental-Behavioral Pediatrics", definition: "A pediatrician specializing in developmental and behavioral issues." },
    { code: "2080P0008X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Neurodevelopmental Disabilities", definition: "A pediatrician specializing in neurodevelopmental disabilities." },
    { code: "2080P0201X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Pediatric Allergy/Immunology", definition: "A pediatrician specializing in pediatric allergies and immunology." },
    { code: "2080P0202X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Pediatric Cardiology", definition: "A pediatrician specializing in heart diseases in children." },
    { code: "2080P0203X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Pediatric Critical Care Medicine", definition: "A pediatrician specializing in critical care of children." },
    { code: "2080P0204X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Pediatric Emergency Medicine", definition: "A pediatrician specializing in emergency care of children." },
    { code: "2080P0205X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Pediatric Endocrinology", definition: "A pediatrician specializing in hormonal disorders in children." },
    { code: "2080P0206X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Pediatric Gastroenterology", definition: "A pediatrician specializing in digestive disorders in children." },
    { code: "2080P0207X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Pediatric Hematology-Oncology", definition: "A pediatrician specializing in blood disorders and cancer in children." },
    { code: "2080P0208X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Pediatric Infectious Diseases", definition: "A pediatrician specializing in infectious diseases in children." },
    { code: "2080P0210X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Pediatric Nephrology", definition: "A pediatrician specializing in kidney diseases in children." },
    { code: "2080P0214X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Pediatric Pulmonology", definition: "A pediatrician specializing in lung diseases in children." },
    { code: "2080P0216X", grouping: PHYSICIANS, classification: "Pediatrics", specialization: "Pediatric Rheumatology", definition: "A pediatrician specializing in rheumatic diseases in children." },

    // -- Physical Medicine & Rehabilitation --
    { code: "208100000X", grouping: PHYSICIANS, classification: "Physical Medicine & Rehabilitation", specialization: "", definition: "A physician who specializes in the restoration of function following disease, disorder, or injury." },
    { code: "2081H0002X", grouping: PHYSICIANS, classification: "Physical Medicine & Rehabilitation", specialization: "Hospice and Palliative Medicine", definition: "A physiatrist with additional training in hospice and palliative care." },
    { code: "2081N0008X", grouping: PHYSICIANS, classification: "Physical Medicine & Rehabilitation", specialization: "Neuromuscular Medicine", definition: "A physiatrist specializing in neuromuscular disorders." },
    { code: "2081P0004X", grouping: PHYSICIANS, classification: "Physical Medicine & Rehabilitation", specialization: "Spinal Cord Injury Medicine", definition: "A physiatrist specializing in spinal cord injury rehabilitation." },
    { code: "2081P0010X", grouping: PHYSICIANS, classification: "Physical Medicine & Rehabilitation", specialization: "Pediatric Rehabilitation Medicine", definition: "A physiatrist specializing in rehabilitation of children." },
    { code: "2081P2900X", grouping: PHYSICIANS, classification: "Physical Medicine & Rehabilitation", specialization: "Pain Medicine", definition: "A physiatrist specializing in pain management." },
    { code: "2081S0010X", grouping: PHYSICIANS, classification: "Physical Medicine & Rehabilitation", specialization: "Sports Medicine", definition: "A physiatrist with additional training in sports medicine." },

    // -- Plastic Surgery --
    { code: "208200000X", grouping: PHYSICIANS, classification: "Plastic Surgery", specialization: "", definition: "A physician who specializes in the repair, restoration, and reconstruction of body structures." },
    { code: "2082S0099X", grouping: PHYSICIANS, classification: "Plastic Surgery", specialization: "Plastic Surgery Within the Head and Neck", definition: "A plastic surgeon specializing in head and neck reconstruction." },
    { code: "2082S0105X", grouping: PHYSICIANS, classification: "Plastic Surgery", specialization: "Surgery of the Hand", definition: "A plastic surgeon specializing in hand surgery." },

    // -- Preventive Medicine --
    { code: "208300000X", grouping: PHYSICIANS, classification: "Preventive Medicine", specialization: "", definition: "A physician who specializes in disease prevention and health promotion." },
    { code: "2083A0100X", grouping: PHYSICIANS, classification: "Preventive Medicine", specialization: "Aerospace Medicine", definition: "A physician specializing in health issues related to aviation and space." },
    { code: "2083P0011X", grouping: PHYSICIANS, classification: "Preventive Medicine", specialization: "Undersea and Hyperbaric Medicine", definition: "A physician specializing in diving and hyperbaric medicine." },
    { code: "2083P0500X", grouping: PHYSICIANS, classification: "Preventive Medicine", specialization: "Preventive Medicine/Occupational Environmental Medicine", definition: "A physician specializing in occupational and environmental medicine." },
    { code: "2083P0901X", grouping: PHYSICIANS, classification: "Preventive Medicine", specialization: "Public Health & General Preventive Medicine", definition: "A physician specializing in public health and preventive medicine." },
    { code: "2083S0010X", grouping: PHYSICIANS, classification: "Preventive Medicine", specialization: "Sports Medicine", definition: "A preventive medicine physician with sports medicine training." },
    { code: "2083T0002X", grouping: PHYSICIANS, classification: "Preventive Medicine", specialization: "Medical Toxicology", definition: "A physician specializing in toxicology." },

    // -- Psychiatry & Neurology --
    { code: "2084A0401X", grouping: PHYSICIANS, classification: "Psychiatry & Neurology", specialization: "Addiction Medicine", definition: "A psychiatrist or neurologist with addiction medicine training." },
    { code: "2084B0002X", grouping: PHYSICIANS, classification: "Psychiatry & Neurology", specialization: "Bariatric Medicine", definition: "A psychiatrist or neurologist specializing in obesity-related issues." },
    { code: "2084D0003X", grouping: PHYSICIANS, classification: "Psychiatry & Neurology", specialization: "Diagnostic Neuroimaging", definition: "A neurologist specializing in diagnostic neuroimaging." },
    { code: "2084F0202X", grouping: PHYSICIANS, classification: "Psychiatry & Neurology", specialization: "Forensic Psychiatry", definition: "A psychiatrist specializing in the intersection of psychiatry and law." },
    { code: "2084N0400X", grouping: PHYSICIANS, classification: "Psychiatry & Neurology", specialization: "Neurology", definition: "A physician specializing in the diagnosis and treatment of nervous system disorders." },
    { code: "2084N0402X", grouping: PHYSICIANS, classification: "Psychiatry & Neurology", specialization: "Neurology with Special Qualifications in Child Neurology", definition: "A neurologist specializing in children's neurological conditions." },
    { code: "2084N0600X", grouping: PHYSICIANS, classification: "Psychiatry & Neurology", specialization: "Clinical Neurophysiology", definition: "A neurologist specializing in clinical neurophysiology." },
    { code: "2084P0005X", grouping: PHYSICIANS, classification: "Psychiatry & Neurology", specialization: "Neurodevelopmental Disabilities", definition: "A physician specializing in neurodevelopmental conditions." },
    { code: "2084P0015X", grouping: PHYSICIANS, classification: "Psychiatry & Neurology", specialization: "Psychosomatic Medicine", definition: "A psychiatrist specializing in the relationship between medical and psychiatric illness." },
    { code: "2084P0800X", grouping: PHYSICIANS, classification: "Psychiatry & Neurology", specialization: "Psychiatry", definition: "A physician specializing in the diagnosis and treatment of mental disorders." },
    { code: "2084P0802X", grouping: PHYSICIANS, classification: "Psychiatry & Neurology", specialization: "Addiction Psychiatry", definition: "A psychiatrist specializing in addiction." },
    { code: "2084P0804X", grouping: PHYSICIANS, classification: "Psychiatry & Neurology", specialization: "Child & Adolescent Psychiatry", definition: "A psychiatrist specializing in the treatment of children and adolescents." },
    { code: "2084P0805X", grouping: PHYSICIANS, classification: "Psychiatry & Neurology", specialization: "Geriatric Psychiatry", definition: "A psychiatrist specializing in the treatment of older adults." },
    { code: "2084S0010X", grouping: PHYSICIANS, classification: "Psychiatry & Neurology", specialization: "Sports Medicine", definition: "A neurologist with sports medicine training." },
    { code: "2084S0012X", grouping: PHYSICIANS, classification: "Psychiatry & Neurology", specialization: "Sleep Medicine", definition: "A physician specializing in sleep disorders." },
    { code: "2084V0102X", grouping: PHYSICIANS, classification: "Psychiatry & Neurology", specialization: "Vascular Neurology", definition: "A neurologist specializing in stroke and cerebrovascular diseases." },

    // -- Radiology --
    { code: "2085B0100X", grouping: PHYSICIANS, classification: "Radiology", specialization: "Body Imaging", definition: "A radiologist specializing in body imaging." },
    { code: "2085D0003X", grouping: PHYSICIANS, classification: "Radiology", specialization: "Diagnostic Neuroimaging", definition: "A radiologist specializing in diagnostic neuroimaging." },
    { code: "2085H0002X", grouping: PHYSICIANS, classification: "Radiology", specialization: "Hospice and Palliative Medicine", definition: "A radiologist with palliative care training." },
    { code: "2085N0700X", grouping: PHYSICIANS, classification: "Radiology", specialization: "Neuroradiology", definition: "A radiologist specializing in imaging of the nervous system." },
    { code: "2085N0904X", grouping: PHYSICIANS, classification: "Radiology", specialization: "Nuclear Radiology", definition: "A radiologist specializing in nuclear medicine imaging." },
    { code: "2085P0229X", grouping: PHYSICIANS, classification: "Radiology", specialization: "Pediatric Radiology", definition: "A radiologist specializing in imaging of children." },
    { code: "2085R0001X", grouping: PHYSICIANS, classification: "Radiology", specialization: "Radiation Oncology", definition: "A physician specializing in the use of radiation for cancer treatment." },
    { code: "2085R0202X", grouping: PHYSICIANS, classification: "Radiology", specialization: "Diagnostic Radiology", definition: "A physician specializing in the use of imaging for disease diagnosis." },
    { code: "2085R0203X", grouping: PHYSICIANS, classification: "Radiology", specialization: "Therapeutic Radiology", definition: "A radiologist specializing in therapeutic applications of radiation." },
    { code: "2085R0204X", grouping: PHYSICIANS, classification: "Radiology", specialization: "Vascular & Interventional Radiology", definition: "A radiologist specializing in minimally invasive image-guided procedures." },
    { code: "2085R0205X", grouping: PHYSICIANS, classification: "Radiology", specialization: "Radiological Physics", definition: "A specialist in the physics of radiological imaging." },

    // -- Surgery --
    { code: "208600000X", grouping: PHYSICIANS, classification: "Surgery", specialization: "", definition: "A physician who specializes in the treatment of disease, injury, and deformity by operative methods." },
    { code: "2086H0002X", grouping: PHYSICIANS, classification: "Surgery", specialization: "Hospice and Palliative Medicine", definition: "A surgeon with palliative care training." },
    { code: "2086S0102X", grouping: PHYSICIANS, classification: "Surgery", specialization: "Surgical Critical Care", definition: "A surgeon specializing in the critical care of surgical patients." },
    { code: "2086S0105X", grouping: PHYSICIANS, classification: "Surgery", specialization: "Surgery of the Hand", definition: "A surgeon specializing in hand surgery." },
    { code: "2086S0120X", grouping: PHYSICIANS, classification: "Surgery", specialization: "Pediatric Surgery", definition: "A surgeon specializing in surgical care of children." },
    { code: "2086S0122X", grouping: PHYSICIANS, classification: "Surgery", specialization: "Plastic and Reconstructive Surgery", definition: "A surgeon specializing in reconstructive procedures." },
    { code: "2086S0127X", grouping: PHYSICIANS, classification: "Surgery", specialization: "Trauma Surgery", definition: "A surgeon specializing in the management of traumatic injuries." },
    { code: "2086S0129X", grouping: PHYSICIANS, classification: "Surgery", specialization: "Vascular Surgery", definition: "A surgeon specializing in the surgical treatment of blood vessel disorders." },
    { code: "2086X0206X", grouping: PHYSICIANS, classification: "Surgery", specialization: "Surgical Oncology", definition: "A surgeon specializing in the surgical treatment of cancer." },

    // -- Thoracic Surgery (Cardiothoracic Vascular Surgery) --
    { code: "208G00000X", grouping: PHYSICIANS, classification: "Thoracic Surgery (Cardiothoracic Vascular Surgery)", specialization: "", definition: "A physician who specializes in the surgical treatment of diseases of the chest, including the heart and lungs." },
    { code: "208G00100X", grouping: PHYSICIANS, classification: "Thoracic Surgery (Cardiothoracic Vascular Surgery)", specialization: "Congenital Cardiac Surgery", definition: "A cardiac surgeon specializing in congenital heart defects." },

    // -- Urology --
    { code: "208800000X", grouping: PHYSICIANS, classification: "Urology", specialization: "", definition: "A physician who specializes in the urinary tract and the male reproductive system." },
    { code: "2088P0231X", grouping: PHYSICIANS, classification: "Urology", specialization: "Pediatric Urology", definition: "A urologist specializing in urological conditions in children." },
    { code: "2088F0040X", grouping: PHYSICIANS, classification: "Urology", specialization: "Female Pelvic Medicine and Reconstructive Surgery", definition: "A urologist specializing in female pelvic floor disorders." },

    // -- Colon & Rectal Surgery --
    { code: "208C00000X", grouping: PHYSICIANS, classification: "Colon & Rectal Surgery", specialization: "", definition: "A physician who specializes in the surgical treatment of diseases of the colon, rectum, and anus." },

    // -- Hospitalist --
    { code: "208M00000X", grouping: PHYSICIANS, classification: "Hospitalist", specialization: "", definition: "A physician whose primary professional focus is the general medical care of hospitalized patients." },

    // -- Phlebology --
    { code: "2088S0500X", grouping: PHYSICIANS, classification: "Urology", specialization: "Phlebology", definition: "A physician specializing in the diagnosis and treatment of venous disorders." },

    // ═══════════════════════════════════════════════════════════════════════
    // HOSPITALS
    // ═══════════════════════════════════════════════════════════════════════
    { code: "282N00000X", grouping: HOSPITALS, classification: "General Acute Care Hospital", specialization: "", definition: "A hospital that provides 24-hour inpatient care including diagnostic, therapeutic, and surgical services." },
    { code: "282NC0060X", grouping: HOSPITALS, classification: "General Acute Care Hospital", specialization: "Critical Access", definition: "A small hospital that provides 24-hour emergency care services in a rural area." },
    { code: "282NC2000X", grouping: HOSPITALS, classification: "General Acute Care Hospital", specialization: "Children", definition: "A hospital that provides acute care services for children." },
    { code: "282NR1301X", grouping: HOSPITALS, classification: "General Acute Care Hospital", specialization: "Rural", definition: "A hospital located in a rural area providing acute care services." },
    { code: "282NW0100X", grouping: HOSPITALS, classification: "General Acute Care Hospital", specialization: "Women", definition: "A hospital specializing in the care of women." },
    { code: "283Q00000X", grouping: HOSPITALS, classification: "Psychiatric Hospital", specialization: "", definition: "A hospital that provides 24-hour inpatient care for mental health conditions." },
    { code: "283X00000X", grouping: HOSPITALS, classification: "Rehabilitation Hospital", specialization: "", definition: "A hospital that provides comprehensive rehabilitation services." },
    { code: "283XC2000X", grouping: HOSPITALS, classification: "Rehabilitation Hospital", specialization: "Children", definition: "A rehabilitation hospital specializing in children." },
    { code: "284300000X", grouping: HOSPITALS, classification: "Special Hospital", specialization: "", definition: "A hospital that provides specialized care." },
    { code: "286500000X", grouping: HOSPITALS, classification: "Military Hospital", specialization: "", definition: "A hospital operated by the military." },
    { code: "287300000X", grouping: HOSPITALS, classification: "Christian Science Sanitorium", specialization: "", definition: "A facility providing care according to Christian Science principles." },
    { code: "281P00000X", grouping: HOSPITALS, classification: "Chronic Disease Hospital", specialization: "", definition: "A hospital specializing in the treatment of chronic diseases." },
    { code: "281PC2000X", grouping: HOSPITALS, classification: "Chronic Disease Hospital", specialization: "Children", definition: "A chronic disease hospital specializing in children." },
    { code: "282E00000X", grouping: HOSPITALS, classification: "Long Term Care Hospital", specialization: "", definition: "A hospital that provides long-term care for patients with complex medical needs." },

    // ═══════════════════════════════════════════════════════════════════════
    // LABORATORIES
    // ═══════════════════════════════════════════════════════════════════════
    { code: "291U00000X", grouping: LABS, classification: "Clinical Medical Laboratory", specialization: "", definition: "A laboratory that performs clinical testing on specimens to obtain information for the diagnosis and treatment of disease." },
    { code: "292200000X", grouping: LABS, classification: "Dental Laboratory", specialization: "", definition: "A laboratory that constructs dental prostheses and appliances." },
    { code: "291900000X", grouping: LABS, classification: "Military Clinical Medical Laboratory", specialization: "", definition: "A military laboratory performing clinical medical testing." },

    // ═══════════════════════════════════════════════════════════════════════
    // NURSING & CUSTODIAL CARE FACILITIES
    // ═══════════════════════════════════════════════════════════════════════
    { code: "314000000X", grouping: NURSING_CUSTODIAL, classification: "Skilled Nursing Facility", specialization: "", definition: "A facility that provides skilled nursing care and related services for residents who require medical or nursing care." },
    { code: "3140N1450X", grouping: NURSING_CUSTODIAL, classification: "Skilled Nursing Facility", specialization: "Nursing Care, Pediatric", definition: "A skilled nursing facility specializing in pediatric nursing care." },
    { code: "311500000X", grouping: NURSING_CUSTODIAL, classification: "Alzheimer Center (Dementia Center)", specialization: "", definition: "A facility specializing in the care of patients with Alzheimer's disease and other dementias." },
    { code: "311Z00000X", grouping: NURSING_CUSTODIAL, classification: "Custodial Care Facility", specialization: "", definition: "A facility providing custodial care for individuals who need assistance with daily activities." },
    { code: "313M00000X", grouping: NURSING_CUSTODIAL, classification: "Nursing Facility/Intermediate Care Facility", specialization: "", definition: "A facility providing nursing and related care on a regular basis to individuals not requiring hospital care." },
    { code: "310400000X", grouping: NURSING_CUSTODIAL, classification: "Assisted Living Facility", specialization: "", definition: "A residential facility providing assistance with daily activities and some health services." },
    { code: "310500000X", grouping: NURSING_CUSTODIAL, classification: "Intermediate Care Facility, Mental Illness", specialization: "", definition: "A facility providing intermediate care for individuals with mental illness." },

    // ═══════════════════════════════════════════════════════════════════════
    // AGENCIES
    // ═══════════════════════════════════════════════════════════════════════
    { code: "251E00000X", grouping: AGENCIES, classification: "Home Health", specialization: "", definition: "An agency that provides skilled nursing and other therapeutic services in the patient's home." },
    { code: "251G00000X", grouping: AGENCIES, classification: "Hospice Care, Community Based", specialization: "", definition: "An agency that provides palliative care for terminally ill patients in community settings." },
    { code: "251300000X", grouping: AGENCIES, classification: "Local Education Agency (LEA)", specialization: "", definition: "A public authority that provides educational services." },
    { code: "251B00000X", grouping: AGENCIES, classification: "Case Management", specialization: "", definition: "An agency that provides case management services." },
    { code: "251C00000X", grouping: AGENCIES, classification: "Day Training, Developmentally Disabled Services", specialization: "", definition: "An agency providing day training for developmentally disabled individuals." },
    { code: "251F00000X", grouping: AGENCIES, classification: "Home Infusion", specialization: "", definition: "An agency providing infusion therapy services in the home." },
    { code: "251J00000X", grouping: AGENCIES, classification: "Nursing Care", specialization: "", definition: "An agency providing nursing care services." },
    { code: "251K00000X", grouping: AGENCIES, classification: "Public Health or Welfare", specialization: "", definition: "An agency providing public health or welfare services." },
    { code: "251S00000X", grouping: AGENCIES, classification: "Community/Behavioral Health", specialization: "", definition: "An agency providing community-based behavioral health services." },
    { code: "251V00000X", grouping: AGENCIES, classification: "Voluntary or Charitable", specialization: "", definition: "A voluntary or charitable health services agency." },
    { code: "251X00000X", grouping: AGENCIES, classification: "Supports Brokerage", specialization: "", definition: "An agency that assists individuals in arranging support services." },

    // ═══════════════════════════════════════════════════════════════════════
    // AMBULANCE SERVICE PROVIDERS
    // ═══════════════════════════════════════════════════════════════════════
    { code: "341600000X", grouping: AMBULANCE, classification: "Ambulance", specialization: "", definition: "A provider of ambulance transportation services." },
    { code: "3416A0800X", grouping: AMBULANCE, classification: "Ambulance", specialization: "Air Transport", definition: "An ambulance service providing air transport." },
    { code: "3416L0300X", grouping: AMBULANCE, classification: "Ambulance", specialization: "Land Transport", definition: "An ambulance service providing land transport." },
    { code: "3416S0300X", grouping: AMBULANCE, classification: "Ambulance", specialization: "Water Transport", definition: "An ambulance service providing water transport." },

    // ═══════════════════════════════════════════════════════════════════════
    // MANAGED CARE ORGANIZATIONS
    // ═══════════════════════════════════════════════════════════════════════
    { code: "302F00000X", grouping: MANAGED_CARE, classification: "Exclusive Provider Organization", specialization: "", definition: "A managed care plan where services are covered only from network providers." },
    { code: "302R00000X", grouping: MANAGED_CARE, classification: "Health Maintenance Organization", specialization: "", definition: "A managed care plan that provides comprehensive health services for a fixed fee." },
    { code: "305R00000X", grouping: MANAGED_CARE, classification: "Preferred Provider Organization", specialization: "", definition: "A managed care plan that contracts with providers for discounted rates." },
    { code: "305S00000X", grouping: MANAGED_CARE, classification: "Point of Service", specialization: "", definition: "A managed care plan allowing out-of-network services at higher cost." },

    // ═══════════════════════════════════════════════════════════════════════
    // RESIDENTIAL TREATMENT FACILITIES
    // ═══════════════════════════════════════════════════════════════════════
    { code: "323P00000X", grouping: RESIDENTIAL, classification: "Psychiatric Residential Treatment Facility", specialization: "", definition: "A facility providing residential psychiatric treatment." },
    { code: "322D00000X", grouping: RESIDENTIAL, classification: "Residential Treatment Facility, Emotionally Disturbed Children", specialization: "", definition: "A facility providing residential treatment for emotionally disturbed children." },
    { code: "324500000X", grouping: RESIDENTIAL, classification: "Substance Abuse Rehabilitation Facility", specialization: "", definition: "A facility providing residential substance abuse treatment." },
    { code: "3245S0500X", grouping: RESIDENTIAL, classification: "Substance Abuse Rehabilitation Facility", specialization: "Children", definition: "A substance abuse facility specializing in the treatment of children." },

    // ═══════════════════════════════════════════════════════════════════════
    // SUPPLIERS (PHARMACY, DME, etc.)
    // ═══════════════════════════════════════════════════════════════════════
    { code: "332B00000X", grouping: SUPPLIERS, classification: "Durable Medical Equipment & Medical Supplies", specialization: "", definition: "A supplier of durable medical equipment and supplies." },
    { code: "332BC3200X", grouping: SUPPLIERS, classification: "Durable Medical Equipment & Medical Supplies", specialization: "Customized Equipment", definition: "A supplier of customized medical equipment." },
    { code: "332BD1200X", grouping: SUPPLIERS, classification: "Durable Medical Equipment & Medical Supplies", specialization: "Dialysis Equipment & Supplies", definition: "A supplier of dialysis equipment and supplies." },
    { code: "332BN1400X", grouping: SUPPLIERS, classification: "Durable Medical Equipment & Medical Supplies", specialization: "Nursing Facility Supplies", definition: "A supplier of nursing facility equipment and supplies." },
    { code: "332BP3500X", grouping: SUPPLIERS, classification: "Durable Medical Equipment & Medical Supplies", specialization: "Parenteral & Enteral Nutrition", definition: "A supplier of parenteral and enteral nutrition products." },
    { code: "332BX2000X", grouping: SUPPLIERS, classification: "Durable Medical Equipment & Medical Supplies", specialization: "Oxygen Equipment & Supplies", definition: "A supplier of oxygen equipment and supplies." },
    { code: "333600000X", grouping: SUPPLIERS, classification: "Pharmacy", specialization: "", definition: "A provider that prepares, preserves, compounds, and dispenses medications." },
    { code: "3336C0002X", grouping: SUPPLIERS, classification: "Pharmacy", specialization: "Clinic Pharmacy", definition: "A pharmacy operating within a clinic setting." },
    { code: "3336C0003X", grouping: SUPPLIERS, classification: "Pharmacy", specialization: "Community/Retail Pharmacy", definition: "A pharmacy operating in a community or retail setting." },
    { code: "3336C0004X", grouping: SUPPLIERS, classification: "Pharmacy", specialization: "Compounding Pharmacy", definition: "A pharmacy that specializes in compounding customized medications." },
    { code: "3336H0001X", grouping: SUPPLIERS, classification: "Pharmacy", specialization: "Home Infusion Therapy Pharmacy", definition: "A pharmacy specializing in home infusion therapy." },
    { code: "3336I0012X", grouping: SUPPLIERS, classification: "Pharmacy", specialization: "Institutional Pharmacy", definition: "A pharmacy operating within an institutional setting." },
    { code: "3336L0003X", grouping: SUPPLIERS, classification: "Pharmacy", specialization: "Long Term Care Pharmacy", definition: "A pharmacy specializing in long-term care facility services." },
    { code: "3336M0002X", grouping: SUPPLIERS, classification: "Pharmacy", specialization: "Mail Order Pharmacy", definition: "A pharmacy that dispenses medications through mail order." },
    { code: "3336M0003X", grouping: SUPPLIERS, classification: "Pharmacy", specialization: "Managed Care Organization Pharmacy", definition: "A pharmacy operating within a managed care organization." },
    { code: "3336N0007X", grouping: SUPPLIERS, classification: "Pharmacy", specialization: "Nuclear Pharmacy", definition: "A pharmacy specializing in radioactive medications." },
    { code: "3336S0011X", grouping: SUPPLIERS, classification: "Pharmacy", specialization: "Specialty Pharmacy", definition: "A pharmacy specializing in high-cost, complex, or specialty medications." },
    { code: "335E00000X", grouping: SUPPLIERS, classification: "Prosthetic/Orthotic Supplier", specialization: "", definition: "A supplier of prosthetic and orthotic devices." },
    { code: "335V00000X", grouping: SUPPLIERS, classification: "Portable X-ray and/or Other Portable Diagnostic Imaging Supplier", specialization: "", definition: "A supplier of portable diagnostic imaging services." },
    { code: "332800000X", grouping: SUPPLIERS, classification: "Indian Health Service/Tribal/Urban Indian Health (I/T/U) Pharmacy", specialization: "", definition: "A pharmacy operated by Indian Health Service or tribal health programs." },

    // ═══════════════════════════════════════════════════════════════════════
    // GROUP
    // ═══════════════════════════════════════════════════════════════════════
    { code: "193200000X", grouping: GROUP, classification: "Multi-Specialty", specialization: "", definition: "A group of physicians who represent two or more practice specialties." },
    { code: "193400000X", grouping: GROUP, classification: "Single Specialty", specialization: "", definition: "A group of physicians who all share the same specialty." },

    // ═══════════════════════════════════════════════════════════════════════
    // TECHNOLOGISTS, TECHNICIANS & OTHER TECHNICAL SERVICE PROVIDERS
    // ═══════════════════════════════════════════════════════════════════════
    { code: "246Q00000X", grouping: TECHNO, classification: "Specialist/Technologist, Pathology", specialization: "", definition: "A technologist specializing in pathology laboratory procedures." },
    { code: "246QC2000X", grouping: TECHNO, classification: "Specialist/Technologist, Pathology", specialization: "Cytotechnology", definition: "A technologist specializing in the microscopic examination of cells." },
    { code: "246QH0401X", grouping: TECHNO, classification: "Specialist/Technologist, Pathology", specialization: "Hemapheresis Practitioner", definition: "A technologist specializing in hemapheresis procedures." },
    { code: "246QH0600X", grouping: TECHNO, classification: "Specialist/Technologist, Pathology", specialization: "Histology", definition: "A technologist specializing in the preparation and examination of tissue." },
    { code: "246QM0706X", grouping: TECHNO, classification: "Specialist/Technologist, Pathology", specialization: "Medical Technologist", definition: "A technologist who performs laboratory tests for diagnosis." },
    { code: "246R00000X", grouping: TECHNO, classification: "Technician, Pathology", specialization: "", definition: "A technician who assists in pathology laboratory work." },
    { code: "246RH0600X", grouping: TECHNO, classification: "Technician, Pathology", specialization: "Histology", definition: "A technician specializing in histology." },
    { code: "246RM2200X", grouping: TECHNO, classification: "Technician, Pathology", specialization: "Medical Laboratory", definition: "A technician who performs routine laboratory testing." },
    { code: "246RP1900X", grouping: TECHNO, classification: "Technician, Pathology", specialization: "Phlebotomy", definition: "A technician specializing in blood collection." },
    { code: "246W00000X", grouping: TECHNO, classification: "Technician, Cardiology", specialization: "", definition: "A technician specializing in cardiology procedures." },
    { code: "247100000X", grouping: TECHNO, classification: "Radiologic Technologist", specialization: "", definition: "A technologist who performs diagnostic imaging examinations." },
    { code: "2471B0102X", grouping: TECHNO, classification: "Radiologic Technologist", specialization: "Bone Densitometry", definition: "A radiologic technologist specializing in bone density testing." },
    { code: "2471C1101X", grouping: TECHNO, classification: "Radiologic Technologist", specialization: "Cardiovascular-Interventional Technology", definition: "A radiologic technologist specializing in cardiovascular procedures." },
    { code: "2471C1106X", grouping: TECHNO, classification: "Radiologic Technologist", specialization: "Cardiac-Interventional Technology", definition: "A radiologic technologist specializing in cardiac interventions." },
    { code: "2471C3401X", grouping: TECHNO, classification: "Radiologic Technologist", specialization: "Computed Tomography", definition: "A radiologic technologist specializing in CT scanning." },
    { code: "2471M1202X", grouping: TECHNO, classification: "Radiologic Technologist", specialization: "Magnetic Resonance Imaging", definition: "A radiologic technologist specializing in MRI." },
    { code: "2471M2300X", grouping: TECHNO, classification: "Radiologic Technologist", specialization: "Mammography", definition: "A radiologic technologist specializing in mammography." },
    { code: "2471N0900X", grouping: TECHNO, classification: "Radiologic Technologist", specialization: "Nuclear Medicine Technology", definition: "A radiologic technologist specializing in nuclear medicine." },
    { code: "2471R0002X", grouping: TECHNO, classification: "Radiologic Technologist", specialization: "Radiography", definition: "A radiologic technologist specializing in radiographic imaging." },
    { code: "2471S1302X", grouping: TECHNO, classification: "Radiologic Technologist", specialization: "Sonography", definition: "A radiologic technologist specializing in ultrasound imaging." },
    { code: "247200000X", grouping: TECHNO, classification: "Technician, Other", specialization: "", definition: "A technician in health-related fields not classified elsewhere." },

    // ═══════════════════════════════════════════════════════════════════════
    // OTHER MISCELLANEOUS
    // ═══════════════════════════════════════════════════════════════════════
    { code: "261Q00000X", grouping: OTHER, classification: "Clinic/Center", specialization: "", definition: "A facility providing outpatient health services." },
    { code: "261QA0600X", grouping: OTHER, classification: "Clinic/Center", specialization: "Adult Day Care", definition: "A center providing adult day care services." },
    { code: "261QA1903X", grouping: OTHER, classification: "Clinic/Center", specialization: "Ambulatory Surgical", definition: "A facility providing outpatient surgical services." },
    { code: "261QB0400X", grouping: OTHER, classification: "Clinic/Center", specialization: "Birthing", definition: "A center providing birthing services." },
    { code: "261QC1500X", grouping: OTHER, classification: "Clinic/Center", specialization: "Community Health", definition: "A center providing community-based health services." },
    { code: "261QC1800X", grouping: OTHER, classification: "Clinic/Center", specialization: "Corporate Health", definition: "A center providing corporate health and occupational medicine services." },
    { code: "261QD0000X", grouping: OTHER, classification: "Clinic/Center", specialization: "Dental", definition: "A center providing dental services." },
    { code: "261QE0002X", grouping: OTHER, classification: "Clinic/Center", specialization: "Emergency Care", definition: "A center providing emergency care services." },
    { code: "261QE0700X", grouping: OTHER, classification: "Clinic/Center", specialization: "End-Stage Renal Disease (ESRD) Treatment", definition: "A center providing dialysis and ESRD treatment." },
    { code: "261QF0400X", grouping: OTHER, classification: "Clinic/Center", specialization: "Federally Qualified Health Center (FQHC)", definition: "A federally qualified health center providing comprehensive primary care." },
    { code: "261QH0100X", grouping: OTHER, classification: "Clinic/Center", specialization: "Health Service", definition: "A health services clinic." },
    { code: "261QM0801X", grouping: OTHER, classification: "Clinic/Center", specialization: "Mental Health (Including Community Mental Health Center)", definition: "A center providing mental health services." },
    { code: "261QM1000X", grouping: OTHER, classification: "Clinic/Center", specialization: "Migrant Health", definition: "A center providing health services to migrant populations." },
    { code: "261QP2300X", grouping: OTHER, classification: "Clinic/Center", specialization: "Primary Care", definition: "A center providing primary care services." },
    { code: "261QR0200X", grouping: OTHER, classification: "Clinic/Center", specialization: "Radiology", definition: "A center specializing in radiology services." },
    { code: "261QR0400X", grouping: OTHER, classification: "Clinic/Center", specialization: "Rehabilitation", definition: "A center providing rehabilitation services." },
    { code: "261QR0401X", grouping: OTHER, classification: "Clinic/Center", specialization: "Rehabilitation, Comprehensive Outpatient Rehabilitation Facility (CORF)", definition: "A comprehensive outpatient rehabilitation facility." },
    { code: "261QR0405X", grouping: OTHER, classification: "Clinic/Center", specialization: "Rehabilitation, Substance Use Disorder", definition: "A center providing substance use disorder rehabilitation." },
    { code: "261QR1100X", grouping: OTHER, classification: "Clinic/Center", specialization: "Research", definition: "A center conducting clinical research." },
    { code: "261QR1300X", grouping: OTHER, classification: "Clinic/Center", specialization: "Rural Health", definition: "A rural health clinic." },
    { code: "261QS0112X", grouping: OTHER, classification: "Clinic/Center", specialization: "Oral and Maxillofacial Surgery", definition: "A center providing oral and maxillofacial surgery." },
    { code: "261QS0132X", grouping: OTHER, classification: "Clinic/Center", specialization: "Ophthalmologic Surgery", definition: "A center providing eye surgery services." },
    { code: "261QS1000X", grouping: OTHER, classification: "Clinic/Center", specialization: "Student Health", definition: "A clinic providing student health services." },
    { code: "261QS1200X", grouping: OTHER, classification: "Clinic/Center", specialization: "Sleep Disorder Diagnostic", definition: "A center specializing in sleep disorder diagnosis." },
    { code: "261QU0200X", grouping: OTHER, classification: "Clinic/Center", specialization: "Urgent Care", definition: "A center providing urgent care services." },
    { code: "261QV0200X", grouping: OTHER, classification: "Clinic/Center", specialization: "VA", definition: "A VA clinic providing outpatient services." },
    { code: "261QX0100X", grouping: OTHER, classification: "Clinic/Center", specialization: "Occupational Medicine", definition: "A center providing occupational medicine services." },
];
