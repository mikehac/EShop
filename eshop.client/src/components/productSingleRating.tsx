import { Rating } from "../types/rating";
import { Star } from "./star";

export function ProductSingleRating(rating: Rating) {
  return (
    <section>
      <div className="rate-header">
        <div>
          <img className="userImg" src="/src/assets/userph.jpg" alt={rating.userName} />
        </div>
        <div className="user-response">
          <Star rating={rating.ratingValue} />
          <span>{rating.ratingDescription} </span>
        </div>
      </div>
    </section>
  );
}
