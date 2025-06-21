import type { FC, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card: FC<CardProps> = ({ children }) => {
  return (
    <div className="w-112 p-5 rounded-lg hover:shadow-lg bg-white border border-gray-200 transition-shadow duration-200 ease-in-out">
      {children}
    </div>
  );
};

export default Card;
