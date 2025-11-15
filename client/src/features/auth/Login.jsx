import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AuthLayout from "../../components/forms/AuthLayout";
import TextInput from "../../components/forms/TextInput";
import Spinner from "../../components/loader/Spinner";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!form.email || !form.password) {
      const next = {};
      if (!form.email) next.email = "Email is required";
      if (!form.password) next.password = "Password is required";
      setErrors(next);
      return;
    }

    try {
      setSubmitting(true);
      await login(form);
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message || "Invalid email or password";
      setErrors((prev) => ({ ...prev, form: message }));
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to see your projects and keep work moving."
      footer={
        <span>
          New here?{" "}
          <Link
            to="/signup"
            className="font-medium text-brand-300 hover:text-brand-200"
          >
            Create a workspace
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.form && (
          <p className="rounded-md border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-100">
            {errors.form}
          </p>
        )}
        <TextInput
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          error={errors.email}
        />
        <TextInput
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="••••••••"
          error={errors.password}
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:bg-brand-500/70"
        >
          {submitting && <Spinner />}
          <span>Log in</span>
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;
