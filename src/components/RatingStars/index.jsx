import React from "react";
import "./style.css";

function buildStars(value, max) {
  const safeValue = Math.max(0, Math.min(max, Number(value) || 0));
  const fullStars = Math.floor(safeValue);
  const hasHalf = safeValue - fullStars >= 0.5;

  return Array.from({ length: max }, (_, index) => {
    let type = "empty";
    if (index < fullStars) {
      type = "full";
    } else if (hasHalf && index === fullStars) {
      type = "half";
    }

    let symbol = "☆";
    if (type === "full") {
      symbol = "★";
    } else if (type === "half") {
      symbol = "⯨";
    }

    return (
      <span key={index} className={`rating-star ${type}`} aria-hidden>
        {symbol}
      </span>
    );
  });
}

export default function RatingStars({ value = 0, max = 3, size = 24, color = "#dc3545" }) {
  const stars = buildStars(value, max);

  return (
    <span
      className="rating-stars"
      style={{ fontSize: size, color }}
      aria-label={`Rating ${Number(value) || 0} out of ${max}`}
    >
      {stars}
    </span>
  );
}
