import { useState } from 'react';
import './App.css';

// Futuros componentes
import DiagnosisForm from './components/DiagnosisForm';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
  // Estado para guardar el resultado del diagnóstico
  const [diagnosis, setDiagnosis] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>DiagnoDent</h1>
        <p>Asistente para el Diagnóstico Dental Basado en Evidencia</p>
      </header>
      <main>
        {/* Aquí irá el formulario de diagnóstico */}
        <DiagnosisForm setDiagnosis={setDiagnosis} />
        
        {/* Aquí se mostrarán los resultados */}
        <ResultsDisplay diagnosis={diagnosis} />
      </main>
    </div>
  );
}

export default App;