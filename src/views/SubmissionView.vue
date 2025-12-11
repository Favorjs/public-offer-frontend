<template>
  <div class="submission">
    <div class="hero glass">
      <div>
        <p class="eyebrow">Application Submitted</p>
        <h1>Thank you! Your application is in review.</h1>
        <p class="muted">A confirmation email has been sent. Reference below.</p>
      </div>
      <div class="ref">
        <span>Application Reference</span>
        <strong>{{ applicationId }}</strong>
      </div>
    </div>

    <section class="card">
      <header class="card__header">
        <div>
          <p class="eyebrow">Download</p>
          <h2>Get your application PDF</h2>
          <p class="muted">Keep a copy for your records.</p>
        </div>
        <button class="primary" :disabled="isDownloading" @click="downloadPDF">
          {{ isDownloading ? 'Preparing...' : 'Download PDF' }}
        </button>
      </header>
      <div v-if="downloadSuccess" class="alert success">Download completed. Check your downloads.</div>
      <div v-if="downloadError" class="alert error">{{ downloadError }}</div>
    </section>

    <section class="card">
      <header class="card__header">
        <p class="eyebrow">Next Steps</p>
        <h2>What happens next</h2>
      </header>
      <div class="steps">
        <div v-for="(step, idx) in steps" :key="step.title" class="step glass">
          <div class="step__badge">0{{ idx + 1 }}</div>
          <h3>{{ step.title }}</h3>
          <p class="muted">{{ step.copy }}</p>
        </div>
      </div>
    </section>

    <div class="actions">
      <button class="ghost" @click="goHome">Back to Home</button>
      <button class="primary" @click="submitAnother">Submit another</button>
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
  { title: 'Email confirmation', copy: 'You will receive a confirmation email with your details.' },
  { title: 'Application review', copy: 'Our team verifies your information and documents.' },
  { title: 'Status updates', copy: 'We send regular updates on your application status.' },
  { title: 'Allotment & payment', copy: 'Approved applications proceed to allotment and payment instructions.' }
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
  gap: 1.25rem;
}

.hero {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  border: 1px solid var(--border);
}

.ref {
  padding: 1rem 1.25rem;
  border-radius: 14px;
  background: #0f172a;
  color: #e2e8f0;
  min-width: 240px;
}

.ref span {
  display: block;
  color: #cbd5e1;
}

.ref strong {
  font-size: 1.3rem;
}

.card {
  padding: 1.25rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: white;
  box-shadow: var(--shadow-md);
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.step {
  padding: 1rem;
  border-radius: 14px;
  border: 1px solid var(--border);
}

.step__badge {
  display: inline-block;
  background: rgba(91, 123, 254, 0.1);
  color: var(--primary-dark);
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  font-weight: 700;
}

.actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.primary {
  border: none;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  padding: 0.9rem 1.2rem;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}

.ghost {
  border: 1px solid var(--border);
  background: none;
  padding: 0.9rem 1.2rem;
  border-radius: 12px;
  color: var(--text-muted);
  cursor: pointer;
}

.alert {
  padding: 0.9rem 1rem;
  border-radius: 12px;
  margin-top: 0.75rem;
}

.alert.success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.alert.error {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecdd3;
}

.muted {
  color: var(--text-muted);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--primary-dark);
  font-weight: 800;
  margin: 0;
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .ref {
    width: 100%;
  }
}
</style>

