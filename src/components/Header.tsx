import { motion } from 'framer-motion';

export function Header() {
  return (
    <header className="w-full py-20 relative z-0">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary mb-6">
            AI Name Generator
          </h1>
          <p className="text-xl md:text-2xl text-brand-beige max-w-2xl mx-auto font-light">
            Generate unique, creative names for your brand, business, or character in seconds using advanced AI
          </p>
        </motion.div>
      </div>
    </header>
  );
}