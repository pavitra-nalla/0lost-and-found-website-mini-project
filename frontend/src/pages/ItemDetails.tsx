import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowLeft, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const ItemDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Claim Modal State
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/items/${id}`);
        setItem(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return toast.error("Please provide a message");

    setClaiming(true);
    try {
      await axios.post('http://localhost:5000/api/claims', {
        item: id,
        message,
      });
      toast.success("Claim submitted successfully!");
      setShowModal(false);
      setMessage('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit claim.");
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading item details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display font-semibold text-2xl text-foreground mb-2">Item Not Found</h1>
            <p className="text-muted-foreground mb-6">The item you're looking for doesn't exist.</p>
            <Link to="/" className="px-6 py-3 rounded-2xl gradient-action text-card font-medium text-sm">
              Go Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to items
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden shadow-soft"
          >
            <img src={item.image} alt={item.title} className="w-full h-full object-cover aspect-[4/3] bg-card" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <span
              className={`self-start px-3 py-1.5 text-xs font-medium rounded-xl mb-4 ${
                item.status === 'lost'
                  ? 'bg-aura-peach/20 text-aura-coral'
                  : 'bg-aura-lavender/20 text-accent-foreground'
              }`}
            >
              {item.status}
            </span>

            <h1 className="font-display font-semibold text-3xl text-foreground mb-4">{item.title}</h1>

            <p className="text-muted-foreground leading-relaxed mb-8">{item.description}</p>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-aura-peach/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-aura-peach" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">{item.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-aura-lavender/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-aura-lavender" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {user && user._id !== item.user?._id ? (
              <button
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl gradient-action text-white font-medium text-sm transition-all duration-200 hover:saturate-[1.1] active:scale-95 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                This is mine
              </button>
            ) : !user ? (
              <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-card border border-aura-peach/20 text-foreground font-medium text-sm transition-all duration-200 text-center block">
                Login to claim this item
              </Link>
            ) : (
               <p className="text-sm text-muted-foreground italic flex items-center gap-2">
                 <AlertCircle className="w-4 h-4" /> You posted this item.
               </p>
            )}
          </motion.div>
        </div>

        {/* Claim Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-card w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-xl border border-border"
              >
                <h2 className="text-2xl font-semibold mb-2">Claim Item</h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Please provide proof of ownership or describe the item to help the finder verify your claim.
                </p>
                
                <form onSubmit={handleClaim}>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="E.g. It has a scratch on the left side..."
                    className="w-full px-4 py-3.5 bg-background rounded-2xl shadow-soft text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-[3px] focus:ring-aura-lavender/20 transition-all duration-200 text-sm min-h-[120px] mb-6 resize-none border border-border"
                    required
                  />
                  
                  <div className="flex justify-end gap-3 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-6 py-3 rounded-xl font-medium text-sm hover:bg-muted text-muted-foreground transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={claiming}
                      className="px-6 py-3 rounded-xl gradient-action text-white font-medium text-sm shadow-sm opacity-90 hover:opacity-100 transition-opacity"
                    >
                      {claiming ? "Submitting..." : "Submit Claim"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      <Footer />
    </div>
  );
};

export default ItemDetails;
