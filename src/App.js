// json-server --watch src/db/db.json --port 3001

import "./App.css";
import React, { useState } from "react";
import Category from "./components/Category";
import { fetcher } from "./fetcher";

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    const fetchData = async() => {
      const data = await fetcher("/categories");
      setCategories(data);
    };
    fetchData();
    
  }, []);

  const handleCategoryClick = (id) => {
    fetch("http://localhost:3001/products?catId=" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  };

  const renderCategories = () => {
    return categories.map((c) => (
      <Category
        key={c.id}
        id={c.id}
        title={c.title}
        onCategoryClick={() => handleCategoryClick(c.id)}
      />
    ));
  };

  const renderProducts = () => {
    return products.map((p) => <div>{p.title}</div>);
  };

  return (
    <>
      <header>My Store</header>
      <section>
        <nav>{categories && renderCategories()}</nav>
        <article>
          <h1>Products</h1>
          {products && renderProducts()}
        </article>
      </section>
      <footer>footer</footer>
    </>
  );
}

export default App;
