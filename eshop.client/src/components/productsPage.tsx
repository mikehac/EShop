import { useEffect, useState } from "react";
import { CategoryItem } from "./categoryItem";
import { httpGet } from "../utils/service";
import { Category } from "../types/category";
import { Product } from "../types/product";
import { ProductItem } from "./productItem";
export function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productDeals, setProductDeals] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  useEffect(() => {
    httpGet("category").then((result) => {
      setCategories(result);
    });
  }, []);

  useEffect(() => {
    // const randomNumbers = getRandomIntegers(3, 1, 100);
    getTodaysDeals();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    if (searchTerm.length > 0) {
      setIsSearching(true);
      httpGet("product", "", searchTerm).then((result) => {
        setProductDeals(result);
      });
    } else if (searchTerm.length === 0) {
      setIsSearching(false);
      getTodaysDeals();
    } else {
      setIsSearching(false);
    }
  };

  const getTodaysDeals = () => {
    const randomNumbers = [1, 15, 55];
    setProductDeals([]);
    Promise.all(
      randomNumbers.map((randomId) => {
        httpGet("product", String(randomId)).then((result) => {
          setProductDeals((prev) => [...prev, result]);
        });
      })
    );
  };

  return (
    <>
      <header className="searchBar">
        <input className="searchTxt" type="text" placeholder="Search..." onChange={handleSearch} />
      </header>
      {isSearching && (
        <div>
          <h2>Search results</h2>
          <section className="deal">
            {productDeals?.length > 0 &&
              productDeals.map((product) => (
                <div key={product.id}>
                  <ProductItem product={product} />
                </div>
              ))}
          </section>
        </div>
      )}
      {!isSearching && productDeals?.length === 0 && (
        <div>
          <h2>Today's deal</h2>
          <section className="deal">
            <p>No deals available</p>
          </section>
        </div>
      )}
      {/* Show categories and today's deal only if not searching */}
      {!isSearching && (
        <div>
          <h2>Today's deal</h2>
          <section className="deal">
            {productDeals?.length > 0 &&
              productDeals.map((product) => (
                <div key={product.id}>
                  <ProductItem product={product} />
                </div>
              ))}
          </section>
          <h2>Shop by Categories</h2>
          <div className="categories">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
