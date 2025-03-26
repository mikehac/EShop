import { useEffect, useState } from "react";
import { CategoryItem } from "./categoryItem";
import { httpGet } from "../utils/service";
import { Category } from "../types/category";
import { Product } from "../types/product";
import { ProductItem } from "./productItem";
export function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productDeals, setProductDeals] = useState<Product[]>([]);
  useEffect(() => {
    httpGet("category").then((result) => {
      setCategories(result);
    });
  }, []);

  useEffect(() => {
    // const randomNumbers = getRandomIntegers(3, 1, 100);
    const randomNumbers = [1, 15, 55];
    Promise.all(
      randomNumbers.map((randomId) => {
        httpGet("product", String(randomId)).then((result) => {
          setProductDeals((prev) => [...prev, result]);
        });
      })
    );
  }, []);

  const getRandomIntegers = (count: number, min: number, max: number): number[] => {
    const randomIntegers = [];
    for (let i = 0; i < count; i++) {
      const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
      randomIntegers.push(randomInt);
    }
    return randomIntegers;
  };
  return (
    <>
      <header className="searchBar">
        <input className="searchTxt" type="text" placeholder="Search..." />
      </header>
      <h2>Today's deal</h2>
      <section className="deal">
        <div>{productDeals?.length > 0 && <ProductItem product={productDeals[0]} />}</div>
        <div>{productDeals?.length > 0 && <ProductItem product={productDeals[1]} />}</div>
        <div>{productDeals?.length > 0 && <ProductItem product={productDeals[2]} />}</div>
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
