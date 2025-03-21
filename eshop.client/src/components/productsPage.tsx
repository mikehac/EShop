import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { CategoryItem } from "./categoryItem";
import { fetchCategories } from "../utils/service";

export function ProductsPage() {
  // const { isAuthenticated, loading } = useAuth();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories().then((result) => {
      setCategories(result);
    });
  }, []);
  return (
    <>
      <header className="searchBar">
        <input className="searchTxt" type="text" placeholder="Search..." />
      </header>
      <h2>Today's deal</h2>
      <section className="deal">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </section>
      <h2>Shop by Categories</h2>
      <div className="categories">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </>
  );
}
