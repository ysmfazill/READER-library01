import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthNavbar from '../components/AuthNavbar';
import { AuthInput } from '../components/AuthInput';
import { AuthButton } from '../components/AuthButton';

type Strength = 'none' | 'weak' | 'medium' | 'strong';

function calcStrength(val: string): Strength {
  if (!val) return 'none';
  let score = 0;
  if (val.length > 5) score++;
  if (val.length > 8 && /[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
  if (val.length > 12 && /[^A-Za-z0-9]/.test(val)) score++;
  if (score === 1) return 'weak';
  if (score === 2) return 'medium';
  if (score === 3) return 'strong';
  return 'none';
}

const METER_COLORS: Record<Strength, { bars: number; color: string; label: string; textClass: string }> = {
  none:   { bars: 0, color: 'bg-outline/20',  label: 'Too short', textClass: 'text-outline' },
  weak:   { bars: 1, color: 'bg-error',        label: 'Weak',      textClass: 'text-error' },
  medium: { bars: 2, color: 'bg-yellow-400',   label: 'Medium',    textClass: 'text-yellow-500' },
  strong: { bars: 3, color: 'bg-green-500',    label: 'Strong',    textClass: 'text-green-500' },
};

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    fullName: '', email: '', username: '', password: '', confirmPassword: '', terms: false,
  });

  const strength = calcStrength(form.password);
  const passwordsMatch = form.password.length > 0 && form.password === form.confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/welcome');
    }, 1500);
  };

  const inputClass =
    'w-full pl-12 pr-4 py-4 rounded-xl border border-outline-variant bg-surface/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-base';

  return (
    <div className="bg-surface text-on-surface overflow-x-hidden min-h-screen">
      <AuthNavbar rightLink={{ label: 'Sign In', href: '/login' }} />

      <main className="min-h-screen flex pt-20">
        {/* ── LEFT PANEL ── */}
        <section className="hidden lg:flex lg:w-[45%] brand-gradient relative flex-col justify-center px-16 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            {/* Decorative mesh background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          </div>
          <div className="relative z-10 text-white space-y-6">
            <h1 className="text-[48px] font-bold leading-tight tracking-[-0.02em]">
              Start Your<br />Reading Journey
            </h1>
            <p className="text-[18px] text-white/80 max-w-md leading-relaxed">
              Create your account and let AI personalize your reading experience from day one. Precision in knowledge, tailored to your intellect.
            </p>
            <div className="flex items-center gap-4 pt-8">
              <div className="flex -space-x-4">
                {[
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuB-jdV95qGoWP2O2nX7aQiAjlZ1NIT-ydH1NMu_Zqygbxnb00YymVErxms0RD0JUs90aOhPTk_k-zyLaOIXMUo8Y_EJIyKr0ibvih0DRJu9L8lmmZfidJawDt7OddZ4hT3riUH3eJCi0qkTJ3KdwD_na5SZjd-1tpZQhVLxdJB_qswimeMh00Jtt61XduZAm_CDp2hgJ1XhbwfxA_Irj5Z4ZXOT2HDXV2MuyUjRVeS7mjvnHf0Ukcc',
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAbONgxHnnjsv_Ab3_YOw0v5gV-alQ2BPQmDEc6BVpxdO7Yv3waa7BIXbR3V1uly0h1U6w0z3ujvJJWSZWDV5WQeZQArxmlwL0KA1JXsLJznc8ZTW4rK_yWLRaBSvlGTw2SgOjRBIkDTyWGDw5_kWMOIVu1D4-6HAC3ApXa3pSgXGxKC_CGg5xeGu-ig9Vs0oRlA9N3wcZMGnQSHqoFjEMQSgZy6IeHN0cc96mMdh2QS3IhjGj-kss',
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuCLzpv5FcSp9dXymMN_5UR-SGnX4TA2tQi0PtN9ayP5rLgefWNl6Y02e7EbKsmc9rSgW2jKZz6mM8Q_Idk7Wwz4Ekdw6vDx7qkVAP67As_q25-Wb8n8CbY8ZYY_MlUCZWsaX7wTizwdq5iHviFyUW3mL-LiraD5SNRqvFOzZe9nwYGiIvwZFoVXXaB-uSq3FVJxT5w3G8XqYBZvLH1UDrQ6Qh4Xvm4SDuFeZFbEhf9Al5Uq2UIAl1E',
                ].map((src, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-white/20 bg-cover bg-center"
                    style={{ backgroundImage: `url('${src}')` }}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-white/90">Joined by 10k+ researchers</span>
            </div>
          </div>
        </section>

        {/* ── RIGHT PANEL ── */}
        <section className="w-full lg:w-[55%] flex items-center justify-center p-8 bg-background relative overflow-y-auto">
          <div className="w-full max-w-xl fade-in-card">
            <div className="glass-card rounded-3xl p-10 shadow-sm border border-white/50">
              {/* Header */}
              <div className="mb-10 text-center">
                <h2 className="text-[32px] font-semibold leading-[1.2] tracking-[-0.01em] text-on-surface mb-2">
                  Create Your Account 🚀
                </h2>
                <p className="text-on-surface-variant text-base">Join the next generation of academic discovery.</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Full Name */}
                <AuthInput
                  id="fullName" type="text" required placeholder="Dr. John Doe"
                  label="Full Name" icon="person"
                  value={form.fullName}
                  onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                  labelClass="text-sm font-medium text-on-surface-variant"
                  iconClass="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                  className={inputClass}
                />

                {/* Email + Username grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AuthInput
                    id="reg-email" type="email" required placeholder="name@aethelgard.ai"
                    label="Email Address" icon="mail"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    labelClass="text-sm font-medium text-on-surface-variant"
                    iconClass="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                    className={inputClass}
                  />
                  <AuthInput
                    id="username" type="text" required placeholder="johndoe_res"
                    label="Username" icon="alternate_email"
                    value={form.username}
                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                    labelClass="text-sm font-medium text-on-surface-variant"
                    iconClass="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                    className={inputClass}
                  />
                </div>

                {/* Password */}
                <div className="space-y-2 relative">
                  <AuthInput
                    id="reg-password" type={showPwd ? 'text' : 'password'} required placeholder="••••••••"
                    label="Password" icon="lock"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    labelClass="text-sm font-medium text-on-surface-variant"
                    iconClass="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                    className={`${inputClass} pr-12`}
                    containerClass=""
                    labelRight={
                      <span className={`text-xs font-semibold ${METER_COLORS[strength].textClass}`}>
                        {METER_COLORS[strength].label}
                      </span>
                    }
                    rightElement={
                      <button type="button" onClick={() => setShowPwd(v => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">{showPwd ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    }
                  />
                  {/* Strength meter */}
                  <div className="h-1.5 w-full bg-surface-container rounded-full mt-2 overflow-hidden flex gap-1">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className={`h-full w-1/3 transition-all duration-500 ${
                          i < METER_COLORS[strength].bars ? METER_COLORS[strength].color : 'bg-outline/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Confirm Password */}
                <AuthInput
                  id="confirmPassword" type={showConfirm ? 'text' : 'password'} required placeholder="••••••••"
                  label="Confirm Password" icon="lock_reset"
                  value={form.confirmPassword}
                  onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                  labelClass="text-sm font-medium text-on-surface-variant"
                  iconClass="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                  className={`${inputClass} pr-24 ${passwordsMatch ? 'border-secondary' : 'border-outline-variant'}`}
                  rightElement={
                    <>
                      {passwordsMatch && (
                        <div className="absolute right-12 top-1/2 -translate-y-1/2 text-secondary">
                          <span className="material-symbols-outlined">check_circle</span>
                        </div>
                      )}
                      <button type="button" onClick={() => setShowConfirm(v => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">{showConfirm ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </>
                  }
                />

                {/* Terms */}
                <div className="flex items-start gap-3 py-2">
                  <input
                    id="terms" type="checkbox" required
                    checked={form.terms}
                    onChange={e => setForm(f => ({ ...f, terms: e.target.checked }))}
                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer mt-1"
                  />
                  <label className="text-xs font-semibold text-on-surface-variant leading-tight" htmlFor="terms">
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:underline">Terms &amp; Conditions</a> and{' '}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>.{' '}
                    I understand my data is processed with academic integrity.
                  </label>
                </div>

                {/* Submit */}
                <AuthButton
                  type="submit"
                  loading={loading}
                  loadingText="Processing..."
                  icon="arrow_forward"
                  className="ripple w-full py-5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-2xl shadow-[0_12px_32px_-4px_rgba(109,40,217,0.12)] hover:shadow-[0_16px_40px_-4px_rgba(109,40,217,0.2)] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  Create Account
                </AuthButton>
              </form>

              <p className="mt-8 text-center text-on-surface-variant text-sm font-medium">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 py-4 bg-surface/50 backdrop-blur-sm border-t border-outline-variant/10">
        <div className="max-w-[1440px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center text-on-surface-variant text-xs font-semibold">
          <span>© 2026 Aethelgard AI. Version 1.0. Precision in knowledge.</span>
          <div className="flex gap-6 mt-2 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms &amp; Conditions</a>
            <a href="#" className="hover:text-primary transition-colors">API Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Registration;
