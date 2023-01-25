// json-server --watch src/db/db.json --port 3001

import "./App.css";
import React, { useState } from "react";

function App() {
  const [result, setResult] = useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResult(data);
      });
  }, []);

  return (
    <div className="App">
      {result.map((d) => (
        <div key={d.id}>{d.title}</div>
      ))}
    </div>
  );
}

export default App;
