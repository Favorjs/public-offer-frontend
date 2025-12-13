<template>
  <div class="submission">
    <!-- Success Hero -->
    <div class="hero">
      <div class="hero__content">
        <div class="hero__badge">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Application Submitted
        </div>
        <h1 class="hero__title">Thank you! Your application is in review.</h1>
        <p class="hero__desc">A confirmation email has been sent. Reference below.</p>
      </div>
      <!-- <div class="ref-card">
        <span class="ref-card__label">Application Reference</span>
        <strong class="ref-card__value">{{ applicationId || 'Loading...' }}</strong>
      </div> -->
    </div>

    <!-- Download Section -->
    <section class="card">
      <div class="card__header">
        <div class="card__header-content">
          <div class="section-icon">📄</div>
          <div>
            <h2 class="card__title">Download Application PDF</h2>
            <p class="card__desc">Keep a copy for your records</p>
          </div>
        </div>
        <button class="btn btn--primary" :disabled="isDownloading" @click="downloadPDF">
          <svg v-if="!isDownloading" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
          </svg>
          {{ isDownloading ? 'Preparing...' : 'Download PDF' }}
        </button>
      </div>
      
      <div v-if="downloadSuccess" class="alert alert--success">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Download completed. Check your downloads.
      </div>
      <div v-if="downloadError" class="alert alert--error">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        {{ downloadError }}
      </div>
    </section>

    <!-- Next Steps Section -->
    <section class="card">
      <div class="card__header">
        <div class="card__header-content">
          <div class="section-icon">📋</div>
          <div>
            <h2 class="card__title">What Happens Next</h2>
            <p class="card__desc">Your application journey</p>
          </div>
        </div>
      </div>
      
      <div class="steps-grid">
        <div v-for="(step, idx) in steps" :key="step.title" class="step-card">
          <div class="step-card__number">{{ String(idx + 1).padStart(2, '0') }}</div>
          <div class="step-card__content">
            <h3 class="step-card__title">{{ step.title }}</h3>
            <p class="step-card__desc">{{ step.copy }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Actions -->
    <div class="actions">
      <button class="btn btn--secondary" @click="goHome">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        Back to Home
      </button>
      <button class="btn btn--primary" @click="submitAnother">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        Submit Another
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { publicOfferAPI } from '../services/api'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const applicationId = ref(route.params.id)
const isDownloading = ref(false)
const downloadError = ref('')
const downloadSuccess = ref(false)

const steps = [
  { title: 'Email Confirmation', copy: 'You will receive a confirmation email with your application details and PDF attachment.' },
  { title: 'Application Review', copy: 'Our team will verify your information and uploaded documents.' },

  { title: 'Allotment & Payment', copy: 'Approved applications proceed to share allotment and payment instructions.' }
]

const downloadPDF = async () => {
  if (!applicationId.value) {
    downloadError.value = 'Application ID not found'
    return
  }

  try {
    isDownloading.value = true
    downloadError.value = ''
    downloadSuccess.value = false
    await publicOfferAPI.downloadPDF(applicationId.value)
    downloadSuccess.value = true
    toast.success('PDF downloaded successfully')
  } catch (error) {
    if (error.response?.status === 404) {
      downloadError.value = 'Application not found. Please contact support.'
    } else if (error.response?.status === 500) {
      downloadError.value = 'Server error. Please try again later.'
    } else {
      downloadError.value = 'Failed to download PDF. Please try again.'
    }
    toast.error('Failed to download application form')
  } finally {
    isDownloading.value = false
  }
}

const goHome = () => router.push('/')
const submitAnother = () => router.push('/apply')

onMounted(() => {
  if (applicationId.value) {
    setTimeout(() => downloadPDF(), 1200)
  } else {
    downloadError.value = 'No application ID provided. Please contact support.'
    toast.error('Invalid application reference')
  }
})
</script>

<style scoped>
.submission {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem 1rem 2rem;
}

/* Hero Section */
.hero {
  background: #fff;
  border: 1px solid #e5e7eb;

  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.hero__content {
  flex: 1;
  min-width: 300px;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(16, 123, 95, 0.1);
  color: #107b5f;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.hero__badge svg {
  width: 16px;
  height: 16px;
}

.hero__title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 0.5rem;
  line-height: 1.2;
}

.hero__desc {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
}

.ref-card {
  background: #107b5f;
  color: white;
  padding: 1.25rem 1.5rem;

  text-align: center;
  min-width: 200px;
}

.ref-card__label {
  display: block;
  font-size: 0.85rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.ref-card__value {
  display: block;
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: 0.05em;
}

/* Cards */
.card {
  background: #fff;
  border: 1px solid #e5e7eb;

  padding: 1.75rem;
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.card__header-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
}

.section-icon {
  width: 48px;
  height: 48px;
  background: rgba(16, 123, 95, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.card__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.25rem;
}

.card__desc {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn--primary {
  background: #107b5f;
  color: white;
}

.btn--primary:hover:not(:disabled) {
  background: #0d6b52;
}

.btn--primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn--secondary {
  background: #f3f4f6;
  color: #4b5563;
  border: 1px solid #e5e7eb;
}

.btn--secondary:hover {
  background: #e5e7eb;
  border-color: #d1d5db;
}

/* Alerts */
.alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  margin-top: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.alert--success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.alert--error {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecdd3;
}

.alert svg {
  flex-shrink: 0;
}

/* Steps Grid */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.step-card {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;

  transition: all 0.2s;
}

.step-card:hover {
  border-color: #107b5f;
  background: #f0fdf4;
}

.step-card__number {
  width: 40px;
  height: 40px;
  background: #107b5f;
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1rem;
  flex-shrink: 0;
}

.step-card__content {
  flex: 1;
}

.step-card__title {
  font-size: 1rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.4rem;
}

.step-card__desc {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
}

/* Actions */
.actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding-top: 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .submission {
    padding: 0.75rem 1rem 1.5rem;
    gap: 1.25rem;
  }

  .hero {
    padding: 1.5rem;
    border-radius: 0;
  }

  .hero__content {
    min-width: auto;
  }

  .hero__title {
    font-size: clamp(1.5rem, 5vw, 1.75rem);
  }

  .hero__desc {
    font-size: 0.9rem;
  }

  .card {
    padding: 1.25rem;
    border-radius: 0;
  }

  .card__header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .card__header-content {
    margin-bottom: 0;
  }

  .card__title {
    font-size: 1.1rem;
  }

  .card__desc {
    font-size: 0.85rem;
  }

  .btn {
    width: 100%;
    justify-content: center;
    padding: 0.875rem 1.25rem;
    font-size: 0.9rem;
  }

  .steps-grid {
    grid-template-columns: 1fr;
    gap: 0.875rem;
  }

  .step-card {
    padding: 1rem;
  }

  .step-card__title {
    font-size: 0.95rem;
  }

  .step-card__desc {
    font-size: 0.8rem;
  }

  .actions {
    flex-direction: column;
    gap: 0.625rem;
  }

  .section-icon {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }

  .alert {
    padding: 0.875rem 1rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 640px) {
  .submission {
    padding: 0.5rem 0.75rem 1.25rem;
    gap: 1rem;
  }

  .hero {
    flex-direction: column;
    align-items: stretch;
    padding: 1.25rem;
  }

  .hero__badge {
    font-size: 0.8rem;
    padding: 0.4rem 0.875rem;
  }

  .hero__title {
    font-size: clamp(1.25rem, 6vw, 1.5rem);
    margin-bottom: 0.375rem;
  }

  .hero__desc {
    font-size: 0.875rem;
  }

  .ref-card {
    width: 100%;
    padding: 1rem 1.25rem;
  }

  .ref-card__value {
    font-size: 1.5rem;
  }

  .card {
    padding: 1rem;
  }

  .card__header {
    margin-bottom: 1.25rem;
  }

  .card__header-content {
    gap: 0.75rem;
  }

  .section-icon {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
  }

  .card__title {
    font-size: 1rem;
  }

  .card__desc {
    font-size: 0.8rem;
  }

  .btn {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }

  .steps-grid {
    gap: 0.75rem;
  }

  .step-card {
    flex-direction: column;
    text-align: center;
    padding: 0.875rem;
    gap: 0.75rem;
  }

  .step-card__number {
    margin: 0 auto;
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }

  .step-card__title {
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
  }

  .step-card__desc {
    font-size: 0.75rem;
  }

  .actions {
    gap: 0.5rem;
    padding-top: 0.25rem;
  }

  .alert {
    padding: 0.75rem 0.875rem;
    font-size: 0.8rem;
    gap: 0.625rem;
  }

  .alert svg {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 375px) {
  .submission {
    padding: 0.5rem 0.625rem 1rem;
  }

  .hero {
    padding: 1rem;
  }

  .hero__title {
    font-size: 1.25rem;
  }

  .card {
    padding: 0.875rem;
  }

  .card__header {
    margin-bottom: 1rem;
  }

  .btn {
    padding: 0.7rem 0.875rem;
    font-size: 0.85rem;
  }
}
</style>
