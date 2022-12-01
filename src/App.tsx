import { ProgressBarContainer } from "./ProgressBar";
import "./App.css";

function App() {
  //const [test, setTest] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (test < 100) {
  //       console.log('set');
        
  //       setTest((test) => test + 10);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return <ProgressBarContainer percentage={30} />;
}

export default App;
