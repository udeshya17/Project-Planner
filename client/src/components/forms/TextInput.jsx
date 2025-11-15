import React from "react";

function TextInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  autoComplete,
  required,
  error,
  placeholder,
}) {
  return (
    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
      <span>{label}</span>
      <input
        className={`mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 ${
          error
            ? "border-red-500 bg-red-50 text-red-900 placeholder-red-400 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-red-300"
            : "border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
        }`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </label>
  );
}

export default TextInput;
