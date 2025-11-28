import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-md active:scale-95";
  
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/30 focus:ring-blue-300",
    secondary: "bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 shadow-gray-200/50 focus:ring-gray-200",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-red-500/30 focus:ring-red-300",
    success: "bg-green-500 hover:bg-green-600 text-white shadow-green-500/30 focus:ring-green-300",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-4 text-xl",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;