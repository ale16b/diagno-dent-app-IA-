import React, { useState, useEffect } from 'react';
import { generateFullReport as getDiagnosis } from '../logic/diagnosisEngine';

interface DiagnosisFormProps {
  setDiagnosis: (diagnosis: any) => void;
}

const DiagnosisForm: React.FC<DiagnosisFormProps> = ({ setDiagnosis }) => {
  const [generalObservations, setGeneralObservations] = useState<string>('');
  const [observationsConfirmed, setObservationsConfirmed] = useState<boolean>(false);
  const [selectedSymptom, setSelectedSymptom] = useState<string>('');
  const [painType, setPainType] = useState<string>('');
  const [showLesionDetails, setShowLesionDetails] = useState<boolean>(false);
  const [lesionElemental, setLesionElemental] = useState<string>('');
  const [localizacion, setLocalizacion] = useState<string>('');
  const [numeroLesiones, setNumeroLesiones] = useState<string>('');
  const [tamano, setTamano] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [consistencia, setConsistencia] = useState<string>('');
  const [superficie, setSuperficie] = useState<string>('');
  const [bordes, setBordes] = useState<string>('');
  const [base, setBase] = useState<string>('');
  const [perioSigns, setPerioSigns] = useState({ mobility: false, recession: false, calculus: false });
  const [showExamples, setShowExamples] = useState<boolean>(false);
  const [medicalHistory, setMedicalHistory] = useState({
    diabetes: false,
    hypertension: false,
    anticoagulants: false,
    bisphosphonates: false,
    heartDisease: false,
    kidneyDisease: false,
    pregnancy: false,
    asthma: false,
    allergies: ''
  });
  const [showMedicalHistory, setShowMedicalHistory] = useState<boolean>(false);

  useEffect(() => {
    setShowLesionDetails(selectedSymptom === 'Lesión visible');
    if (selectedSymptom !== 'Dolor') setPainType('');
    if (selectedSymptom !== 'Sangrado gingival' && selectedSymptom !== 'Movilidad dental') {
      setPerioSigns({ mobility: false, recession: false, calculus: false });
    }
  }, [selectedSymptom]);

  useEffect(() => {
    if (!showMedicalHistory) {
      setMedicalHistory({
        diabetes: false,
        hypertension: false,
        anticoagulants: false,
        bisphosphonates: false,
        heartDisease: false,
        kidneyDisease: false,
        pregnancy: false,
        asthma: false,
        allergies: ''
      });
    }
  }, [showMedicalHistory]);

  const handlePerioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPerioSigns(prev => ({ ...prev, [name]: checked }));
  };

  const handleMedicalHistoryChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type } = event.target;
    const value = type === 'checkbox' ? (event.target as HTMLInputElement).checked : event.target.value;
    setMedicalHistory(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData: any = {
      observations: generalObservations,
      confirmed: observationsConfirmed,
      symptom: selectedSymptom,
      painType: painType,
      perioDetails: perioSigns,
      medicalHistory: showMedicalHistory ? medicalHistory : {},
    };
    if (showLesionDetails) {
      formData.lesionDetails = { lesionElemental, localizacion, numeroLesiones, tamano, color, consistencia, superficie, bordes, base };
    }
    const result = getDiagnosis(formData);
    setDiagnosis(result);
  };

  const showPerioDetails = selectedSymptom === 'Sangrado gingival' || selectedSymptom === 'Movilidad dental';

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="symptomSelect">Síntoma Principal:</label>
        <select id="symptomSelect" value={selectedSymptom} onChange={(e) => setSelectedSymptom(e.target.value)}>
          <option value="">-- Selecciona un síntoma --</option>
          <option value="Lesión visible">Lesión visible</option>
          <option value="Dolor">Dolor</option>
          <option value="Sensibilidad al frío/calor">Sensibilidad al frío/calor</option>
          <option value="Sangrado gingival">Sangrado gingival</option>
          <option value="Movilidad dental">Movilidad dental</option>
          <option value="Inflamación">Inflamación</option>
          <option value="Ninguno">Ninguno</option>
        </select>
        <p style={{ fontSize: '0.8em', color: 'var(--fg-2)', margin: '5px 0 0 0' }}>
          Nota: al seleccionar ciertas opciones se desplegarán campos adicionales.
        </p>
      </div>

      {selectedSymptom === 'Dolor' && (
        <div>
          <label htmlFor="painTypeSelect">Tipo de Dolor:</label>
          <select id="painTypeSelect" value={painType} onChange={(e) => setPainType(e.target.value)}>
            <option value="">-- Seleccione --</option>
            <option value="punzante">Punzante (como un piquete)</option>
            <option value="sordo">Sordo (constante, de fondo)</option>
            <option value="pulsatil">Pulsátil (como el latido del corazón)</option>
            <option value="agudo">Agudo y localizado</option>
            <option value="irradiado">Irradiado (se extiende a otras zonas)</option>
            <option value="ninguno">Ninguno / No aplica</option>
          </select>
        </div>
      )}

      {showPerioDetails && (
        <div>
          <h5>Detalles Periodontales</h5>
          <div>
            <input type="checkbox" id="perioMobility" name="mobility" checked={perioSigns.mobility} onChange={handlePerioChange} />
            <label htmlFor="perioMobility">¿El paciente nota movilidad en los dientes?</label>
          </div>
          <div>
            <input type="checkbox" id="perioRecession" name="recession" checked={perioSigns.recession} onChange={handlePerioChange} />
            <label htmlFor="perioRecession">¿Se observan las encías retraídas (dientes más largos)?</label>
          </div>
          <div>
            <input type="checkbox" id="perioCalculus" name="calculus" checked={perioSigns.calculus} onChange={handlePerioChange} />
            <label htmlFor="perioCalculus">¿Hay presencia de sarro (cálculo) visible?</label>
          </div>
        </div>
      )}

      {showLesionDetails && (
        <div>
          <h5>Detalles de la Lesión</h5>
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
              <option value="Plana/Amplia">Plana/Amplia</option>
              <option value="Cúpula (forma de domo)">Cúpula (forma de domo)</option>
            </select>
          </div>
        </div>
      )}

      <div>
        <label>
          <input type="checkbox" checked={showMedicalHistory} onChange={(e) => setShowMedicalHistory(e.target.checked)} />
          ¿El paciente tiene un historial médico relevante?
        </label>
      </div>

      {showMedicalHistory && (
        <div style={{padding: '10px', border: '1px solid var(--fg-2)', borderRadius: '4px'}}>
          <h5>Detalles Médicos</h5>
          <div>
            <input type="checkbox" name="diabetes" checked={medicalHistory.diabetes} onChange={handleMedicalHistoryChange} />
            <label>Diabetes</label>
          </div>
          <div>
            <input type="checkbox" name="hypertension" checked={medicalHistory.hypertension} onChange={handleMedicalHistoryChange} />
            <label>Hipertensión Arterial</label>
          </div>
          <div>
            <input type="checkbox" name="anticoagulants" checked={medicalHistory.anticoagulants} onChange={handleMedicalHistoryChange} />
            <label>Toma Anticoagulantes</label>
          </div>
          <div>
            <input type="checkbox" name="bisphosphonates" checked={medicalHistory.bisphosphonates} onChange={handleMedicalHistoryChange} />
            <label>Toma Bifosfonatos</label>
          </div>
          <div>
            <input type="checkbox" name="heartDisease" checked={medicalHistory.heartDisease} onChange={handleMedicalHistoryChange} />
            <label>Cardiopatía / Infarto</label>
          </div>
          <div>
            <input type="checkbox" name="kidneyDisease" checked={medicalHistory.kidneyDisease} onChange={handleMedicalHistoryChange} />
            <label>Insuficiencia Renal</label>
          </div>
          <div>
            <input type="checkbox" name="pregnancy" checked={medicalHistory.pregnancy} onChange={handleMedicalHistoryChange} />
            <label>Embarazo</label>
          </div>
          <div>
            <input type="checkbox" name="asthma" checked={medicalHistory.asthma} onChange={handleMedicalHistoryChange} />
            <label>Asma</label>
          </div>
          <div style={{marginTop: '10px'}}>
            <label htmlFor="allergies">Alergias Conocidas:</label>
            <textarea id="allergies" name="allergies" value={medicalHistory.allergies} onChange={handleMedicalHistoryChange} rows={2} placeholder="Ej. Penicilina, Látex..."/>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="generalObservations">Observaciones Generales y Antecedentes:</label>
        <button type="button" onClick={() => setShowExamples(!showExamples)} style={{ background: 'none', border: 'none', color: 'var(--fg-0)', fontSize: '0.85em', cursor: 'pointer', textDecoration: 'underline', marginBottom: '5px', padding: '0', textAlign: 'left' }}>
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
            </ul>
          </div>
        )}
        <textarea id="generalObservations" value={generalObservations} onChange={(e) => setGeneralObservations(e.target.value)} rows={4} placeholder="Describe aquí el motivo de la consulta..." />
      </div>
      
      <div>
        <input type="checkbox" id="observationsConfirmed" checked={observationsConfirmed} onChange={(e) => setObservationsConfirmed(e.target.checked)} />
        <label htmlFor="observationsConfirmed">He verificado y confirmo la información introducida</label>
      </div>

      <button type="submit">Obtener Diagnóstico</button>
    </form>
  );
};

export default DiagnosisForm;
