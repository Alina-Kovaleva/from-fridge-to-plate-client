import React from "react";
import "./style.css";

const DEFAULT_COLOR = "#ffffff";
const DEFAULT_MUTED = "#f1f3f5";
const DEFAULT_MAX = 3;
const DEFAULT_LABELS = ["Easy", "Moderate", "Challenging"];

function ChefHat({ filled, size, color, mutedColor }) {
  const fillColor = filled ? color : mutedColor;

  return (
    <svg
      className="difficulty-indicator__hat"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="presentation"
      aria-hidden
    >
      <path
        d="M32 8c-5.2 0-9.9 3-11.9 7.4-1.9-.9-4-1.4-6.2-1.4C8.6 14 4 18.6 4 24.1c0 4.5 3.1 8.3 7.3 9.3-.1.8-.1 1.7-.1 2.6 0 3.4.7 6.6 1.8 9.6h-1.6C9.8 45.6 9 46.5 9 47.7v6.1C9 55 10 56 11.3 56h41.4c1.3 0 2.3-1 2.3-2.3v-6.1c0-1.2-.9-2.1-2.1-2.1h-1.6c1.1-3 1.8-6.2 1.8-9.6 0-.9 0-1.7-.1-2.6 4.2-1 7.3-4.9 7.3-9.3 0-5.6-4.6-10.1-10.1-10.1-2.2 0-4.3.7-6.2 1.9C41.9 11 37.2 8 32 8z"
        fill="#f8f9fa"
        stroke={fillColor}
        strokeWidth="3"
      />
      <path
        d="M16.5 42.7h31c-.7 1.8-1.6 3.4-2.6 4.9H19c-1-1.5-1.9-3.1-2.6-4.9z"
        fill={fillColor}
        stroke={fillColor}
        strokeWidth="1.5"
        opacity="0.9"
      />
      <rect x="21" y="48.5" width="22" height="3" fill={fillColor} />
    </svg>
  );
}

export default function DifficultyIndicator({
  value = 0,
  max = DEFAULT_MAX,
  size = 30,
  color = DEFAULT_COLOR,
  mutedColor = DEFAULT_MUTED,
  labels = DEFAULT_LABELS,
}) {
  const parsed = Number(value);
  const safeValue = Number.isNaN(parsed)
    ? 0
    : Math.max(0, Math.min(max, Math.round(parsed)));
  const labelText = labels[safeValue - 1] ?? `Level ${safeValue}`;

  return (
    <div
      className="difficulty-indicator"
      aria-label={`Difficulty level ${safeValue} of ${max}: ${labelText}`}
      title={`Difficulty: ${labelText}`}
    >
      <div className="difficulty-indicator__icons">
        {Array.from({ length: max }).map((_, index) => (
          <ChefHat
            key={index}
            filled={index < safeValue}
            size={size}
            color={color}
            mutedColor={mutedColor}
          />
        ))}
      </div>
    </div>
  );
}
