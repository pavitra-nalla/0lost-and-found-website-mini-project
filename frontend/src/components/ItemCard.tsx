import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Item } from '@/data/mockData';

interface ItemCardProps {
  item: any;
  index?: number;
}

const ItemCard = ({ item, index = 0 }: ItemCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link to={`/item/${item._id || item.id}`} className="block group">
        <div className="bg-card rounded-[20px] shadow-soft overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-hover hover:-translate-y-[6px] border border-aura-peach/[0.06]">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.06]"
              loading="lazy"
            />
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Badge */}
            <div className="absolute top-3 right-3">
              <span
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl backdrop-blur-md ${
                  (item.type === 'lost' || item.status === 'lost')
                    ? 'bg-aura-coral/90 text-card'
                    : 'bg-aura-lavender/90 text-card'
                }`}
              >
                {(item.type === 'lost' || item.status === 'lost') ? 'Lost' : 'Found'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-display font-semibold text-foreground text-[15px] mb-3 group-hover:text-aura-coral transition-colors duration-200">
              {item.title}
            </h3>
            <div className="flex items-center gap-4 text-[13px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-aura-peach" />
                {item.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-aura-lavender" />
                {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ItemCard;
