import React from "react";
// Shad cn Function
import { cn } from "@/lib/utils";

// Separator Props
import { DottedSeparatorProps } from "@/interfaces/global/separator-props";

export const DottedSeparator = ({
  className,
  color = "#d4d4d8",
  height = "1px",
  dotSize = "2px",
  gapSize = "2px",
  direction = "horizontal",
}: DottedSeparatorProps) => {
  const isHorizontal = direction === "horizontal";

  const dotSizeNum = parseInt(dotSize);
  const gapSizeNum = parseInt(gapSize);

  return (
    <div
      className={cn(
        isHorizontal
          ? "w-full flex items-center"
          : "h-full flex flex-col items-center",
        className
      )}
    >
      <div
        className={isHorizontal ? "flex-grow" : "flex-grow-0"}
        style={{
          width: isHorizontal ? "100%" : height,
          height: isHorizontal ? height : "100%",
          backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%)`,
          backgroundSize: isHorizontal
            ? `${dotSizeNum + gapSizeNum}px ${height}`
            : `${height} ${dotSizeNum + gapSizeNum}px`,
          backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};
