import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { setNdaToken } from "../utils/ndaAccess";

const API_URL = "http://localhost:5000/api/nda/unlock";

export default function NdaUnlockModal({ onClose, onUnlocked }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Incorrect password.");
      }

      const { token, ttlHours } = await res.json();
      setNdaToken(token, ttlHours);
      onUnlocked();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div
        className="admin-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="nda-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-modal-icon">
          <Lock size={22} />
        </div>
        <h3 className="admin-modal-title" id="nda-modal-title">
          NDA-protected project
        </h3>
        <p className="admin-modal-desc">Enter the access password to view this project.</p>
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="password"
            className="contact-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
          />
          {error && (
            <p className="admin-hint" style={{ color: "#e5484d" }}>
              {error}
            </p>
          )}
          <div className="admin-modal-actions">
            <button type="button" className="admin-cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="admin-modal-delete" disabled={loading}>
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Unlock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}