import { Link } from "react-router-dom";
import { Category } from "../types/category";
export function CategoryItem({ category }: { category: Category }) {
  return (
    <div className="categoryItem">
      <Link to={`/category/${category.id}`}>
        <img src={category.imageUrl} alt={category.name} />
        <p>{category.name}</p>
      </Link>
    </div>
  );
}
