import { Rating } from "../types/rating";
import { Star } from "./star";

export function ProductSingleRating(rating: Rating) {
  function shortUsername(username: string) {
    const partUsername = username.slice(0, username.indexOf("@"));
    return partUsername[0] + partUsername.substring(1, partUsername.length - 1).replace(/./g, "*") + partUsername[partUsername.length - 1];
  }
  return (
    <section>
      <div className="rate-header">
        <div>
          <img className="userImg" src="/src/assets/userph.jpg" alt={rating.userName} />
        </div>
        <div className="user-response">
          <Star rating={rating.ratingValue} />
          <span>{rating.ratingDescription} </span>
          <div className="rating-date">
            {shortUsername(rating.userName)} &nbsp;|&nbsp;
            {new Date(rating.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
