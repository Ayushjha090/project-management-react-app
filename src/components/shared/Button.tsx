import type { FC, ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      type="button"
      className={`group w-full md:w-auto h-12 px-6 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg hover:-translate-y-2 transition-transform duration-400 cursor-pointer shadow-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
