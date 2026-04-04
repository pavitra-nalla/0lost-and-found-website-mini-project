import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ArrowRight, Search as SearchIcon, Upload, CheckCircle, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import ItemCard from '@/components/ItemCard';
import { categories } from '@/data/mockData';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const Index = () => {
  const [search, setSearch] = useState('');
  const [lostItems, setLostItems] = useState<any[]>([]);
  const [foundItems, setFoundItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const [lostRes, foundRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/items?status=lost`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/items?status=found`),
        ]);
        setLostItems(lostRes.data.items.slice(0, 4));
        setFoundItems(foundRes.data.items.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
        {/* Animated Blobs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-aura-peach/15 blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-aura-lavender/15 blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-aura-coral/[0.06] blur-[100px] pointer-events-none"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="text-center max-w-3xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-soft border border-aura-peach/10 mb-8"
            >
              <Sparkles className="w-4 h-4 text-aura-coral" />
              <span className="text-xs font-semibold text-foreground tracking-wide">Trusted by 10,000+ users</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="font-display font-bold text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] tracking-tight text-foreground leading-[1.1] mb-7"
            >
              Find Your Lost Items
              <br />
              <span className="text-gradient">Easily & Safely</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-12 max-w-lg mx-auto"
            >
              A modern platform to report and discover lost & found items. Reunite with your belongings in just a few clicks.
            </motion.p>

            <SearchBar value={search} onChange={setSearch} />

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
            >
              <Link
                to="/report?type=lost"
                className="group px-8 py-4 rounded-2xl gradient-action text-card font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-aura-peach/25 active:scale-[0.97] flex items-center gap-2.5"
              >
                Report Lost Item
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/report?type=found"
                className="group px-8 py-4 rounded-2xl bg-card shadow-soft border border-aura-peach/10 text-foreground font-semibold text-sm transition-all duration-300 hover:shadow-hover hover:-translate-y-0.5 active:scale-[0.97] flex items-center gap-2.5"
              >
                Report Found Item
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-8 sm:gap-12 mt-16"
            >
              {[
                { value: '2.4K+', label: 'Items Returned' },
                { value: '10K+', label: 'Active Users' },
                { value: '98%', label: 'Success Rate' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display font-bold text-xl sm:text-2xl text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold text-aura-coral uppercase tracking-widest mb-3">Categories</p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              Browse by Category
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.name} {...cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Lost Items */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="text-xs font-semibold text-aura-coral uppercase tracking-widest mb-3">Lost Items</p>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
                Recently Lost
              </h2>
            </div>
            <Link to="/lost" className="group text-sm font-semibold text-aura-coral hover:text-aura-coral/80 transition-colors flex items-center gap-1.5">
              View all <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lostItems.map((item, i) => (
              <ItemCard key={String(item?.id || item?._id || i)} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Found Items */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="text-xs font-semibold text-accent-foreground uppercase tracking-widest mb-3">Found Items</p>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
                Recently Found
              </h2>
            </div>
            <Link to="/found" className="group text-sm font-semibold text-accent-foreground hover:text-accent-foreground/80 transition-colors flex items-center gap-1.5">
              View all <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {foundItems.map((item, i) => (
              <ItemCard key={String(item?.id || item?._id || i)} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-aura-peach/[0.03] via-aura-lavender/[0.04] to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold text-aura-coral uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              How It Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: SearchIcon, title: 'Search', desc: 'Browse through reported lost and found items in your area with powerful filters.', step: '01' },
              { icon: Upload, title: 'Report', desc: 'Submit a detailed report with photos, location, and description of the item.', step: '02' },
              { icon: CheckCircle, title: 'Reunite', desc: 'Connect with the owner securely and return the item safely and happily.', step: '03' },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center group"
              >
                {/* Step Number */}
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[80px] font-display font-bold text-aura-peach/[0.07] leading-none select-none pointer-events-none">
                  {step.step}
                </span>

                <div className="relative">
                  <div className="w-[72px] h-[72px] rounded-2xl gradient-brand mx-auto mb-6 flex items-center justify-center shadow-lg shadow-aura-peach/15 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <step.icon className="w-7 h-7 text-card" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px] mx-auto">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[28px] gradient-brand p-10 sm:p-16 text-center"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-card/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-card/10 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-card mb-4">
                Lost something? We can help.
              </h2>
              <p className="text-card/80 text-base sm:text-lg mb-10 max-w-lg mx-auto">
                Join thousands of people who have been reunited with their belongings through FindIt.
              </p>
              <Link
                to="/report"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-card text-foreground font-semibold text-sm rounded-2xl transition-all duration-300 hover:shadow-xl active:scale-[0.97]"
              >
                Get Started Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
