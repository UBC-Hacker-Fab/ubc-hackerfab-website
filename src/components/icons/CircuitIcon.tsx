// CircuitIcon.tsx
import React from "react";

interface CircuitIconProps {
  className?: string;
  /** Override the default 24×24 size if you need to */
  width?: number;
  height?: number;
}

export const CircuitIcon: React.FC<CircuitIconProps> = ({
  className = "",
  width = 24,
  height = 24,
}) => (
  <img
    src="/images/vanhf-logo.png"   // adjust to your file location
    alt="logo"
    width={width}
    height={height}
    className={className}
    loading="lazy"
  />
);
