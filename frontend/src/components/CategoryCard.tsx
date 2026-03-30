import { motion } from 'framer-motion';
import { Smartphone, Wallet, Key, Briefcase, FileText } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Smartphone, Wallet, Key, Briefcase, FileText,
};

interface CategoryCardProps {
  name: string;
  icon: string;
  count: number;
  index?: number;
  onClick?: () => void;
}

const CategoryCard = ({ name, icon, count, index = 0, onClick }: CategoryCardProps) => {
  const Icon = iconMap[icon] || FileText;

  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex flex-col items-center gap-4 p-7 bg-card rounded-[20px] shadow-soft border border-aura-peach/[0.06] transition-all duration-300 hover:shadow-hover cursor-pointer group"
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-aura-peach/15 to-aura-lavender/10 flex items-center justify-center transition-all duration-300 group-hover:from-aura-peach/25 group-hover:to-aura-lavender/20 group-hover:scale-110">
        <Icon className="w-7 h-7 text-aura-coral transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="text-center">
        <p className="font-display font-semibold text-sm text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground mt-1">{count} items</p>
      </div>
    </motion.button>
  );
};

export default CategoryCard;
