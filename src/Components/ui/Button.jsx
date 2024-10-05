import React from 'react';

const Button = ({ children, variant = "default", size = "md", className, asChild, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors duration-300";
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    ghost: "text-gray-600 hover:bg-gray-100",
    sizeClasses: {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
      icon: "p-2"
    }
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${variantClasses.sizeClasses[size]} ${className}`;

  return asChild ? (
    <span className={classes} {...props}>
      {children}
    </span>
  ) : (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
