'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient';
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
  onClick,
}) => {
  const variants = {
    default: 'bg-dark-900/50 backdrop-blur-md border border-dark-700/50',
    glass: 'bg-white/5 backdrop-blur-lg border border-white/10',
    gradient: 'bg-gradient-to-br from-dark-900/50 to-dark-800/50 border border-dark-700/50',
  };

  const hoverStyles = hover
    ? 'hover:border-primary-500/50 hover:shadow-glow cursor-pointer'
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -4 } : {}}
      className={`rounded-xl p-6 transition-all duration-300 ${variants[variant]} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;

// Made with Bob
