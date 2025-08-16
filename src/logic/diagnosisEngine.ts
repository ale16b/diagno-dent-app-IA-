interface LesionDetails {
  lesionElemental?: string;
  localizacion?: string;
  numeroLesiones?: string;
  tamano?: string;
  color?: string;
  consistencia?: string;
  superficie?: string;
  bordes?: string;
  base?: string;
}

interface FormData {
  observations: string;
  confirmed: boolean;
  symptom: string;
  lesionDetails?: LesionDetails; // Ahora lesionDetails es opcional
}

interface DiagnosisResult {
  message: string;
  diagnosis: string;
  recommendation: string;
}

export const getDiagnosis = (data: FormData): DiagnosisResult => {
  const { observations, confirmed, symptom, lesionDetails } = data;

  let diagnosisMessage = "";
  let diagnosis = "";
  let recommendation = "";

  if (!confirmed) {
    diagnosisMessage = "Por favor, confirma las observaciones para un diagnóstico más preciso.";
    diagnosis = "Información incompleta";
    recommendation = "Revisa y confirma las observaciones.";
    return { message: diagnosisMessage, diagnosis, recommendation };
  }

  // --- Lógica de diagnóstico basada en detalles de la lesión (más específica) ---
  if (lesionDetails) {
    const {
      lesionElemental,
      localizacion,
      numeroLesiones,
      tamano,
      color,
      consistencia,
      superficie,
      bordes,
      base,
    } = lesionDetails;

    // Reglas para Lesiones Blancas
    if (color === "Blanco") {
      if (lesionElemental === "Placa" && superficie === "Rugosa" && (localizacion === "Mucosa Yugal" || localizacion === "Lengua (Borde Lateral/Superficie Ventral/Dorso/Punta)")) {
        diagnosisMessage = "Posible Leucoplasia. Requiere biopsia para descartar displasia.";
        diagnosis = "Leucoplasia";
        recommendation = "Referir a especialista para biopsia y seguimiento.";
        return { message: diagnosisMessage, diagnosis, recommendation };
      }
      if (lesionElemental === "Pseudomembranosa" && superficie === "Pseudomembranosa" && observations.toLowerCase().includes("removible")) {
        diagnosisMessage = "Posible Candidiasis Oral. Placas blancas removibles.";
        diagnosis = "Candidiasis Oral";
        recommendation = "Antifúngico tópico o sistémico según severidad. Mejorar higiene oral.";
        return { message: diagnosisMessage, diagnosis, recommendation };
      }
    }

    // Reglas para Lesiones Rojas
    if (color === "Rojo (Eritema)") {
      if ((lesionElemental === "Mácula" || lesionElemental === "Placa") && superficie === "Lisa" && (localizacion === "Piso de Boca" || localizacion === "Lengua (Borde Lateral/Superficie Ventral/Dorso/Punta)")) {
        diagnosisMessage = "Posible Eritroplasia. Alto riesgo de malignidad.";
        diagnosis = "Eritroplasia";
        recommendation = "Referir a especialista para biopsia urgente.";
        return { message: diagnosisMessage, diagnosis, recommendation };
      }
    }

    // Reglas para Lesiones Ulcerativas
    if (lesionElemental === "Úlcera") {
      if (bordes === "Irregulares" && consistencia === "Indurada" && tamano === "Mayor a 2 cm" && observations.toLowerCase().includes("no cicatriza")) {
        diagnosisMessage = "Alta sospecha de Carcinoma de Células Escamosas. Úlcera persistente e indurada.";
        diagnosis = "Carcinoma de Células Escamosas (Sospecha)";
        recommendation = "Biopsia incisional urgente y referencia a oncólogo/cirujano maxilofacial.";
        return { message: diagnosisMessage, diagnosis, recommendation };
      }
      if (numeroLesiones === "Única" && observations.toLowerCase().includes("trauma")) {
        diagnosisMessage = "Posible Úlcera Traumática. Antecedente de irritación local.";
        diagnosis = "Úlcera Traumática";
        recommendation = "Eliminar agente causal. Reevaluar en 7-14 días. Si persiste, biopsia.";
        return { message: diagnosisMessage, diagnosis, recommendation };
      }
    }

    // Reglas para Nódulos
    if (lesionElemental === "Nódulo") {
      if (consistencia === "Firme" && color === "Rosa/Normal" && superficie === "Lisa" && observations.toLowerCase().includes("trauma")) {
        diagnosisMessage = "Posible Fibroma Traumático. Lesión benigna reactiva.";
        diagnosis = "Fibroma Traumático";
        recommendation = "Escisión quirúrgica si es sintomático o estético.";
        return { message: diagnosisMessage, diagnosis, recommendation };
      }
      if (consistencia === "Fluctuante" && localizacion === "Labio (Bermellón/Mucosa Labial)") {
        diagnosisMessage = "Posible Mucocele. Lesión quística de glándula salival menor.";
        diagnosis = "Mucocele";
        recommendation = "Escisión quirúrgica con remoción de glándulas adyacentes.";
        return { message: diagnosisMessage, diagnosis, recommendation };
      }
    }

    // Reglas para Vesículas/Ampollas
    if (lesionElemental === "Vesícula" || lesionElemental === "Ampolla") {
      if (numeroLesiones === "Múltiples" && (localizacion === "Labio (Bermellón/Mucosa Labial)" || localizacion === "Paladar (Duro/Blando)") && observations.toLowerCase().includes("dolor") && observations.toLowerCase().includes("fiebre")) {
        diagnosisMessage = "Posible Herpes Oral (Primario o Recurrente). Lesiones vesiculares dolorosas.";
        diagnosis = "Herpes Oral";
        recommendation = "Antivirales (aciclovir) y manejo sintomático.";
        return { message: diagnosisMessage, diagnosis, recommendation };
      }
    }
  }

  // --- Lógica de diagnóstico basada solo en síntomas (si no hay detalles de lesión o no coinciden las reglas) ---
  if (symptom === "Dolor agudo") {
    if (observations.toLowerCase().includes("caries profunda")) {
      diagnosisMessage = "Posible Pulpitis Irreversible.";
      diagnosis = "Pulpitis Irreversible";
      recommendation = "Necesita evaluación endodóntica urgente.";
    } else if (observations.toLowerCase().includes("sensibilidad")) {
      diagnosisMessage = "Posible Hipersensibilidad Dentinaria.";
      diagnosis = "Hipersensibilidad Dentinaria";
      recommendation = "Aplicación de desensibilizante o revisión de técnica de cepillado.";
    } else {
      diagnosisMessage = "Dolor agudo sin causa clara en observaciones.";
      diagnosis = "Dolor agudo inespecífico";
      recommendation = "Se requiere examen clínico detallado y radiografías.";
    }
  } else if (symptom === "Sangrado gingival") {
    diagnosisMessage = "Posible Gingivitis.";
    diagnosis = "Gingivitis";
    recommendation = "Mejorar higiene oral y profilaxis profesional.";
  } else if (symptom === "Movilidad dental") {
    diagnosisMessage = "Posible Periodontitis avanzada o trauma oclusal.";
    diagnosis = "Movilidad dental";
    recommendation = "Evaluación periodontal completa y radiografías.";
  } else if (symptom === "Lesión visible") {
    if (observations.toLowerCase().includes("mancha blanca")) {
      diagnosisMessage = "Posible Lesión de Caries en esmalte.";
      diagnosis = "Caries inicial";
      recommendation = "Fluorización y control de higiene.";
    } else if (observations.toLowerCase().includes("cavidad")) {
      diagnosisMessage = "Posible Caries dental.";
      diagnosis = "Caries dental";
      recommendation = "Restauración dental.";
    } else {
      diagnosisMessage = "Lesión visible inespecífica.";
      diagnosis = "Lesión inespecífica";
      recommendation = "Se requiere examen clínico detallado.";
    }
  } else if (symptom === "Ninguno") {
    diagnosisMessage = "No se reportan síntomas principales.";
    diagnosis = "Sin síntomas";
    recommendation = "Mantener controles regulares.";
  } else {
    diagnosisMessage = "No hay reglas de diagnóstico para el síntoma seleccionado o la combinación de detalles de lesión.";
    diagnosis = "Diagnóstico no disponible";
    recommendation = "Se requiere más información o reglas. Considerar referencia a especialista.";
  }

  return {
    message: diagnosisMessage,
    diagnosis: diagnosis,
    recommendation: recommendation,
  };
};