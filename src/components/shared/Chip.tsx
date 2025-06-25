import { type FC } from "react";

interface ChipProps {
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  title: string;
}

const Chip: FC<ChipProps> = ({ bgColor, borderColor, textColor, title }) => {
  const defaultBgColor = "bg-gray-200";
  const defaultColor = "text-gray-600";
  const defaultBorderColor = "border-gray-300";

  return (
    <div
      className={`py-2 px-5 ${bgColor ?? defaultBgColor} border ${
        borderColor ?? defaultBorderColor
      } rounded-full`}
    >
      <p className={`text-xs ${textColor ?? defaultColor} font-bold`}>
        {title}
      </p>
    </div>
  );
};

export default Chip;
