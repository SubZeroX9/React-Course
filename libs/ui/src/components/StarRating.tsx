interface StarRatingProps {
  rating: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const fillPercentage = Math.min(Math.max(rating - star + 1, 0), 1) * 100;
        return (
          <svg
            key={star}
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`star-gradient-${star}-${rating}`}>
                <stop offset={`${fillPercentage}%`} stopColor="#fbbf24" />
                <stop offset={`${fillPercentage}%`} stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={`url(#star-gradient-${star}-${rating})`}
              stroke="#fbbf24"
              strokeWidth="1"
            />
          </svg>
        );
      })}
      <span className="text-xs text-gray-600 ml-1">({rating.toFixed(1)})</span>
    </div>
  );
};
