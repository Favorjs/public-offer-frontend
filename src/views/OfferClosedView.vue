<template>
  <div class="offer-closed-page">
    <div class="hero-section">
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
      
      <div class="hero-content">
        <div class="status-badge">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>Offer Period Ended</span>
        </div>
        
        <h1 class="hero-title">
          The Public Offer is<br />
          <span class="highlight">Now Closed</span>
        </h1>
        
        <p class="hero-desc">
          Thank you for your interest in <strong>The Initiates PLC</strong>. 
          The application period for the 932,022,138 Ordinary Shares has officially come to an end.
        </p>

        <div class="info-card glass">
          <div class="info-item">
            <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 17.07c-.44-1.34-1.62-2.33-3-2.87m-5 3.22c-1.54.3-3.15.49-4.81.56L4 18.03V11l.57.14c4.59 1.12 8.96 2.1 13.11 3.07 1.41.3 2.58 1.4 3.03 2.76.35 1.07.46 2.25.32 3.35-.14.71-.51 1.25-1.04 1.6l-2.99 2.05c-.4.27-.8.35-1.15.24-.35-.11-.53-.44-.45-.82l.2-1.34c.05-.38.21-.69.45-.92l.99-.99c.27-.27.35-.57.24-.89zM14 1a5 5 0 0 0-5 5v3a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a5 5 0 0 0-5-5zM11 6a3 3 0 1 1 6 0v2h-6V6z"/>
            </svg>
            <div>
              <h4>What's Next?</h4>
              <p>For inquiries regarding allotment and verification, please contact our registrars or your stockbroker.</p>
            </div>
          </div>
        </div>
        
        <div class="hero-actions">
          <a href="https://apel.com.ng" class="btn btn-primary">
            <span>Visit Corporate Website</span>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>
          <!-- <router-link to="/admin" class="btn btn-secondary">
            <span>Admin Gateway</span>
          </router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No specific logic needed for now
</script>

<style scoped>
.offer-closed-page {
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'Inter', -apple-system, sans-serif;
}

.hero-section {
  position: relative;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 4rem 2rem;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.2;
  animation: float 20s infinite ease-in-out;
}

.orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, #6366f1 0%, transparent 70%); top: -10%; right: -10%; }
.orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, #a855f7 0%, transparent 70%); bottom: -10%; left: -10%; animation-delay: 7s; }
.orb-3 { width: 300px; height: 300px; background: radial-gradient(circle, #ec4899 0%, transparent 70%); top: 50%; left: 50%; animation-delay: 14s; }

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

.hero-content {
  max-width: 800px;
  text-align: center;
  position: relative;
  z-index: 10;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: rgba(239, 68, 68, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fca5a5;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 2rem;
}

.status-badge .icon { width: 16px; height: 16px; }

.hero-title {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.highlight {
  background: linear-gradient(to right, #6366f1, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: 1.25rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

.hero-desc strong { color: white; }

.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
}

.info-card {
  padding: 2rem;
  margin-bottom: 3rem;
  text-align: left;
}

.info-item {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.info-icon {
  width: 48px;
  height: 48px;
  padding: 10px;
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border-radius: 14px;
  flex-shrink: 0;
}

.info-item h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.info-item p {
  font-size: 0.95rem;
  color: #94a3b8;
  line-height: 1.5;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 14px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background: white;
  color: #0f172a;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.4);
}

.icon { width: 20px; height: 20px; }

@media (max-width: 640px) {
  .hero-section { padding: 3rem 1.5rem; }
  .hero-title { font-size: 2.5rem; }
  .btn { width: 100%; justify-content: center; }
}
</style>
