import React from "react";

function Spinner({ size = "sm" }) {
  const dimension = size === "lg" ? "h-6 w-6" : "h-4 w-4";
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-brand-400/60 border-t-transparent ${dimension}`}
      aria-hidden="true"
    />
  );
}

export default Spinner;
