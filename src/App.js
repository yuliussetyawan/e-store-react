// json-server --watch src/db/db.json --port 3001

import "./App.css";
import React, { useState } from "react";
import Category from "./components/Category";

function App() {
  const [results, setResults] = useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResults(data);
      });
  }, []);

  const renderCategories = () => {
    const categories = [];
    for (let i = 0; i < results.length; i++) {
      categories.push(
        <Category
          key={results[i].id}
          id={results[i].id}
          title={results[i].title}
        />
      );
    }
    return categories;
  };

  return (
    <>
      <header>My Store</header>
      <section>
        <nav>
          {results.map((d) => (
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
