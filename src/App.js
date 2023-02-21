// json-server --watch src/db/db.json --port 3001

import "./App.css";
import React, { useState } from "react";
import Category from "./components/Category";
import { getCategories, getProducts } from "./fetcher";
import CategoryProduct from "./components/categoryProduct";

function App() {
  const [categories, setCategories] = useState([
    { errorMessage: " ", data: [] },
  ]);
  const [products, setProducts] = useState([{ errorMessage: " ", data: [] }]);

  React.useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getCategories();
      setCategories(responseObject);
    };
    fetchData();
  }, []);

  const handleCategoryClick = (id) => {
    const fetchData = async () => {
      const responseObject = await getProducts(id);
      setProducts(responseObject);
    };
    fetchData();
  };

  const renderCategories = () => {
    return categories.data.map((c) => (
      <Category
        key={c.id}
        id={c.id}
        title={c.title}
        onCategoryClick={() => handleCategoryClick(c.id)}
      />
    ));
  };

  const renderProducts = () => {
    // https://stackoverflow.com/questions/69080597/%C3%97-typeerror-cannot-read-properties-of-undefined-reading-map
    return products.data?.map((p) => (
      <CategoryProduct {...p}>{p.title} </CategoryProduct>
    ));
  };

  return (
    <>
      <header>My Store</header>
      <section>
        <nav>
          {categories.errorMessage && (
            <div>Error: {categories.errorMessage}</div>
          )}
          {categories.data && renderCategories()}
        </nav>
        <main>
          {products.errorMessage && <div>Error: {products.errorMessage}</div>}
          <h1>Products</h1>
          {products && renderProducts()}
        </main>
      </section>
      <footer>footer</footer>
    </>
  );
}

export default App;
