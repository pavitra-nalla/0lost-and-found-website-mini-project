import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Plus, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const statusStyles: Record<string, string> = {
  lost: 'bg-aura-peach/20 text-aura-coral',
  found: 'bg-aura-lavender/20 text-accent-foreground',
  returned: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'items' | 'claims'>('items');
  
  const [items, setItems] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [itemsRes, claimsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/items/my`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/claims`),
        ]);
        
        setItems(itemsRes.data);
        // User's claims made on other items
        setClaims(claimsRes.data.requestsMade.items);
      } catch (error: any) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleDeleteItem = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/items/${id}`);
      setItems(items.filter((i) => i._id !== id));
      toast.success('Item deleted successfully.');
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
           <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-semibold text-3xl text-foreground mb-1">My Dashboard</h1>
            <p className="text-muted-foreground">Manage your reported items and claims.</p>
          </div>
          <Link
            to="/report"
            className="px-5 py-2.5 rounded-2xl gradient-action text-card font-medium text-sm transition-all duration-200 hover:saturate-[1.1] active:scale-95 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Report
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-aura-peach/20 mb-8">
          <button
            onClick={() => setActiveTab('items')}
            className={`px-6 py-3 font-medium text-sm transition-all ${
              activeTab === 'items'
                ? 'border-b-2 border-aura-peach text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            My Items
          </button>
          <button
            onClick={() => setActiveTab('claims')}
            className={`px-6 py-3 font-medium text-sm transition-all ${
              activeTab === 'claims'
                ? 'border-b-2 border-aura-peach text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            My Claims
          </button>
        </div>

        {/* Items Tab */}
        {activeTab === 'items' && (
          <>
            {items.length === 0 ? (
              <div className="text-center py-20 bg-card/50 rounded-3xl border border-dashed border-aura-peach/30">
                <p className="text-muted-foreground mb-4">You haven't reported any items yet.</p>
                <Link to="/report" className="px-6 py-3 rounded-2xl gradient-brand text-card font-medium text-sm inline-block">
                  Report an Item
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {items.map((item, i) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="bg-card rounded-2xl shadow-soft overflow-hidden flex flex-col sm:flex-row"
                  >
                    <img src={item.image} alt={item.title} className="w-full sm:w-40 h-40 sm:h-auto object-cover shrink-0" />
                    <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-display font-medium text-foreground truncate">{item.title}</h3>
                          <span className={`shrink-0 px-2.5 py-1 text-xs font-medium rounded-xl capitalize ${statusStyles[item.status] || ''}`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.location} · {new Date(item.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <button className="px-3 py-1.5 rounded-xl bg-background text-foreground text-xs font-medium hover:bg-accent/30 transition-colors flex items-center gap-1">
                          <Pencil className="w-3 h-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item._id)}
                          className="px-3 py-1.5 rounded-xl bg-destructive/10 text-destructive text-xs font-medium hover:bg-destructive/20 transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Claims Tab */}
        {activeTab === 'claims' && (
          <>
            {claims.length === 0 ? (
              <div className="text-center py-20 bg-card/50 rounded-3xl border border-dashed border-aura-peach/30">
                <p className="text-muted-foreground mb-4">You haven't made any claims yet.</p>
                <Link to="/" className="px-6 py-3 rounded-2xl gradient-brand text-card font-medium text-sm inline-block">
                  Browse Items
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {claims.map((claim, i) => (
                  <motion.div
                    key={claim._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="bg-card p-5 rounded-2xl shadow-soft flex gap-5 items-center"
                  >
                    <img src={claim.item?.image} className="w-20 h-20 rounded-xl object-cover shrink-0" alt="Claimed item" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <Link to={`/item/${claim.item?._id}`} className="font-display font-medium text-foreground truncate hover:text-aura-lavender transition-colors">
                          {claim.item?.title}
                        </Link>
                        <span className={`shrink-0 px-2.5 py-1 text-xs font-medium rounded-xl capitalize ${statusStyles[claim.status] || ''}`}>
                          {claim.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mb-1 border-l-2 border-aura-peach/30 pl-2 italic">
                        "{claim.message}"
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Requested on {new Date(claim.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
