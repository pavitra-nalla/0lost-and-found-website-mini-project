import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Search for lost items...' }: SearchBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-brand-gradient rounded-[22px] opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300" />
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 transition-colors duration-200 group-focus-within:text-aura-coral" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-[60px] pl-[52px] pr-6 bg-card rounded-[20px] shadow-soft border border-aura-peach/[0.08] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-[3px] focus:ring-aura-lavender/15 focus:border-aura-lavender/30 transition-all duration-300 text-[15px]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBar;
