import './App.css';
import SelectTemplate from './components/SelectTemplate'
import NavBar from './components/NavBar';
import { ReportFindingsProvider } from './contexts/ReportFindingsContext';

function App() {

  return (
    <div className="App">
      <NavBar />
      <ReportFindingsProvider>
              <SelectTemplate />
      </ReportFindingsProvider>
    </div>
  );
}

export default App;
