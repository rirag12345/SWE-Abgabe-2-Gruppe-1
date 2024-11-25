import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data] = useState([])
  useEffect(() => {
    const fetchBook = async () => {
        const results = await axios.get("https://localhost:3000/rest")
        console.log(results)
      };

    void fetchBook();
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
