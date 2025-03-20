import { useAuth } from "../hooks/useAuth";
import { Category } from "../types/category";
import { CategoryItem } from "./categoryItem";
const categories: Category[] = [
  {
    id: 1,
    name: "Consumer Electronics",
    imageUrl: "https://ae01.alicdn.com/kf/S1509b6cd14fd472f86fc4dabc310985eg.png",
  },
  {
    id: 2,
    name: "Home Improvement & Lights",
    imageUrl: "https://ae01.alicdn.com/kf/S608363f8a6b34a858ee02f2a0a3cfc51j.png",
  },
  {
    id: 3,
    name: "Jewelry & Watches",
    imageUrl: "https://ae01.alicdn.com/kf/Sd99fa45b0c1c47e69f64f10e43157b09W.png",
  },
  {
    id: 4,
    name: "Toys & Games",
    imageUrl: "https://ae01.alicdn.com/kf/S959a6b38b9c047198e0a72357be91135x.png",
  },
  {
    id: 5,
    name: "Fashion & Apparel",
    imageUrl: "https://images.unsplash.com/photo-1561053720-76cd73ff22c3",
  },
  {
    id: 6,
    name: "Beauty & Health",
    imageUrl: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd",
  },
  {
    id: 7,
    name: "Automobiles & Motorcycles",
    imageUrl: "https://plus.unsplash.com/premium_photo-1698263800117-4f03881269d1",
  },
  {
    id: 8,
    name: "Sports & Outdoors",
    imageUrl: "https://images.unsplash.com/photo-1610839563044-8996a168a961",
  },
  {
    id: 9,
    name: "Computers & Office",
    imageUrl: "https://images.unsplash.com/photo-1535957998253-26ae1ef29506?fm=jpg",
  },
  {
    id: 10,
    name: "Home & Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d",
  },
];

export function ProductsPage() {
  // const { isAuthenticated, loading } = useAuth();
  return (
    <>
      <p>Products Page</p>
      <input className="searchTxt" type="text" placeholder="Search..." />
      <div className="categories">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </>
  );
}
