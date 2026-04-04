import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import ItemCard from '@/components/ItemCard';

const LostItems = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/items?status=lost`);
        setItems(res.data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase()) || i.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display font-semibold text-3xl text-foreground mb-2">Lost Items</h1>
        <p className="text-muted-foreground mb-8">Browse items that have been reported as lost.</p>
        <SearchBar value={search} onChange={setSearch} placeholder="Search lost items..." />
        {loading ? (
          <p className="text-center text-muted-foreground mt-16">Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10">
              {filteredItems.map((item, i) => (
                <ItemCard key={item._id || item.id} item={item} index={i} />
              ))}
            </div>
            {filteredItems.length === 0 && (
              <p className="text-center text-muted-foreground mt-16">No items found matching your search.</p>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LostItems;
