interface LesionDetails { /* ... */ }
interface PerioDetails { /* ... */ }
interface MedicalHistory {
  diabetes: boolean;
  hypertension: boolean;
  anticoagulants: boolean;
  bisphosphonates: boolean;
  heartDisease: boolean;
  kidneyDisease: boolean;
  pregnancy: boolean;
  asthma: boolean;
  allergies: string;
}

interface FormData {
  // ... otros campos
  medicalHistory: MedicalHistory;
}

interface DiagnosisResult { /* ... */ }

interface MedicalAlert {
  level: 'warning' | 'danger';
  message: string;
  reference: string;
}

// Referencias
const REFS = {
  COHEN: "Cohen's Pathways of the Pulp, 12th Ed.",
  CARRANZA: "Carranza's Clinical Periodontology, 13th Ed.",
  NEVILLE: "Neville's Oral and Maxillofacial Pathology, 4th Ed.",
  LITTLE: "Little and Falace's Dental Management of the Medically Compromised Patient, 9th Ed.",
  CASTELLANOS: "Medicina en Odontología (Castellanos, J.L. et al), 3rd Ed."
};

function getMedicalAlerts(history: MedicalHistory): MedicalAlert[] {
  const alerts: MedicalAlert[] = [];
  const fullMedRef = `${REFS.LITTLE}, ${REFS.CASTELLANOS}`;

  if (history.diabetes) {
    alerts.push({
      level: 'warning',
      message: "Paciente con Diabetes: Mayor riesgo de infección y cicatrización lenta. Controlar glucosa. Considerar profilaxis antibiótica en procedimientos invasivos.",
      reference: fullMedRef
    });
  }
  if (history.hypertension) {
    alerts.push({
      level: 'warning',
      message: "Paciente con Hipertensión: Medir presión arterial. Evitar estrés y uso excesivo de vasoconstrictores. Cuidado con AINEs.",
      reference: fullMedRef
    });
  }
  if (history.anticoagulants) {
    alerts.push({
      level: 'danger',
      message: "Paciente Anticoagulado: Alto riesgo de sangrado. Requiere consulta con médico tratante para posible ajuste y medición de INR antes de cirugía.",
      reference: fullMedRef
    });
  }
  if (history.bisphosphonates) {
    alerts.push({
      level: 'danger',
      message: "Paciente con Bifosfonatos: Riesgo de Osteonecrosis de los Maxilares (ONM) tras procedimientos óseos. Evitar cirugía si es posible.",
      reference: fullMedRef
    });
  }
  if (history.heartDisease) {
    alerts.push({
      level: 'danger',
      message: "Cardiopatía / Infarto Previo: Riesgo de emergencia médica. Citas cortas, manejo de estrés. Consultar al cardiólogo sobre profilaxis para endocarditis y uso de anestésicos.",
      reference: fullMedRef
    });
  }
  if (history.kidneyDisease) {
    alerts.push({
      level: 'warning',
      message: "Insuficiencia Renal: Precaución con la prescripción de fármacos que se metabolizan en el riñón (AINEs, algunos antibióticos). Riesgo de sangrado y anemia.",
      reference: fullMedRef
    });
  }
  if (history.pregnancy) {
    alerts.push({
      level: 'warning',
      message: "Paciente Embarazada: Evitar radiografías (especialmente 1er trimestre). Posponer tratamientos electivos. El 2º trimestre es el más seguro. Cuidado con los fármacos.",
      reference: fullMedRef
    });
  }
  if (history.asthma) {
    alerts.push({
      level: 'warning',
      message: "Paciente con Asma: Riesgo de ataque agudo por estrés. Asegurarse de que el paciente traiga su inhalador (broncodilatador) a la cita. Evitar AINEs.",
      reference: fullMedRef
    });
  }
  if (history.allergies && history.allergies.trim() !== '') {
    alerts.push({
      level: 'danger',
      message: `ALERGIA DECLARADA: ${history.allergies}. Evitar el uso de cualquier producto que contenga este componente.`,
      reference: 'Historia clínica del paciente'
    });
  }

  return alerts;
}

function getDentalDiagnosis(data: FormData): DiagnosisResult {
  const { observations, symptom, painType, lesionDetails, perioDetails } = data;
  const obs = observations.toLowerCase();

  // --- Lógica de Patología Oral ---
  if (symptom === "Lesión visible" && lesionDetails) {
    const { color, bordes, consistencia, superficie, lesionElemental } = lesionDetails;
    if (color === "Blanco" && lesionElemental === "Placa") {
      return {
        diagnosis: "Leucoplasia (Sospecha)",
        message: "Lesión blanca en forma de placa que no se desprende al raspado. Se considera una lesión precancerosa.",
        recommendation: "Requiere biopsia para descartar displasia o malignidad. Evitar factores de riesgo como tabaco y alcohol.",
        references: REFS.NEVILLE,
      };
    }
    if (color === "Rojo (Eritema)" && superficie === "Lisa") {
        return {
            diagnosis: "Eritroplasia (Sospecha)",
            message: "Lesión roja, aterciopelada, que no puede ser caracterizada como otra condición. Alto potencial de malignidad.",
            recommendation: "Referencia URGENTE a especialista para biopsia. Es una lesión de alto riesgo.",
            references: REFS.NEVILLE,
        };
    }
    if (lesionElemental === "Úlcera" && bordes === "Irregulares" && consistencia === "Indurada") {
        return {
            diagnosis: "Carcinoma de Células Escamosas (Sospecha)",
            message: "Úlcera persistente (más de 2-3 semanas), con bordes duros, elevados e irregulares. Puede o no ser dolorosa.",
            recommendation: "Referencia URGENTE a cirujano maxilofacial u oncólogo para biopsia incisional.",
            references: REFS.NEVILLE,
        };
    }
  }

  // --- Lógica de Endodoncia ---
  if (symptom === "Dolor") {
    if (painType === 'pulsatil') {
      return {
        message: "Dolor pulsátil, espontáneo, que aumenta con el calor y al acostarse. A menudo es difícil de localizar (dolor referido). Es el cuadro clásico de una inflamación pulpar severa e irreversible.",
        diagnosis: "Pulpitis Irreversible Sintomática",
        recommendation: "Se requieren pruebas de vitalidad y radiografía. El tratamiento indicado es la endodoncia (tratamiento de conducto) o la extracción.",
        references: REFS.COHEN,
      };
    }
    if (obs.includes('al morder') || obs.includes('al masticar') || obs.includes('al tocar')) {
      return {
        message: "El dolor localizado a la percusión (al morder o tocar) es el signo clave de que la inflamación ha cruzado el ápice del diente.",
        diagnosis: "Periodontitis Apical Sintomática",
        recommendation: "Se requiere radiografía periapical. El diente probablemente necesite endodoncia.",
        references: REFS.COHEN,
      };
    }
  }

  if (symptom === "Sensibilidad al frío/calor") {
    if (obs.includes('desaparece rapido') || obs.includes('provocado')) {
      return {
        message: "Dolor agudo, provocado (generalmente por frío o dulce) y que desaparece a los pocos segundos de retirar el estímulo. Es una inflamación pulpar que puede sanar si se elimina la causa.",
        diagnosis: "Pulpitis Reversible",
        recommendation: "Eliminar la causa (ej. caries). Si no hay causa obvia, intentar con desensibilizantes.",
        references: REFS.COHEN,
      };
    }
  }

  if (symptom === "Inflamación") {
    if (obs.includes('hinchazon') || obs.includes('hinchado') || obs.includes('flemón')) {
      return {
        message: "La presencia de hinchazón (edema) y la posible formación de pus son signos claros de una infección aguda que se ha diseminado desde un diente con pulpa necrótica.",
        diagnosis: "Absceso Apical Agudo",
        recommendation: "Es una urgencia dental. Se requiere atención inmediata para drenar el absceso, prescribir antibióticos si es necesario y tratar el diente causal (endodoncia o extracción).",
        references: REFS.COHEN,
      };
    }
  }

  // --- Lógica de Periodoncia ---
  if ((symptom === "Sangrado gingival" || symptom === "Movilidad dental") && perioDetails) {
    if (perioDetails.mobility || symptom === "Movilidad dental") {
      return {
        message: "La movilidad dental es un signo inequívoco de Periodontitis, ya que indica una pérdida de soporte óseo significativa.",
        diagnosis: "Periodontitis",
        recommendation: "Se requiere evaluación periodontal completa (sondaje, radiografías) para determinar el grado y plan de tratamiento.",
        references: REFS.CARRANZA,
      };
    } 
    if (symptom === "Sangrado gingival") {
      return {
        message: "El sangrado gingival (al cepillado o espontáneo), en ausencia de movilidad dental, es el signo cardinal de la Gingivitis. Indica una inflamación de las encías reversible y sin pérdida de hueso de soporte.",
        diagnosis: "Gingivitis",
        recommendation: "Profilaxis profesional y mejora de la técnica de higiene oral.",
        references: REFS.CARRANZA,
      };
    }
  }

  // --- Fallback ---
  return {
    message: "No se pudo llegar a un diagnóstico con los datos proporcionados.",
    diagnosis: "Diagnóstico no concluyente",
    recommendation: "Se requiere un examen clínico completo por un profesional.",
    references: "N/A"
  };
}

export const generateFullReport = (data: FormData) => {
  const dentalDiagnosis = getDentalDiagnosis(data);
  const medicalAlerts = getMedicalAlerts(data.medicalHistory);
  return { dentalDiagnosis, medicalAlerts };
};