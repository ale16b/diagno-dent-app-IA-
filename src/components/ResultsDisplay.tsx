import React from 'react';

interface ResultsDisplayProps {
  diagnosis: any;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ diagnosis }) => {
  if (!diagnosis) {
    return null;
  }

  return (
    <div>
      <h2>Resultados del Diagnóstico</h2>
      <p>{diagnosis.message}</p>
      {diagnosis.diagnosis && (
        <p><strong>Diagnóstico Sugerido:</strong> {diagnosis.diagnosis}</p>
      )}
      {diagnosis.recommendation && (
        <p><strong>Recomendación:</strong> {diagnosis.recommendation}</p>
      )}
      {diagnosis.observations && (
        <p><strong>Observaciones:</strong> {diagnosis.observations}</p>
      )}
      {diagnosis.confirmed !== undefined && (
        <p><strong>Observaciones Confirmadas:</strong> {diagnosis.confirmed ? 'Sí' : 'No'}</p>
      )}
      {diagnosis.symptom && (
        <p><strong>Síntoma Principal:</strong> {diagnosis.symptom}</p>
      )}

      {diagnosis.lesionDetails && (
        <div style={{ border: '1px solid var(--fg-0)', padding: '15px', borderRadius: '8px', marginTop: '15px', textAlign: 'left' }}>
          <h3>Detalles de la Lesión:</h3>
          {diagnosis.lesionDetails.lesionElemental && <p><strong>Lesión Elemental:</strong> {diagnosis.lesionDetails.lesionElemental}</p>}
          {diagnosis.lesionDetails.localizacion && <p><strong>Localización:</strong> {diagnosis.lesionDetails.localizacion}</p>}
          {diagnosis.lesionDetails.numeroLesiones && <p><strong>Número de Lesiones:</strong> {diagnosis.lesionDetails.numeroLesiones}</p>}
          {diagnosis.lesionDetails.tamano && <p><strong>Tamaño:</strong> {diagnosis.lesionDetails.tamano}</p>}
          {diagnosis.lesionDetails.color && <p><strong>Color:</strong> {diagnosis.lesionDetails.color}</p>}
          {diagnosis.lesionDetails.consistencia && <p><strong>Consistencia:</strong> {diagnosis.lesionDetails.consistencia}</p>}
          {diagnosis.lesionDetails.superficie && <p><strong>Superficie:</strong> {diagnosis.lesionDetails.superficie}</p>}
          {diagnosis.lesionDetails.bordes && <p><strong>Bordes:</strong> {diagnosis.lesionDetails.bordes}</p>}
          {diagnosis.lesionDetails.base && <p><strong>Base:</strong> {diagnosis.lesionDetails.base}</p>}
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
