import React from 'react';

interface DiagnosisResult {
  message: string;
  diagnosis: string;
  recommendation: string;
  references?: string;
}

interface MedicalAlert {
  level: 'warning' | 'danger';
  message: string;
  reference: string;
}

interface FullReport {
  dentalDiagnosis: DiagnosisResult;
  medicalAlerts: MedicalAlert[];
}

interface ResultsDisplayProps {
  diagnosis: FullReport | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ diagnosis }) => {
  if (!diagnosis) {
    return null;
  }

  const { dentalDiagnosis, medicalAlerts } = diagnosis;

  return (
    <div className="results-card">
      {/* Sección de Alertas Médicas */}
      {medicalAlerts && medicalAlerts.length > 0 && (
        <div className="medical-alerts-section">
          <h4>⚠️ Alertas Médicas</h4>
          {medicalAlerts.map((alert, index) => (
            <div key={index} className={`alert alert-${alert.level}`}>
              <p>{alert.message}</p>
              <p style={{fontSize: '0.8em', color: 'var(--fg-2)', marginBottom: 0}}><strong>Fuente:</strong> {alert.reference}</p>
            </div>
          ))}
        </div>
      )}

      {/* Sección de Diagnóstico Dental */}
      <div className="dental-diagnosis-section">
        <h4>Diagnóstico Dental</h4>
        <h5>{dentalDiagnosis.diagnosis || 'Resultado'}</h5>
        <p>{dentalDiagnosis.message}</p>
        <p><strong>Recomendación:</strong> {dentalDiagnosis.recommendation}</p>
        {dentalDiagnosis.references && (
          <div style={{marginTop: '1rem', paddingTop: '0.5rem', borderTop: '1px solid var(--fg-2)'}}>
            <p style={{fontSize: '0.8em', color: 'var(--fg-2)'}}><strong>Fuente:</strong> {dentalDiagnosis.references}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;