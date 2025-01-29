import { motion } from 'framer-motion';

export function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 transition-opacity"
          >
            Namzer
          </motion.a>
        </div>
      </div>
    </nav>
  );
}