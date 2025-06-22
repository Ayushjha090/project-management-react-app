import { type FC } from "react";

interface ErrorProps {
  message: string;
  className?: string;
}

const Error: FC<ErrorProps> = ({ message, className }) => {
  return (
    <div className={`w-full bg-transparent ${className}`}>
      <p className="text-md text-red-500">{message}</p>
    </div>
  );
};

export default Error;
