import './App.css';
import PomodoroGrid from './components/PomodoroGrid';
import SaveButton from './components/SaveButton';
import MainTask from './components/MainTask'
import PomodoroProvider from './context/PomodoroContext'

function App() {
  return (
    <>
      <PomodoroProvider>
        <MainTask />
        <PomodoroGrid />
        <SaveButton />
      </PomodoroProvider>
    </>
  );
}

export default App;
