<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__badge">
        <span class="hero__badge-dot"></span>
        Public Offer Now Open
      </div>

      <h1 class="hero__title">
        Invest in<br />
        <span class="hero__highlight">The Initiates PLC</span>
      </h1>

      <p class="hero__desc">
        <strong>932,022,138</strong> Ordinary Shares of <strong>50 kobo</strong> each at <strong>₦9.50</strong> per share.
        Join Nigeria's leading sustainable waste management company.
      </p>

      <RouterLink to="/apply" class="hero__cta">
        Get Started
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </RouterLink>
    </section>

    <!-- Timeline Card -->
    <section class="timeline-card">
      <h2 class="timeline-card__title">Offer Timeline</h2>
      <div class="timeline">
        <div class="timeline__item">
          <div class="timeline__icon timeline__icon--active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div class="timeline__content">
            <span class="timeline__label">Opens</span>
            <strong class="timeline__date">5 November 2025</strong>
          </div>
        </div>
        <div class="timeline__line"></div>
        <div class="timeline__item">
          <div class="timeline__icon">
            <svg width="120" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div class="timeline__content">
            <span class="timeline__label">Closes</span>
            <strong class="timeline__date">12 January 2026</strong>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works">
      <h2 class="section-title">How It Works</h2>
      <div class="steps">
        <div class="step" v-for="(step, index) in steps" :key="step.title">
          <div class="step__number">{{ index + 1 }}</div>
          <h4 class="step__title">{{ step.title }}</h4>
          <p class="step__desc">{{ step.desc }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const steps = [
  { title: 'Fill Application', desc: 'Complete the guided form with your personal and investment details.' },
  { title: 'Upload & Review', desc: 'Upload payment receipt, review all information before submission.' },
  { title: 'Get Confirmation', desc: 'Receive email confirmation and downloadable PDF receipt.' }
]
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem 0 2rem;
}

/* Hero */
.hero {
  text-align: center;
  padding: 2rem 0 1rem;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(16, 123, 95, 0.1);
  color: #107b5f;
  font-weight: 600;
  font-size: 0.85rem;
  border-radius: 999px;
  margin-bottom: 1.5rem;
}

.hero__badge-dot {
  width: 8px;
  height: 8px;
  background: #107b5f;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.hero__title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #1f2937;
  line-height: 1.1;
  margin: 0 0 1.25rem;
}

.hero__highlight {
  color: #107b5f;
}

.hero__desc {
  font-size: 1.1rem;
  color: #6b7280;
  max-width: 540px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.hero__desc strong {
  color: #1f2937;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 2rem;
  background: #107b5f;
  color: white;
  font-weight: 700;
  font-size: 1.05rem;
  border-radius: 12px;
  transition: all 0.2s;
}

.hero__cta:hover {
  background: #0d6b52;
  transform: translateY(-2px);
}

/* Timeline Card */
.timeline-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.75rem;
}

.timeline-card__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1.25rem;
}

.timeline {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.timeline__item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.timeline__icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #f3f4f6;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.timeline__icon--active {
  background: #107b5f;
  color: white;
}

.timeline__content {
  display: flex;
  flex-direction: column;
}

.timeline__label {
  font-size: 0.8rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.timeline__date {
  color: #1f2937;
  font-size: 0.95rem;
}

.timeline__line {
  flex: 0 0 40px;
  height: 2px;
  background: #e5e7eb;
}

/* How It Works */
.how-it-works {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 2rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1.5rem;
  text-align: center;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.step {
  text-align: center;
}

.step__number {
  width: 40px;
  height: 40px;
  background: #107b5f;
  color: white;
  font-weight: 800;
  font-size: 1.1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.75rem;
}

.step__title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.4rem;
}

.step__desc {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* Mobile Responsiveness */
@media (max-width: 640px) {
  .home {
    padding: 0.5rem 0 1rem;
    gap: 1.5rem;
  }

  .hero {
    padding: 1.5rem 0 0.5rem;
  }

  .hero__title {
    font-size: 2rem;
  }

  .hero__desc {
    font-size: 1rem;
    padding: 0 1rem;
  }

  .hero__cta {
    width: 100%;
    max-width: 280px;
    padding: 0.9rem 1.5rem;
    font-size: 1rem;
    justify-content: center;
  }

  .timeline-card {
    padding: 1.25rem;
    margin: 0 0.5rem;
  }

  .timeline {
    flex-direction: column;
    align-items: stretch;
  }

  .timeline__line {
    width: 2px;
    height: 24px;
    flex: 0 0 24px;
    margin-left: 19px;
  }

  .timeline__item {
    flex: none;
  }

  .how-it-works {
    padding: 1.5rem;
    margin: 0 0.5rem;
  }

  .steps {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .step {
    padding: 0.75rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .step__number {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
}
</style>
