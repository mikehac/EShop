import { useEffect, useState } from "react";
import { httpGet } from "../utils/service";
import { useParams } from "react-router-dom";
import { Rating } from "../types/rating";
import { ProductSingleRating } from "./productSingleRating";

export function ProductRating() {
  const { id } = useParams<{ id: string }>();
  const [ratings, setRattings] = useState<Rating[]>([]);
  useEffect(() => {
    httpGet("product-rating", id).then((res) => {
      console.log(res);
      setRattings(res);
    });
  }, []);

  if (ratings.length == 0) return <div>No ratings was given yet</div>;
  return ratings.length > 0 && ratings.map((rating) => <ProductSingleRating {...rating} />);
}
