import React from "react";
import "./spinner.css";

const DOTS = [1, 2, 3];

export default function Loading() {
  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <div className="loading-message">
        <span className="loading-text">Loading</span>
        <span className="loading-dots" aria-hidden>
          {DOTS.map((dot) => (
            <span key={dot} className="dot" />
          ))}
        </span>
      </div>
    </div>
  );
}
