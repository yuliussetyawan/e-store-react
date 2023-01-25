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
    <>
      <header>My Store</header>
      <section>
        <nav>
          {result.map((d) => (
            <div key={d.id}>{d.title}</div>
          ))}
        </nav>
        <article>main</article>
      </section>
      <footer>footer</footer>
    </>
  );
}

export default App;
