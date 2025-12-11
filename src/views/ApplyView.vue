<template>
  <div class="apply">
    <div class="page-head">
      <button class="ghost" @click="router.push('/')">← Back to overview</button>
      <div>
        <p class="eyebrow">Application</p>
        <h1>Share Application Form</h1>
        <p class="muted">Guided steps — save progress automatically.</p>
      </div>
    </div>

    <div class="progress glass">
      <div class="progress__bar">
        <div class="progress__fill" :style="{ width: progressWidth }" />
      </div>
      <div class="progress__steps">
        <div
          v-for="(step, index) in steps"
          :key="step.label"
          class="progress__step"
          :class="{ active: currentStep === index, done: currentStep > index }"
        >
          <span>{{ index + 1 }}</span>
          <small>{{ step.label }}</small>
        </div>
      </div>
    </div>

    <div class="cards">
      <!-- Personal -->
      <section v-if="currentStep === 0" class="card">
        <Header icon="👤" title="Personal Information" subtitle="Tell us about yourself" />
        <div class="grid-2">
          <Field label="Account Type" required>
            <select v-model="formData.account_type">
              <option value="INDIVIDUAL">Individual</option>
              <option value="CORPORATE">Corporate</option>
              <option value="JOINT">Joint</option>
            </select>
          </Field>
          <Field label="Title" required>
            <select v-model="formData.title">
              <option value="MR">Mr</option>
              <option value="MRS">Mrs</option>
              <option value="MISS">Miss</option>
              <option value="OTHERS">Others</option>
            </select>
            <div v-if="formData.title === 'OTHERS'" class="nested">
              <input v-model="formData.title_others" type="text" placeholder="Specify title" />
            </div>
          </Field>
        </div>

        <div class="grid-2">
          <Field label="Surname" required>
            <input v-model="formData.surname" type="text" placeholder="Surname" />
          </Field>
          <Field label="First Name" required>
            <input v-model="formData.first_name" type="text" placeholder="First name" />
          </Field>
        </div>

        <Field label="Other Names">
          <input v-model="formData.other_names" type="text" placeholder="Other names (optional)" />
        </Field>

        <Field label="Residential Address" required>
          <textarea v-model="formData.address" rows="3" placeholder="Street, city, state" />
        </Field>

        <div class="grid-2">
          <Field label="City" required>
            <input v-model="formData.city" type="text" placeholder="City" />
          </Field>
          <Field label="State" required>
            <input v-model="formData.state" type="text" placeholder="State" />
          </Field>
        </div>

        <div class="grid-2">
          <Field label="Phone Number" required>
            <input v-model="formData.phone" type="tel" placeholder="+234 800 000 0000" />
          </Field>
          <Field label="Email Address" required>
            <input v-model="formData.email" type="email" placeholder="you@email.com" />
          </Field>
        </div>

        <div class="grid-2">
          <Field label="Date of Birth" required>
            <input v-model="formData.dob" type="date" />
          </Field>
          <Field label="Next of Kin" required>
            <input v-model="formData.next_of_kin" type="text" placeholder="Full name" />
          </Field>
        </div>
      </section>

      <!-- Investment -->
      <section v-if="currentStep === 1" class="card">
        <Header icon="💸" title="Investment Details" subtitle="Choose your allocation" />
        <div class="pill-grid">
          <div class="pill"><strong>₦9.50</strong><span class="muted">Price per share</span></div>
          <div class="pill"><strong>1,000</strong><span class="muted">Minimum shares</span></div>
          <div class="pill"><strong>1,000</strong><span class="muted">Multiples</span></div>
        </div>
        <Field label="Number of Shares" required>
          <input
            v-model.number="formData.shares_applied"
            type="number"
            min="1000"
            step="1000"
            class="lg"
            placeholder="1000"
          />
          <small class="muted">Minimum 1,000 shares in multiples of 1,000</small>
        </Field>
        <div class="summary">
          <div>
            <p class="muted">Total Investment</p>
            <h3>₦{{ calculateAmountPayable.toLocaleString() }}</h3>
          </div>
          <div class="muted">{{ formData.shares_applied?.toLocaleString() || 0 }} shares</div>
        </div>
      </section>

      <!-- CSCS -->
      <section v-if="currentStep === 2" class="card">
        <Header icon="🏦" title="CSCS Information" subtitle="Settlement details" />
        <Field label="Stockbroker" required>
          <select v-model="formData.stockbrokers_id" :disabled="isLoadingStockbrokers">
            <option value="">{{ isLoadingStockbrokers ? 'Loading...' : 'Select broker' }}</option>
            <option v-for="broker in stockbrokers" :key="broker.id" :value="broker.id">
              {{ broker.name }} ({{ broker.code }})
            </option>
          </select>
          <div v-if="isLoadingStockbrokers" class="inline muted">Loading stockbrokers...</div>
        </Field>
        <div class="grid-2">
          <Field label="CSCS Account Number" required>
            <input v-model="formData.cscs_no" type="text" placeholder="CSCS number" />
          </Field>
          <Field label="CHN Number">
            <input v-model="formData.chn" type="text" placeholder="Clearing House Number" />
          </Field>
        </div>
        <Field v-if="formData.account_type === 'CORPORATE'" label="Contact Person" required>
          <input v-model="formData.contact_person" type="text" placeholder="Contact person" />
        </Field>
      </section>

      <!-- Bank -->
      <section v-if="currentStep === 3" class="card">
        <Header icon="💳" title="Bank Details" subtitle="Where proceeds are settled" />
        <Field label="Bank Name" required>
          <input v-model="formData.bank_name" type="text" placeholder="Bank name" />
        </Field>
        <div class="grid-2">
          <Field label="BVN" required>
            <input v-model="formData.bvn" type="text" maxlength="11" placeholder="11-digit BVN" />
          </Field>
          <Field label="Account Number" required>
            <input v-model="formData.account_number" type="text" placeholder="Account number" />
          </Field>
        </div>
        <div class="grid-2">
          <Field label="Branch" required>
            <input v-model="formData.branch" type="text" placeholder="Branch name" />
          </Field>
          <Field label="City" required>
            <input v-model="formData.bank_city" type="text" placeholder="Branch city" />
          </Field>
        </div>
      </section>

      <!-- Review -->
      <section v-if="currentStep === 4" class="card">
        <Header icon="✅" title="Review & Submit" subtitle="Confirm before submission" />
        <div class="review">
          <ReviewBlock title="Personal" :items="personalSummary" />
          <ReviewBlock title="Investment" :items="investmentSummary" />
          <ReviewBlock title="CSCS" :items="cscsSummary" />
          <ReviewBlock title="Bank" :items="bankSummary" />
        </div>
      </section>
    </div>

    <div class="actions">
      <button class="ghost" :disabled="currentStep === 0" @click="prevStep">Back</button>
      <button v-if="currentStep < steps.length - 1" class="primary" @click="nextStep">
        Continue
      </button>
      <button
        v-else
        class="success"
        :disabled="isSubmitting"
        @click="submitApplication"
      >
        {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { publicOfferAPI } from '../services/api'
import Header from '../components/ui/SectionHeader.vue'
import Field from '../components/ui/FormField.vue'
import ReviewBlock from '../components/ui/ReviewBlock.vue'

const router = useRouter()
const toast = useToast()

const currentStep = ref(0)
const isSubmitting = ref(false)
const isLoadingStockbrokers = ref(false)
const stockbrokers = ref([])

const formData = reactive({
  account_type: 'INDIVIDUAL',
  title: 'MR',
  title_others: '',
  surname: '',
  first_name: '',
  other_names: '',
  address: '',
  city: '',
  state: '',
  country: 'Nigeria',
  phone: '',
  email: '',
  dob: '',
  next_of_kin: '',
  contact_person: '',
  shares_applied: 1000,
  chn: '',
  cscs_no: '',
  stockbrokers_id: '',
  bank_name: '',
  bvn: '',
  account_number: '',
  branch: '',
  bank_city: ''
})

const steps = [
  { label: 'Personal' },
  { label: 'Investment' },
  { label: 'CSCS' },
  { label: 'Bank' },
  { label: 'Review' }
]

const progressWidth = computed(() => `${((currentStep.value + 1) / steps.length) * 100}%`)
const calculateAmountPayable = computed(() => formData.shares_applied * 9.5)

const personalSummary = computed(() => [
  { label: 'Name', value: `${formData.title} ${formData.surname} ${formData.first_name}` },
  { label: 'Address', value: formData.address },
  { label: 'City/State', value: `${formData.city}, ${formData.state}` },
  { label: 'Phone', value: formData.phone },
  { label: 'Email', value: formData.email },
  { label: 'DOB', value: formatDate(formData.dob) },
  { label: 'Next of Kin', value: formData.next_of_kin }
])

const investmentSummary = computed(() => [
  { label: 'Shares Applied', value: formData.shares_applied?.toLocaleString() },
  { label: 'Amount Payable', value: `₦${calculateAmountPayable.value?.toLocaleString()}` }
])

const cscsSummary = computed(() => [
  { label: 'CSCS Number', value: formData.cscs_no },
  { label: 'CHN Number', value: formData.chn || 'N/A' },
  { label: 'Stockbroker', value: getStockbrokerName(formData.stockbrokers_id) }
])

const bankSummary = computed(() => [
  { label: 'Bank', value: formData.bank_name },
  { label: 'Account Number', value: formData.account_number },
  { label: 'BVN', value: formData.bvn },
  { label: 'Branch', value: `${formData.branch}, ${formData.bank_city}` }
])

const fetchStockbrokers = async () => {
  try {
    isLoadingStockbrokers.value = true
    const response = await publicOfferAPI.getStockbrokers()
    stockbrokers.value = response.data?.data || []
  } catch (error) {
    toast.error('Unable to load stockbrokers')
    stockbrokers.value = []
  } finally {
    isLoadingStockbrokers.value = false
  }
}

const persist = () => {
  localStorage.setItem('publicOfferApplication', JSON.stringify(formData))
}

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
    persist()
  }
}

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return isNaN(date) ? '' : date.toLocaleDateString('en-GB')
}

const getStockbrokerName = (brokerId) => {
  const broker = stockbrokers.value.find((b) => b.id === brokerId)
  return broker ? `${broker.name} (${broker.code})` : ''
}

const submitApplication = async () => {
  try {
    isSubmitting.value = true
    if (!formData.dob || isNaN(new Date(formData.dob).getTime())) {
      toast.error('Please enter a valid date of birth')
      return
    }

    const payload = {
      ...formData,
      dob: new Date(formData.dob).toISOString().split('T')[0],
      individual_signature: formData.account_type === 'INDIVIDUAL' ? 'SIGNED' : null,
      corporate_signature: formData.account_type === 'CORPORATE' ? 'SIGNED' : null,
      joint_signature: formData.account_type === 'JOINT' ? 'SIGNED' : null
    }

    const response = await publicOfferAPI.submit(payload)
    if (response.data?.success) {
      toast.success('Application submitted')
      localStorage.removeItem('publicOfferApplication')
      router.push(`/submission/${response.data.data.id}`)
    } else {
      throw new Error(response.data?.message || 'Submission failed')
    }
  } catch (error) {
    toast.error(error.message || 'Error submitting application')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  const savedData = localStorage.getItem('publicOfferApplication')
  if (savedData) Object.assign(formData, JSON.parse(savedData))
  fetchStockbrokers()
})
</script>

<style scoped>
.apply {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-head {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.ghost {
  align-self: flex-start;
  background: none;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.5rem 0.9rem;
  cursor: pointer;
  color: var(--text-muted);
}

h1 {
  margin: 0;
  color: var(--text-strong);
}

.muted {
  color: var(--text-muted);
}

.progress {
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
}

.progress__bar {
  height: 10px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.progress__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 999px;
  transition: width 0.4s ease;
}

.progress__steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
}

.progress__step {
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px dashed var(--border);
  text-align: center;
  color: var(--text-muted);
  font-weight: 600;
}

.progress__step span {
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #e2e8f0;
  color: #0f172a;
  line-height: 28px;
  margin-bottom: 0.25rem;
}

.progress__step.active {
  border-color: rgba(91, 123, 254, 0.4);
  color: var(--primary-dark);
}

.progress__step.active span,
.progress__step.done span {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
}

.progress__step.done {
  border-style: solid;
}

.cards {
  display: grid;
  gap: 1rem;
}

.card {
  padding: 1.25rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: white;
  box-shadow: var(--shadow-md);
}

.grid-2 {
  display: grid;
  gap: 0.9rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.pill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.75rem;
}

.pill {
  padding: 0.9rem 1rem;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.9rem 0.85rem;
  border-radius: 10px;
  border: 1px solid var(--border);
  font-size: 1rem;
  background: #f8fafc;
}

textarea {
  resize: vertical;
}

.nested {
  margin-top: 0.6rem;
  padding-left: 0.75rem;
  border-left: 3px solid var(--primary);
}

.lg {
  font-size: 1.3rem;
  font-weight: 700;
  text-align: center;
}

.summary {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(91, 123, 254, 0.08), rgba(118, 75, 162, 0.08));
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.primary,
.success {
  border: none;
  border-radius: 12px;
  padding: 0.95rem 1.3rem;
  color: white;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--shadow-md);
}

.primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
}

.success {
  background: linear-gradient(135deg, #12b886, #0ea271);
}

@media (max-width: 640px) {
  .progress__steps {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

