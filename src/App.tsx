import { EllepsisText } from "./EllepsisText/EllepsisText";
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

  return (
    <EllepsisText>
      <p style={{color: 'red'}}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </EllepsisText>
  );
}

export default App;
