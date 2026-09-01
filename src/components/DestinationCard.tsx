import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DestinationCardProps {
  id: string;
  name: string;
  country: string;
  tagline: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  bestFor: string[];
  featured?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  id, name, country, tagline, image, price, rating, reviews, bestFor, featured, size = 'medium'
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/traveler/plan?destination=${id}`);
  };

  const heightClass = size === 'large' ? 'h-80' : size === 'small' ? 'h-48' : 'h-64';

  return (
    <div
      onClick={handleClick}
      className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className={`${heightClass} overflow-hidden relative`}>
        <img
          src={image}
          alt={name}
          className="destination-image"
          onError={(e) => {
            const t = e.target as HTMLImageElement;
            t.style.display = 'none';
            t.parentElement!.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 left-3 bg-brand-red text-white px-2.5 py-1 rounded-full text-xs font-bold">
            Featured
          </div>
        )}
        
        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold text-gray-800">{rating}</span>
        </div>

        {/* Content over image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex flex-wrap gap-1 mb-2">
            {bestFor.slice(0, 2).map(tag => (
              <span key={tag} className="bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-white font-bold text-lg leading-tight">{name}</h3>
          <p className="text-white/80 text-xs">{country}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-brand-red font-bold text-base">₹{price.toLocaleString('en-IN')}</div>
          <div className="text-gray-400 text-xs">per person · {reviews.toLocaleString()} reviews</div>
        </div>
        <button className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center group-hover:bg-brand-red transition-colors duration-200">
          <ArrowRight size={14} className="text-brand-red group-hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default DestinationCard;
