<template>
  <div class="home">
    <section class="hero">
      <div class="hero__content">
        <p class="eyebrow">Public Offer Now Open</p>
        <h1>Invest in The Initiates PLC</h1>
        <p class="lede">
          932,022,138 Ordinary Shares of 50 kobo each at ₦9.50 per share.
          Be part of Nigeria's sustainable future with a proven industry leader.
        </p>
        <div class="hero__actions">
          <RouterLink to="/apply" class="btn btn--primary">Start Your Application</RouterLink>
          <a href="#details" class="btn btn--ghost">View Key Details</a>
        </div>
        <div class="pill-grid">
          <div v-for="stat in stats" :key="stat.label" class="pill">
            <span class="pill__label">{{ stat.label }}</span>
            <span class="pill__value">{{ stat.value }}</span>
          </div>
        </div>
      </div>
      <div class="hero__card glass">
        <div class="timeline">
          <div class="timeline__item" v-for="item in timeline" :key="item.label">
            <div class="timeline__icon">⏳</div>
            <div>
              <div class="muted">{{ item.label }}</div>
              <strong>{{ item.date }}</strong>
            </div>
          </div>
        </div>
        <div class="badge-grid">
          <div class="badge">Minimum 1,000 shares</div>
          <div class="badge">Multiples of 1,000</div>
          <div class="badge badge--green">SECTOR: Environmental Services</div>
        </div>
      </div>
    </section>



  </div>
</template>

<script setup>
const stats = [
  { label: 'Offer Size', value: '₦8.85B' },
  { label: 'Price per Share', value: '₦9.50' },
  { label: 'Opens', value: '5 Nov 2025' },
  { label: 'Closes', value: '12 Dec 2025' }
]

const timeline = [
  { label: 'Opens', date: '5 November 2025' },
  { label: 'Closes', date: '12 December 2025' }
]

const benefits = [
  {
    icon: '🌿',
    title: 'Sustainability Leader',
    copy: 'Track record in environmental and waste management services across Nigeria.',
    tint: 'linear-gradient(135deg, #22c55e, #16a34a)',
    chips: ['ESG Focused', 'Operational Excellence']
  },
  {
    icon: '📈',
    title: 'Growth Outlook',
    copy: 'Robust pipeline and diversified revenue mix with disciplined capital deployment.',
    tint: 'linear-gradient(135deg, #5b7bfe, #7c3aed)',
    chips: ['Diversified', 'Pipeline Ready']
  },
  {
    icon: '🛡️',
    title: 'Governance',
    copy: 'Transparent reporting with reputable advisers and regulated offer structure.',
    tint: 'linear-gradient(135deg, #f59e0b, #f97316)',
    chips: ['Transparent', 'Regulated']
  }
]

const requirements = [
  { title: 'Personal Information', copy: 'Valid ID, residential address, contact details.' },
  { title: 'CSCS Details', copy: 'Your CHN and CSCS account number for securities settlement.' },
  { title: 'Banking Information', copy: 'BVN, bank name, account number, and branch city.' },
  { title: 'Stockbroker', copy: 'Name and code of your preferred registered stockbroker.' }
]

const steps = [
  { title: 'Enter Details', copy: 'Guided steps for personal, investment, CSCS, and banking info.' },
  { title: 'Review', copy: 'Instant summary to confirm all details before submission.' },
  { title: 'Submit & Download', copy: 'Receive a downloadable PDF receipt and email confirmation.' }
]
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  align-items: center;
}

.hero__content h1 {
  font-size: clamp(2.6rem, 4vw, 3.4rem);
  margin: 0.35rem 0;
  color: var(--text-strong);
}

.hero__content .lede {
  color: var(--text-muted);
  max-width: 640px;
  margin-bottom: 1.5rem;
}

.eyebrow {
  text-transform: uppercase;
  font-weight: 700;
  color: var(--primary-dark);
  letter-spacing: 0.12em;
  font-size: 0.8rem;
  margin: 0 0 0.4rem;
}

.hero__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 1.4rem;
  border-radius: 12px;
  font-weight: 700;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn--primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  box-shadow: var(--shadow-md);
}

.btn--primary:hover {
  transform: translateY(-1px);
}

.btn--ghost {
  background: rgba(91, 123, 254, 0.08);
  color: var(--primary-dark);
  border-color: rgba(91, 123, 254, 0.2);
}

.pill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.pill {
  padding: 0.9rem 1rem;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

.pill__label {
  display: block;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.pill__value {
  font-weight: 800;
  color: var(--text-strong);
}

.hero__card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.timeline {
  display: grid;
  gap: 1rem;
  padding: 0.5rem;
}

.timeline__item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 12px;
  background: rgba(91, 123, 254, 0.05);
}

.timeline__icon {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  background: rgba(91, 123, 254, 0.16);
  color: var(--primary-dark);
  border-radius: 50%;
  font-size: 0.95rem;
}

.badge-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.badge {
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  background: rgba(91, 123, 254, 0.12);
  color: var(--primary-dark);
  font-weight: 600;
  font-size: 0.95rem;
}

.badge--green {
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
}

.section {
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: var(--shadow-md);
}

.section__header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 2rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.card {
  padding: 1.5rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.chip-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.chip-list li {
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: #eef2ff;
  color: var(--primary-dark);
  font-weight: 600;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.req {
  padding: 1.25rem;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--border);
}

.req__index {
  color: var(--primary-dark);
  font-weight: 800;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.step {
  padding: 1.25rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.9);
}

.step__badge {
  display: inline-block;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: rgba(91, 123, 254, 0.12);
  color: var(--primary-dark);
  font-weight: 700;
  margin-bottom: 0.4rem;
}

.cta {
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--shadow-lg);
}

.cta__actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.cta .btn--ghost {
  color: white;
  border-color: rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.08);
}

.muted {
  color: var(--text-muted);
}

@media (max-width: 900px) {
  .section,
  .cta {
    padding: 1.5rem;
  }

  .cta {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
  }

  .cta__actions {
    justify-content: center;
  }
}
</style>

