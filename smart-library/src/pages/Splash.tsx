import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Splash: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let currentPercent = 0;
    const duration = 3000; // 3 seconds
    const frameRate = 1000 / 60;
    const totalFrames = duration / frameRate;
    const increment = 100 / totalFrames;
    let animationFrameId: number;

    const updateCounter = () => {
      if (currentPercent < 100) {
        currentPercent = Math.min(currentPercent + increment, 100);
        setPercent(Math.floor(currentPercent));
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setTimeout(() => navigate('/login'), 400);
      }
    };

    const startTimeout = setTimeout(updateCounter, 200);

    return () => {
      clearTimeout(startTimeout);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen p-6 overflow-hidden bg-background relative">
      {/* Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
      </div>

      <main className="splash-fade-in relative z-10 w-full max-w-3xl">
        <div className="glass-card rounded-xl p-12 md:p-16 text-center space-y-8 overflow-hidden relative">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="logo-scale w-24 h-24 relative">
              <img
                alt="Smart Library Logo"
                className="w-full h-full object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAteYLaI6fKJ6E6TySQQR6CCI88yln9fkVUmPONkwyKUw5TrmNNJDWbXfZnBhYSOQE-rRJvLLID5JSGf_H0zq6Y29yuIUhdS1X6WsbF63lgvujruooc0BhuatnubmfAWiTBAJDZWwLc4ZocnRYCJ00IJ_nC7U9VgWyaCU0tg9kO3DrseQW8uvJIEc9vxl7_xjVutFCFhqY3jCG0cG8DCOzvlrGYLuMsFw4hpLtnlRW6ZQC1KB7_rgY"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-primary">
              AI-Powered Smart Library<br />Recommendation System
            </h1>
            <p className="italic font-light text-primary-container text-[18px]">
              "Your Personal AI Reading Assistant"
            </p>
            <p className="text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed opacity-80">
              Discover books tailored to your interests using Artificial Intelligence. Read smarter, learn faster, and explore thousands of books with personalized recommendations.
            </p>
          </div>

          {/* Progress */}
          <div className="pt-8 space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-xs font-semibold text-primary tracking-widest uppercase opacity-70">
                Initializing Smart Library...
              </span>
              <span className="text-xs font-bold text-primary">{percent}%</span>
            </div>
            <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full shadow-[0_0_8px_rgba(109,40,217,0.3)]"
                style={{ width: `${percent}%`, transition: 'width 0.05s linear' }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center opacity-60">
            <p className="text-xs font-semibold text-on-surface-variant">Version 1.0</p>
            <p className="text-xs font-semibold text-on-surface-variant">© 2026 Smart Library Team</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Splash;
