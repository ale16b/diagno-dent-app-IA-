import React, { useState } from 'react';
import { getDiagnosis } from '../logic/diagnosisEngine';

interface DiagnosisFormProps {
  setDiagnosis: (diagnosis: any) => void;
}

const DiagnosisForm: React.FC<DiagnosisFormProps> = ({ setDiagnosis }) => {
  const [generalObservations, setGeneralObservations] = useState<string>('');
  const [observationsConfirmed, setObservationsConfirmed] = useState<boolean>(false);
  const [selectedSymptom, setSelectedSymptom] = useState<string>('');
  const [showLesionDetails, setShowLesionDetails] = useState<boolean>(false);
  const [showExamples, setShowExamples] = useState<boolean>(false);

  // Estados para la descripción de la lesión
  const [lesionElemental, setLesionElemental] = useState<string>('');
  const [localizacion, setLocalizacion] = useState<string>('');
  const [numeroLesiones, setNumeroLesiones] = useState<string>('');
  const [tamano, setTamano] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [consistencia, setConsistencia] = useState<string>('');
  const [superficie, setSuperficie] = useState<string>('');
  const [bordes, setBordes] = useState<string>('');
  const [base, setBase] = useState<string>('');

  const handleSubmit = () => {
    const formData: any = {
      observations: generalObservations,
      confirmed: observationsConfirmed,
      symptom: selectedSymptom,
    };

    if (showLesionDetails) {
      formData.lesionDetails = {
        lesionElemental,
        localizacion,
        numeroLesiones,
        tamano,
        color,
        consistencia,
        superficie,
        bordes,
        base,
      };
    }

    const result = getDiagnosis(formData);
    setDiagnosis(result);
  };

  return (
    <div>
      <h2>Formulario de Diagnóstico</h2>
      <div>
        <label htmlFor="generalObservations">Observaciones Generales:</label>
        <button 
          onClick={() => setShowExamples(!showExamples)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--fg-0)',
            fontSize: '0.85em',
            cursor: 'pointer',
            textDecoration: 'underline',
            marginBottom: '5px',
            padding: '0',
            textAlign: 'left'
          }}
        >
          {showExamples ? 'Ocultar Ejemplos ▲' : 'Ver Ejemplos ▼'}
        </button>
        {showExamples && (
          <div style={{ color: 'var(--fg-0)', fontSize: '0.85em', marginTop: '-10px', marginBottom: '5px', textAlign: 'left', border: '1px solid var(--fg-0)', padding: '10px', borderRadius: '5px', backgroundColor: 'rgba(0,0,0,0.1)' }}>
            <p>Ejemplos:</p>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              <li>"Paciente refiere dolor agudo al masticar, se observa caries profunda en molar inferior."</li>
              <li>"Sensibilidad al frío en premolar superior, sin lesión visible."</li>
              <li>"Encías inflamadas y sangrado al cepillado."</li>
              <li>"Lesión blanca, no removible, en mucosa yugal derecha, de 1 cm, superficie rugosa."</li>
              <li>"Úlcera persistente en borde lateral de lengua, de 2 cm, bordes irregulares e indurados, no cicatriza en 3 semanas."</li>
              <li>"Nódulo firme, color rosa, en labio inferior, con antecedente de trauma por mordedura."</li>
              <li>"Múltiples vesículas dolorosas en paladar blando, acompañadas de fiebre."</li>
              <li>"Mancha roja, lisa, asintomática, en piso de boca, de 0.8 cm."</li>
              <li>"Movilidad dental grado II en incisivo central superior, con pérdida ósea radiográfica."</li>
            </ul>
          </div>
        )}
        <textarea
          id="generalObservations"
          value={generalObservations}
          onChange={(e) => setGeneralObservations(e.target.value)}
          rows={5}
          cols={50}
          placeholder="Escribe aquí tus observaciones clínicas generales..."
        />
      </div>
      <div>
        <input
          type="checkbox"
          id="observationsConfirmed"
          checked={observationsConfirmed}
          onChange={(e) => setObservationsConfirmed(e.target.checked)}
        />
        <label htmlFor="observationsConfirmed">Confirmar observaciones</label>
      </div>
      <div>
        <label htmlFor="symptomSelect">Síntoma Principal:</label>
        <select
          id="symptomSelect"
          value={selectedSymptom}
          onChange={(e) => setSelectedSymptom(e.target.value)}
        >
          <option value="">-- Selecciona un síntoma --</option>
          <option value="Dolor agudo">Dolor agudo</option>
          <option value="Sensibilidad al frío/calor">Sensibilidad al frío/calor</option>
          <option value="Sangrado gingival">Sangrado gingival</option>
          <option value="Movilidad dental">Movilidad dental</option>
          <option value="Inflamación">Inflamación</option>
          <option value="Lesión visible">Lesión visible</option>
          <option value="Ninguno">Ninguno</option>
        </select>
      </div>

      <div>
        <input
          type="checkbox"
          id="showLesionDetails"
          checked={showLesionDetails}
          onChange={(e) => setShowLesionDetails(e.target.checked)}
        />
        <label htmlFor="showLesionDetails">Describir Lesión Clínica</label>
      </div>

      {showLesionDetails && (
        <div style={{ border: '1px solid var(--fg-0)', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
          <h3>Detalles de la Lesión</h3>
          <div>
            <label htmlFor="lesionElemental">Lesión Elemental:</label>
            <select id="lesionElemental" value={lesionElemental} onChange={(e) => setLesionElemental(e.target.value)}>
              <option value="">-- Selecciona --</option>
              <option value="Mácula">Mácula</option>
              <option value="Pápula">Pápula</option>
              <option value="Nódulo">Nódulo</option>
              <option value="Vesícula">Vesícula</option>
              <option value="Ampolla">Ampolla</option>
              <option value="Pústula">Pústula</option>
              <option value="Úlcera">Úlcera</option>
              <option value="Erosión">Erosión</option>
              <option value="Fisura">Fisura</option>
              <option value="Costra">Costra</option>
              <option value="Escama">Escama</option>
              <option value="Placa">Placa</option>
              <option value="Tumor">Tumor (general)</option>
              <option value="Quiste">Quiste</option>
              <option value="Absceso">Absceso</option>
              <option value="Púrpura">Púrpura (Petequia/Equimosis)</option>
              <option value="Hematoma">Hematoma</option>
            </select>
          </div>
          <div>
            <label htmlFor="localizacion">Localización:</label>
            <select id="localizacion" value={localizacion} onChange={(e) => setLocalizacion(e.target.value)}>
              <option value="">-- Selecciona --</option>
              <option value="Labio">Labio (Bermellón/Mucosa Labial)</option>
              <option value="Lengua">Lengua (Borde Lateral/Superficie Ventral/Dorso/Punta)</option>
              <option value="Mucosa Yugal">Mucosa Yugal</option>
              <option value="Paladar">Paladar (Duro/Blando)</option>
              <option value="Encía">Encía</option>
              <option value="Piso de Boca">Piso de Boca</option>
              <option value="Orofaringe">Orofaringe</option>
              <option value="Vestíbulo">Vestíbulo</option>
              <option value="Reborde Alveolar">Reborde Alveolar</option>
              <option value="Trígono Retromolar">Trígono Retromolar</option>
            </select>
          </div>
          <div>
            <label htmlFor="numeroLesiones">Número de Lesiones:</label>
            <select id="numeroLesiones" value={numeroLesiones} onChange={(e) => setNumeroLesiones(e.target.value)}>
              <option value="">-- Selecciona --</option>
              <option value="Única">Única</option>
              <option value="Múltiples">Múltiples</option>
            </select>
          </div>
          <div>
            <label htmlFor="tamano">Tamaño:</label>
            <select id="tamano" value={tamano} onChange={(e) => setTamano(e.target.value)}>
              <option value="">-- Selecciona --</option>
              <option value="Menor a 0.5 cm">Menor a 0.5 cm</option>
              <option value="0.5 - 2 cm">0.5 - 2 cm</option>
              <option value="Mayor a 2 cm">Mayor a 2 cm</option>
            </select>
          </div>
          <div>
            <label htmlFor="color">Color:</label>
            <select id="color" value={color} onChange={(e) => setColor(e.target.value)}>
              <option value="">-- Selecciona --</option>
              <option value="Rojo">Rojo (Eritema)</option>
              <option value="Blanco">Blanco (Leucoplasia/Pseudomembrana)</option>
              <option value="Azul/Violeta">Azul/Violeta</option>
              <option value="Marrón/Negro">Marrón/Negro</option>
              <option value="Amarillo">Amarillo</option>
              <option value="Rosa/Normal">Rosa/Normal</option>
              <option value="Gris">Gris</option>
              <option value="Púrpura">Púrpura</option>
            </select>
          </div>
          <div>
            <label htmlFor="consistencia">Consistencia:</label>
            <select id="consistencia" value={consistencia} onChange={(e) => setConsistencia(e.target.value)}>
              <option value="">-- Selecciona --</option>
              <option value="Blanda">Blanda</option>
              <option value="Firme">Firme</option>
              <option value="Dura">Dura</option>
              <option value="Fluctuante">Fluctuante</option>
              <option value="Elástica">Elástica</option>
              <option value="Indurada">Indurada</option>
              <option value="Gomosa">Gomosa (Rubbery)</option>
              <option value="Caseosa">Caseosa (Queso)</option>
            </select>
          </div>
          <div>
            <label htmlFor="superficie">Superficie:</label>
            <select id="superficie" value={superficie} onChange={(e) => setSuperficie(e.target.value)}>
              <option value="">-- Selecciona --</option>
              <option value="Lisa">Lisa</option>
              <option value="Rugosa">Rugosa/Granular</option>
              <option value="Verrucosa">Verrucosa/Papilar</option>
              <option value="Ulcerada">Ulcerada</option>
              <option value="Erosiva">Erosiva</option>
              <option value="Fisurada">Fisurada</option>
              <option value="Costrosa">Costrosa</option>
              <option value="Pseudomembranosa">Pseudomembranosa</option>
              <option value="Exofítica">Exofítica</option>
              <option value="Endofítica">Endofítica</option>
            </select>
          </div>
          <div>
            <label htmlFor="bordes">Bordes:</label>
            <select id="bordes" value={bordes} onChange={(e) => setBordes(e.target.value)}>
              <option value="">-- Selecciona --</option>
              <option value="Bien definidos">Bien definidos (Circunscritos)</option>
              <option value="Mal definidos">Mal definidos (Indistintos)</option>
              <option value="Regulares">Regulares</option>
              <option value="Irregulares">Irregulares</option>
              <option value="Elevados">Elevados</option>
              <option value="Planos">Planos</option>
              <option value="Enrollados">Enrollados</option>
              <option value="Evertidos">Evertidos</option>
              <option value="Invertidos">Invertidos</option>
            </select>
          </div>
          <div>
            <label htmlFor="base">Base:</label>
            <select id="base" value={base} onChange={(e) => setBase(e.target.value)}>
              <option value="">-- Selecciona --</option>
              <option value="Sésil">Sésil</option>
              <option value="Pediculada">Pediculada</option>
              <option value="Plana">Plana/Amplia</option>
              <option value="Cupuliforme">Cupuliforme (Dome-shaped)</option>
            </select>
          </div>
        </div>
      )}

      <button onClick={handleSubmit}>Obtener Diagnóstico</button>
    </div>
  );
};

export default DiagnosisForm;
