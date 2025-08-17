import { useState } from 'react';
import './App.css';
import DiagnosisForm from './components/DiagnosisForm';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
  const [diagnosis, setDiagnosis] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>DiagnoDent</h1>
        <p>Asistente para el Diagnóstico Dental Basado en Evidencia</p>
      </header>
      <main>
        <DiagnosisForm setDiagnosis={setDiagnosis} />
        <ResultsDisplay diagnosis={diagnosis} />
      </main>
    </div>
  );
}

export default App;