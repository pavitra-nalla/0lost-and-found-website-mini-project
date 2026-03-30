import { Link } from 'react-router-dom';
import { Search, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-aura-peach/10 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
                <Search className="w-4 h-4 text-card" />
              </div>
              <span className="font-display font-bold text-lg text-foreground tracking-tight">FindIt</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Helping people reunite with their lost belongings. A modern platform built with care.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-5 text-sm">Platform</h4>
            <ul className="space-y-3">
              {[
                { label: 'Lost Items', path: '/lost' },
                { label: 'Found Items', path: '/found' },
                { label: 'Report Item', path: '/report' },
                { label: 'Dashboard', path: '/dashboard' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-5 text-sm">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-5 text-sm">Get in Touch</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Have questions? We'd love to help you find what you're looking for.
            </p>
            <a
              href="mailto:hello@findit.app"
              className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-2xl gradient-brand text-card transition-all duration-300 hover:shadow-lg hover:shadow-aura-peach/20 active:scale-[0.97]"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-aura-peach/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 FindIt. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-aura-coral fill-aura-coral" /> for lost things
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
