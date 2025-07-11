interface StarProps {
  rating?: number;
  maxRating?: number;
  size?: number;
  color?: string;
  activeColor?: string;
  className?: string;
  isClickable?: boolean;
  onRatingChange?: (newRating: number) => void;
}

export function Star({
  rating = 0,
  maxRating = 5,
  size = 24,
  color = "#d1d1d1",
  activeColor = "#ffc107",
  className = "",
  isClickable = false,
  onRatingChange,
}: StarProps = {}) {
  const handleStarClick = (value: number) => {
    if (isClickable && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className={`star-rating ${className}`}>
      {Array.from({ length: maxRating }, (_, index) => index + 1).map((value) => {
        const isActive = value <= rating;
        return (
          <svg
            key={value}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={isActive ? activeColor : color}
            stroke={isActive ? activeColor : color}
            strokeWidth="0"
            className={`star-icon ${isActive ? "active" : "inactive"} ${isClickable ? "clickable" : ""}`}
            style={{
              marginRight: "2px",
              cursor: isClickable ? "pointer" : "default",
            }}
            onClick={() => handleStarClick(value)}
            role={isClickable ? "button" : undefined}
            aria-label={isClickable ? `Rate ${value} of ${maxRating}` : undefined}
          >
            <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.4 7.4-6-4.6-6 4.6 2.4-7.4-6-4.6h7.6z" />
          </svg>
        );
      })}
    </div>
  );
}
