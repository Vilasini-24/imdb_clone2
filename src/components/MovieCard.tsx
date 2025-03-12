import { Star } from "lucide-react";
import React, { useState, useEffect } from "react";

interface MovieCardProps {
  id: number;
  title: string;
  rating: number;
  image: string;
  year: number;
  genre: string[];
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, rating, image, year, genre }) => {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [averageRating, setAverageRating] = useState<number>(rating);

  // Load user rating from localStorage
  useEffect(() => {
    const storedRating = localStorage.getItem(`movie-${id}-rating`);
    if (storedRating) {
      setUserRating(JSON.parse(storedRating));
    }
  }, [id]);

  // Function to handle user rating
  const handleRating = (newRating: number) => {
    setUserRating(newRating);
    localStorage.setItem(`movie-${id}-rating`, JSON.stringify(newRating));

    // Simulate updating the average rating
    const newAverage = (rating + newRating) / 2; // Basic average calculation
    setAverageRating(newAverage);
  };

  return (
    <div className="bg-zinc-900/50 rounded-xl overflow-hidden movie-card-hover backdrop-blur-sm p-4">
      <div className="relative aspect-[2/3]">
        <img src={image} alt={title} className="w-full h-full object-cover hover-glow" />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg truncate text-glow">{title}</h3>
          <span className="text-zinc-400 text-sm">{year}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {genre.slice(0, 2).map((g) => (
            <span key={g} className="text-xs px-2 py-1 bg-zinc-800 rounded-full text-zinc-300">
              {g}
            </span>
          ))}
        </div>

        {/* Star Rating Component */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 cursor-pointer ${star <= (userRating || 0) ? "text-yellow-500 fill-current" : "text-gray-500"}`}
              onClick={() => handleRating(star)}
            />
          ))}
          <span className="text-yellow-500 font-medium">{averageRating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
