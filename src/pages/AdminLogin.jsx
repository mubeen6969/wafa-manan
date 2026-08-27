import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "../components/Image";
import { Reveal } from "../components/Reveal";
import { useToast } from "../components/Toast";

export default function AdminLogin() {
  const navigate = useNavigate();
  const toast = useToast();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [shakeSignal, setShakeSignal] = useState(0);
  const [loading, setLoading] = useState(false);

  useGSAP(
    () => {
      if (!shakeSignal) return undefined;
      const tween = gsap.fromTo(
        formRef.current,
        { x: -10 },
        { x: 0, duration: 0.5, ease: "elastic.out(1, 0.35)" }
      );
      return () => tween.kill();
    },
    { dependencies: [shakeSignal], scope: formRef }
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://wafa-manan-back-end.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success("Welcome back!");
        navigate("/admin");
      } else {
        setShakeSignal((value) => value + 1);
        toast.error(data.message || "Invalid email or password.");
      }
    } catch (err) {
      setShakeSignal((value) => value + 1);
      toast.error("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <Reveal as="div" className="card admin-login-card">
        <Image src="/icons/Group 15.png" alt="Wafa Manan" className="admin-login-logo" priority />
        <h1 className="admin-login-title">Admin Login</h1>
        <p className="admin-login-subtitle">Sign in to manage your projects.</p>

        <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
          <div className="admin-field">
            <Mail size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="contact-input"
              autoComplete="email"
              required
            />
          </div>

          <div className="admin-field has-toggle">
            <Lock size={18} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="contact-input"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="admin-field-toggle"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" className="contact-submit admin-submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing in&hellip;
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </Reveal>
    </div>
  );
}
