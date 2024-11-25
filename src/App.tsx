import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

export function App() {
  /*
  Initialer Wert für den State, der mit useState verwaltet wird
  => Array Destructuring
  */
  const [data, setData] = useState([]);

  useEffect(() => {
    // useEffect wird aufgerufen, wenn die Abhängigkeiten sich ändern.
    // Da das Abhängigkeitsarray leer ist, wird es nur einmal beim Laden der Komponente ausgeführt.
    axios
      .get("http://localhost:3000/buch")
      // Sendet einen GET-Request an die angegebene URL und speichert die Antwort in der Variable response
      .then((response) => setData(response.data));
    // Setzt den State 'data' mit den erhaltenen Daten
  }, []);

  return (
    <div>
      <div>
        {/* Die Daten werden als JSON-String im div-Element angezeigt */}
        {JSON.stringify(data)}
      </div>
      {/*display Vite logo*/}
      <img src="/vite.svg" alt="Vite logo" className="Vite-logo-class" />
    </div>
  );
}
