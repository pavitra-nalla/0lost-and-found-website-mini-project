import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      login(res.data);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to login');
    }

    setLoading(false);
  };

  const inputClasses =
    "w-full px-4 py-3.5 bg-card rounded-2xl shadow-soft text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-[3px] focus:ring-aura-lavender/20 transition-all duration-200 text-sm";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex-1 flex items-center justify-center container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-semibold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to report or claim items.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card p-8 rounded-[2rem] shadow-soft space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClasses}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl gradient-action text-white font-medium block mt-6"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-aura-lavender hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
