import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AuthLayout from "../../components/forms/AuthLayout";
import TextInput from "../../components/forms/TextInput";
import Spinner from "../../components/loader/Spinner";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email) nextErrors.email = "Email is required";
    if (!form.password || form.password.length < 6) {
      nextErrors.password = "Password should be at least 6 characters";
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      setSubmitting(true);
      await signup(form);
      navigate("/", { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Could not create your account right now.";
      setErrors((prev) => ({ ...prev, form: message }));
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create your workspace"
      subtitle="Sign up to start organising projects, tasks, and collaborators."
      footer={
        <span>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-brand-300 hover:text-brand-200"
          >
            Log in
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
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
          required
          placeholder="Nate Martins"
          error={errors.name}
        />
        <TextInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          required
          placeholder="you@example.com"
          error={errors.email}
        />
        <TextInput
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
          placeholder="At least 6 characters"
          error={errors.password}
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:bg-brand-500/70"
        >
          {submitting && <Spinner />}
          <span>Create workspace</span>
        </button>
      </form>
    </AuthLayout>
  );
}

export default Signup;
