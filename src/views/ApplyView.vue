<template>
  <div class="jotform-page">
    <!-- Form Header -->
    <header class="form-header">
      <div class="form-header__brand">
        
        <div>
          <h1 class="form-header__title">Application Form</h1>
          <p class="form-header__subtitle">The Initiates PLC Public Offer</p>
        </div>
      </div>
      <button class="btn-back" @click="router.push('/')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </button>
    </header>

    <!-- Progress Steps -->
    <div class="steps-container">
      <div class="steps">
        <div
          v-for="(step, index) in steps"
          :key="step.label"
          class="step"
          :class="{
            'step--active': currentStep === index,
            'step--done': currentStep > index
          }"
          @click="goToStep(index)"
        >
          <div class="step__number">
            <svg v-if="currentStep > index" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span v-else>{{ index + 1 }}</span>
        </div>
          <span class="step__label">{{ step.label }}</span>
        </div>
      </div>
      <div class="progress-bar">
        <div class="progress-bar__fill" :style="{ width: progressWidth }"></div>
      </div>
    </div>

    <!-- Form Card -->
    <main class="form-card">
      <!-- Step 1: Personal Information -->
      <section v-if="currentStep === 0" class="form-section">
        <div class="section-header">
          <div class="section-header__icon">👤</div>
          <div>
            <h2 class="section-header__title">Personal Information</h2>
            <p class="section-header__desc">Please provide your personal details</p>
          </div>
        </div>

        <div class="form-row form-row--2col">
          <div class="form-group">
            <label class="form-label">Account Type <span class="required">*</span></label>
            <select v-model="formData.account_type" class="form-input">
              <option value="INDIVIDUAL">Individual</option>
              <option value="CORPORATE">Corporate</option>
              <option value="JOINT">Joint</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Title <span class="required">*</span></label>
            <select v-model="formData.title" class="form-input">
              <option value="MR">Mr</option>
              <option value="MRS">Mrs</option>
              <option value="MISS">Miss</option>
              <option value="OTHERS">Others</option>
            </select>
            </div>
        </div>

        <div v-if="formData.title === 'OTHERS'" class="form-group">
          <label class="form-label">Specify Title <span class="required">*</span></label>
          <input v-model="formData.title_others" type="text" class="form-input" placeholder="Enter your title" />
        </div>

        <div class="form-row form-row--2col">
          <div class="form-group">
            <label class="form-label">Surname <span class="required">*</span></label>
            <input v-model="formData.surname" type="text" class="form-input" placeholder="Enter surname" />
          </div>
          <div class="form-group">
            <label class="form-label">First Name <span class="required">*</span></label>
            <input v-model="formData.first_name" type="text" class="form-input" placeholder="Enter first name" />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Other Names</label>
          <input v-model="formData.other_names" type="text" class="form-input" placeholder="Enter other names (optional)" />
        </div>

        <div class="form-group">
          <label class="form-label">Residential Address <span class="required">*</span></label>
          <textarea v-model="formData.address" class="form-input form-textarea" rows="3" placeholder="Enter your full address"></textarea>
        </div>

        <div class="form-row form-row--2col">
          <div class="form-group">
            <label class="form-label">City <span class="required">*</span></label>
            <input v-model="formData.city" type="text" class="form-input" placeholder="Enter city" />
          </div>
          <div class="form-group">
            <label class="form-label">State <span class="required">*</span></label>
            <input v-model="formData.state" type="text" class="form-input" placeholder="Enter state" />
          </div>
        </div>

        <div class="form-row form-row--2col">
          <div class="form-group">
            <label class="form-label">Phone Number <span class="required">*</span></label>
            <input v-model="formData.phone" type="tel" class="form-input" placeholder="+234 800 000 0000" />
          </div>
          <div class="form-group">
            <label class="form-label">Email Address <span class="required">*</span></label>
            <input v-model="formData.email" type="email" class="form-input" placeholder="you@email.com" />
          </div>
        </div>

        <div class="form-row form-row--2col">
          <div class="form-group form-group--date">
            <label class="form-label">Date of Birth <span class="required">*</span></label>
            <input v-model="formData.dob" type="date" class="form-input form-input--date" />
          </div>
          <div class="form-group">
            <label class="form-label">Next of Kin <span class="required">*</span></label>
            <input v-model="formData.next_of_kin" type="text" class="form-input" placeholder="Full name of next of kin" />
          </div>
        </div>
      </section>

      <!-- Step 2: Investment Details -->
      <section v-if="currentStep === 1" class="form-section">
        <div class="section-header">
          <div class="section-header__icon">💰</div>
          <div>
            <h2 class="section-header__title">Investment Details</h2>
            <p class="section-header__desc">Select your share allocation</p>
        </div>
        </div>

        <div class="info-cards">
          <div class="info-card">
            <span class="info-card__value">₦9.50</span>
            <span class="info-card__label">Price per Share</span>
          </div>
          <!-- <div class="info-card">
            <span class="info-card__value">1,000</span>
            <span class="info-card__label">Minimum Shares</span>
          </div>
          <div class="info-card">
            <span class="info-card__value">1,000</span>
            <span class="info-card__label">Multiples Of</span>
          </div> -->
        </div>

        <div class="form-group">
          <label class="form-label">Number of Shares <span class="required">*</span></label>
          <input
            v-model.number="formData.shares_applied"
            type="number"
            min="1000"
            step="1000"
            class="form-input form-input--lg"
            :class="{ 'form-input--error': sharesValidationError }"
            placeholder="Enter number of shares"
            @input="validateSharesInput"
          />
          <span class="form-hint">Minimum 1,000 shares in multiples of 1,000</span>
          <div v-if="sharesValidationError" class="form-alert form-alert--error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {{ sharesValidationError }}
          </div>
          </div>

        <div class="total-box">
          <div class="total-box__row">
            <span class="total-box__label">Shares Applied</span>
            <span class="total-box__value">{{ formData.shares_applied?.toLocaleString() || 0 }}</span>
          </div>
          <div class="total-box__divider"></div>
          <div class="total-box__row total-box__row--main">
            <span class="total-box__label">Total Amount Payable</span>
            <span class="total-box__value total-box__value--big">₦{{ calculateAmountPayable.toLocaleString() }}</span>
          </div>
        </div>
      </section>

      <!-- Step 3: CSCS Information -->
      <section v-if="currentStep === 2" class="form-section">
        <div class="section-header">
          <div class="section-header__icon">🏦</div>
          <div>
            <h2 class="section-header__title">CSCS Information</h2>
            <p class="section-header__desc">Settlement and broker details</p>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Stockbroker <span class="required">*</span></label>
          <select v-model="formData.stockbrokers_id" class="form-input" :disabled="isLoadingStockbrokers">
            <option value="">{{ isLoadingStockbrokers ? 'Loading stockbrokers...' : 'Select your stockbroker' }}</option>
            <option v-for="broker in stockbrokers" :key="broker.id" :value="broker.id">
              {{ broker.name }} ({{ broker.code }})
            </option>
          </select>
        </div>

        <div class="form-row form-row--2col">
          <div class="form-group">
            <label class="form-label">CSCS Account Number <span class="required">*</span></label>
            <input v-model="formData.cscs_no" type="text" class="form-input" placeholder="Enter CSCS number" />
        </div>
          <div class="form-group">
            <label class="form-label">CHN Number</label>
            <input v-model="formData.chn" type="text" class="form-input" placeholder="Clearing House Number" />
          </div>
        </div>

        <div v-if="formData.account_type === 'CORPORATE'" class="form-group">
          <label class="form-label">Contact Person <span class="required">*</span></label>
          <input v-model="formData.contact_person" type="text" class="form-input" placeholder="Name of contact person" />
        </div>
      </section>

      <!-- Step 4: Bank & Payment -->
      <section v-if="currentStep === 3" class="form-section">
        <div class="section-header">
          <div class="section-header__icon">💳</div>
          <div>
            <h2 class="section-header__title">Bank & Payment Details</h2>
            <p class="section-header__desc">Payment information and uploads</p>
          </div>
        </div>

        <!-- Payment Notice -->
        <div class="payment-notice">
          <div class="payment-notice__header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
            <strong>Payment Instructions</strong>
          </div>
          <p class="payment-notice__text">Kindly pay into any of these accounts only and upload your payment receipt:</p>
          <div class="payment-accounts">
            <div class="payment-account">
              <span class="payment-account__number">0013207895</span>
              <span class="payment-account__name">The Initiates Public Offer</span>
              <span class="payment-account__bank">TAJBank</span>
            </div>
            <div class="payment-account">
              <span class="payment-account__number">1308546403</span>
              <span class="payment-account__name">The Initiates Public Offer</span>
              <span class="payment-account__bank">Providus</span>
            </div>
          </div>
        </div>

        <!-- File Uploads -->
        <div class="form-group">
          <label class="form-label">Evidence of Payment <span class="required">*</span></label>
          <div class="file-upload" :class="{ 'file-upload--has-file': formData.payment_receipt_filename }">
            <input type="file" accept="image/*,application/pdf" @change="onReceiptSelected" class="file-upload__input" />
            <div class="file-upload__content">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
              </svg>
              <span v-if="formData.payment_receipt_filename" class="file-upload__filename">{{ formData.payment_receipt_filename }}</span>
              <span v-else class="file-upload__text">Click to upload receipt (Image or PDF)</span>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">
            {{ formData.account_type === 'INDIVIDUAL' ? 'Individual' : formData.account_type === 'CORPORATE' ? 'Corporate' : 'Joint' }} Signature <span class="required">*</span>
          </label>
          <div class="file-upload" :class="{ 'file-upload--has-file': currentSignatureFilename }">
            <input type="file" accept="image/*" @change="onSignatureSelected(signatureType, $event)" class="file-upload__input" />
            <div class="file-upload__content">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M17 3a2.85 2.85 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
              </svg>
              <span v-if="currentSignatureFilename" class="file-upload__filename">{{ currentSignatureFilename }}</span>
              <span v-else class="file-upload__text">Click to upload signature image</span>
            </div>
          </div>
        </div>

        <div class="form-divider"></div>

        <h3 class="subsection-title">Bank Details for Settlement</h3>

        <div class="form-group">
          <label class="form-label">Bank Name <span class="required">*</span></label>
          <select v-model="formData.bank_name" class="form-input" :disabled="isLoadingBanks">
            <option value="">{{ isLoadingBanks ? 'Loading banks...' : 'Select your bank' }}</option>
            <option v-for="bank in banks" :key="bank.bankCode" :value="bank.bankname">
              {{ bank.bankname }}
            </option>
          </select>
        </div>

        <div class="form-row form-row--2col">
          <div class="form-group">
            <label class="form-label">Account Number <span class="required">*</span></label>
            <input v-model="formData.account_number" type="text" class="form-input" placeholder="Enter account number" />
          </div>
          <div class="form-group">
            <label class="form-label">BVN <span class="required">*</span></label>
            <input v-model="formData.bvn" type="text" maxlength="11" class="form-input" placeholder="11-digit BVN" />
          </div>
        </div>

        <div class="form-row form-row--2col">
          <div class="form-group">
            <label class="form-label">Branch <span class="required">*</span></label>
            <input v-model="formData.branch" type="text" class="form-input" placeholder="Branch name" />
          </div>
          <div class="form-group">
            <label class="form-label">Branch City <span class="required">*</span></label>
            <input v-model="formData.bank_city" type="text" class="form-input" placeholder="City of branch" />
          </div>
        </div>
      </section>

      <!-- Step 5: Review -->
      <section v-if="currentStep === 4" class="form-section">
        <div class="section-header">
          <div class="section-header__icon">✅</div>
          <div>
            <h2 class="section-header__title">Review & Submit</h2>
            <p class="section-header__desc">Please verify all information before submitting</p>
          </div>
    </div>

        <div class="review-grid">
          <div class="review-block">
            <h4 class="review-block__title">Personal Information</h4>
            <div class="review-block__items">
              <div class="review-item" v-for="item in personalSummary" :key="item.label">
                <span class="review-item__label">{{ item.label }}</span>
                <span class="review-item__value">{{ item.value }}</span>
              </div>
            </div>
          </div>

          <div class="review-block">
            <h4 class="review-block__title">Investment Details</h4>
            <div class="review-block__items">
              <div class="review-item" v-for="item in investmentSummary" :key="item.label">
                <span class="review-item__label">{{ item.label }}</span>
                <span class="review-item__value">{{ item.value }}</span>
              </div>
            </div>
          </div>

          <div class="review-block">
            <h4 class="review-block__title">CSCS Information</h4>
            <div class="review-block__items">
              <div class="review-item" v-for="item in cscsSummary" :key="item.label">
                <span class="review-item__label">{{ item.label }}</span>
                <span class="review-item__value">{{ item.value }}</span>
              </div>
            </div>
          </div>

          <div class="review-block">
            <h4 class="review-block__title">Bank Details</h4>
            <div class="review-block__items">
              <div class="review-item" v-for="item in bankSummary" :key="item.label">
                <span class="review-item__label">{{ item.label }}</span>
                <span class="review-item__value">{{ item.value }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="review-uploads">
          <div class="review-upload" v-if="formData.payment_receipt_filename">
            <span class="review-upload__icon">📄</span>
            <span>Payment Receipt: {{ formData.payment_receipt_filename }}</span>
          </div>
          <div class="review-upload" v-if="currentSignatureFilename">
            <span class="review-upload__icon">✍️</span>
            <span>Signature: {{ currentSignatureFilename }}</span>
          </div>
        </div>
      </section>

      <!-- Form Actions -->
      <div class="form-actions">
        <button
          class="btn btn--secondary"
          :disabled="currentStep === 0"
          @click="prevStep"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Previous
        </button>

        <button
          v-if="currentStep < steps.length - 1"
          class="btn btn--primary"
          @click="nextStep"
        >
        Continue
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
      </button>

      <button
        v-else
          class="btn btn--success"
        :disabled="isSubmitting"
        @click="submitApplication"
      >
          <svg v-if="isSubmitting" class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        {{ isSubmitting ? 'Submitting... Please wait' : 'Submit Application' }}
      </button>
    </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { publicOfferAPI } from '../services/api'
import banksData from '../../utils/banks.json'

const router = useRouter()
const toast = useToast()

const currentStep = ref(0)
const isSubmitting = ref(false)
const isLoadingStockbrokers = ref(false)
const stockbrokers = ref([])
const uploadsBusy = ref(false)
const sharesValidationError = ref('')
const isLoadingBanks = ref(false)
const banks = ref([])

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
  bank_city: '',
  payment_receipt: '',
  payment_receipt_filename: '',
  payment_receipt_mime: '',
  individual_signature: '',
  corporate_signature: '',
  joint_signature: '',
  individual_signature_filename: '',
  corporate_signature_filename: '',
  joint_signature_filename: ''
})

const steps = [
  { label: 'Personal' },
  { label: 'Investment' },
  { label: 'CSCS' },
  { label: 'Payment' },
  { label: 'Review' }
]

const progressWidth = computed(() => `${((currentStep.value + 1) / steps.length) * 100}%`)
const calculateAmountPayable = computed(() => formData.shares_applied * 9.5)

const signatureType = computed(() => {
  if (formData.account_type === 'INDIVIDUAL') return 'individual'
  if (formData.account_type === 'CORPORATE') return 'corporate'
  return 'joint'
})

const currentSignatureFilename = computed(() => {
  if (formData.account_type === 'INDIVIDUAL') return formData.individual_signature_filename
  if (formData.account_type === 'CORPORATE') return formData.corporate_signature_filename
  return formData.joint_signature_filename
})

const personalSummary = computed(() => [
  { label: 'Name', value: `${formData.title} ${formData.surname} ${formData.first_name}` },
  { label: 'Address', value: formData.address },
  { label: 'City/State', value: `${formData.city}, ${formData.state}` },
  { label: 'Phone', value: formData.phone },
  { label: 'Email', value: formData.email },
  { label: 'Date of Birth', value: formatDate(formData.dob) },
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
  const safe = { ...formData }
  safe.payment_receipt = ''
  safe.payment_receipt_filename = ''
  safe.payment_receipt_mime = ''
  safe.individual_signature = ''
  safe.corporate_signature = ''
  safe.joint_signature = ''
  safe.individual_signature_filename = ''
  safe.corporate_signature_filename = ''
  safe.joint_signature_filename = ''
  localStorage.setItem('publicOfferApplication', JSON.stringify(safe))
}

const goToStep = (index) => {
  // Allow backward navigation freely; forward navigation only if prior steps valid
  if (index <= currentStep.value) {
    currentStep.value = index
    return
  }
  if (index === currentStep.value + 1 && validateStep(currentStep.value)) {
    currentStep.value = index
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const nextStep = () => {
  if (currentStep.value < steps.length - 1 && validateStep(currentStep.value)) {
    currentStep.value++
    persist()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return isNaN(date) ? '' : date.toLocaleDateString('en-GB')
}

const isEmpty = (val) => !val || !String(val).trim()
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email)

const validateStep = (stepIndex) => {
  const step = stepIndex ?? currentStep.value
  if (step === 0) {
    if (formData.title === 'OTHERS' && isEmpty(formData.title_others)) {
      toast.error('Please specify your title')
      return false
    }
    const required = [
      { key: 'surname', label: 'Surname' },
      { key: 'first_name', label: 'First name' },
      { key: 'address', label: 'Address' },
      { key: 'city', label: 'City' },
      { key: 'state', label: 'State' },
      { key: 'phone', label: 'Phone number' },
      { key: 'email', label: 'Email' },
      { key: 'dob', label: 'Date of birth' },
      { key: 'next_of_kin', label: 'Next of kin' }
    ]
    const missing = required.find((f) => isEmpty(formData[f.key]))
    if (missing) {
      toast.error(`Please enter your ${missing.label}`)
      return false
    }
    if (!isValidEmail(formData.email)) {
      toast.error('Please enter a valid email address')
      return false
    }
    if (isNaN(new Date(formData.dob).getTime())) {
      toast.error('Please enter a valid date of birth')
      return false
    }
    return true
  }

  if (step === 1) {
    const shares = Number(formData.shares_applied || 0)
    if (!shares || shares < 1000 || shares % 1000 !== 0) {
      toast.error('Shares must be at least 1,000 and in multiples of 1,000')
      return false
    }
    return true
  }

  if (step === 2) {
    if (isEmpty(formData.stockbrokers_id)) {
      toast.error('Please select your stockbroker')
      return false
    }
    if (isEmpty(formData.cscs_no)) {
      toast.error('Please enter your CSCS account number')
      return false
    }
    if (formData.account_type === 'CORPORATE' && isEmpty(formData.contact_person)) {
      toast.error('Please enter a contact person')
      return false
    }
    return true
  }

  if (step === 3) {
    if (!formData.payment_receipt) {
      toast.error('Please upload your evidence of payment')
      return false
    }
    const sigField = formData.account_type.toLowerCase() + '_signature'
    if (!formData[sigField]) {
      toast.error(`Please upload your ${formData.account_type.toLowerCase()} signature`)
      return false
    }
    const required = [
      { key: 'bank_name', label: 'Bank name' },
      { key: 'account_number', label: 'Account number' },
      { key: 'bvn', label: 'BVN' },
      { key: 'branch', label: 'Branch' },
      { key: 'bank_city', label: 'Branch city' }
    ]
    const missing = required.find((f) => isEmpty(formData[f.key]))
    if (missing) {
      toast.error(`Please enter your ${missing.label}`)
      return false
    }
    return true
  }

  return true
}

const getStockbrokerName = (brokerId) => {
  const broker = stockbrokers.value.find((b) => b.id === brokerId)
  return broker ? `${broker.name} (${broker.code})` : ''
}

const submitApplication = async () => {
  try {
    isSubmitting.value = true

    // Validate all steps before final submit
    for (let stepIndex = 0; stepIndex <= 3; stepIndex++) {
      const ok = validateStep(stepIndex)
      if (!ok) {
        currentStep.value = stepIndex
        isSubmitting.value = false
        return
      }
    }

    if (uploadsBusy.value) {
      toast.info('Uploading files... please wait')
      return
    }

    // Show informative message
    toast.info('Submitting application... This may take a moment while we process your files and generate your PDF.', {
      timeout: 5000
    })

    const payload = {
      ...formData,
      dob: new Date(formData.dob).toISOString().split('T')[0]
    }

    const response = await publicOfferAPI.submit(payload)
    if (response.data?.success) {
      toast.success('Application submitted successfully!')
      localStorage.removeItem('publicOfferApplication')
      router.push(`/submission/${response.data.data.id}`)
    } else {
      throw new Error(response.data?.message || 'Submission failed')
    }
  } catch (error) {
    // Handle timeout errors specifically
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      toast.error('Request timed out. The server is processing your application. Please check your email for confirmation or try again in a few moments.')
    } else if (error.response?.status === 413) {
      toast.error('File size too large. Please ensure files are under 8MB each.')
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again in a few moments or contact support.')
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message)
    } else {
      toast.error(error.message || 'Error submitting application. Please try again.')
    }
  } finally {
    isSubmitting.value = false
  }
}

const loadBanks = () => {
  try {
    isLoadingBanks.value = true
    // Extract banks from the JSON data structure
    if (banksData?.data && Array.isArray(banksData.data)) {
      // Sort banks alphabetically by name for easier selection
      banks.value = banksData.data.sort((a, b) => {
        const nameA = a.bankname?.toUpperCase() || ''
        const nameB = b.bankname?.toUpperCase() || ''
        return nameA.localeCompare(nameB)
      })
    } else {
      banks.value = []
      console.warn('Banks data structure is invalid')
    }
  } catch (error) {
    console.error('Error loading banks:', error)
    toast.error('Failed to load banks list')
    banks.value = []
  } finally {
    isLoadingBanks.value = false
  }
}

onMounted(() => {
  const savedData = localStorage.getItem('publicOfferApplication')
  if (savedData) Object.assign(formData, JSON.parse(savedData))
  fetchStockbrokers()
  loadBanks()
})

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024

const onReceiptSelected = async (event) => {
  const file = event?.target?.files?.[0]
  if (!file) return
  if (file.size > MAX_UPLOAD_BYTES) {
    toast.error('File too large. Max 8MB allowed.')
    return
  }
  uploadsBusy.value = true
  const dataUrl = await readFileAsDataUrl(file)
  formData.payment_receipt = dataUrl
  formData.payment_receipt_filename = file.name
  formData.payment_receipt_mime = file.type || ''
  uploadsBusy.value = false
}

const onSignatureSelected = async (kind, event) => {
  const file = event?.target?.files?.[0]
  if (!file) return
  if (file.size > MAX_UPLOAD_BYTES) {
    toast.error('File too large. Max 8MB allowed.')
    return
  }
  uploadsBusy.value = true
  const dataUrl = await readFileAsDataUrl(file)
  if (kind === 'individual') {
    formData.individual_signature = dataUrl
    formData.individual_signature_filename = file.name
  } else if (kind === 'corporate') {
    formData.corporate_signature = dataUrl
    formData.corporate_signature_filename = file.name
  } else {
    formData.joint_signature = dataUrl
    formData.joint_signature_filename = file.name
  }
  uploadsBusy.value = false
}

const validateSharesInput = () => {
  const shares = Number(formData.shares_applied)
  
  // Clear error if field is empty
  if (!formData.shares_applied || formData.shares_applied === '') {
    sharesValidationError.value = ''
    return
  }
  
  // Check if it's a valid number
  if (isNaN(shares) || shares <= 0) {
    sharesValidationError.value = 'Please enter a valid number'
    return
  }
  
  // Check minimum
  if (shares < 1000) {
    sharesValidationError.value = 'Minimum investment is 1,000 shares'
    return
  }
  
  // Check if it's a multiple of 1000
  if (shares % 1000 !== 0) {
    sharesValidationError.value = 'Shares must be in multiples of 1,000 (e.g., 1,000, 2,000, 3,000, etc.)'
    return
  }
  
  // Clear error if valid
  sharesValidationError.value = ''
}
</script>

<style scoped>
/* ========================================
   Clean Theme - Solid Colors Only
   Primary: #2563eb (Blue)
   Secondary: #107b5f (Teal)
   ======================================== */

* {
  box-sizing: border-box;
}

.jotform-page {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --secondary: #107b5f;
  --secondary-dark: #0d6b52;
  --text-dark: #1f2937;
  --text-medium: #4b5563;
  --text-light: #6b7280;
  --border-color: #e5e7eb;
  --bg-light: #f9fafb;
  --bg-white: #ffffff;
  --success: #059669;
  --error: #dc2626;

  min-height: 100vh;
  background: #f3f4f6;
  padding: 1rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

@media (min-width: 1024px) {
  .jotform-page {
    padding: 2rem;
    transform: scale(0.9);
    transform-origin: top center;
  }
}

/* Header */
.form-header {
  max-width: 800px;
  margin: 0 auto 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.form-header__brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1 1 auto;
  min-width: 240px;
}

.form-header__logo {
  width: 56px;
  height: 56px;
  background: var(--secondary);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.25rem;
  color: white;
}

.form-header__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
}

.form-header__subtitle {
  margin: 0.25rem 0 0;
  color: var(--text-light);
  font-size: 0.9rem;
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: var(--bg-white);
  border: 1px solid var(--border-color);
 
  color: var(--text-medium);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-back:hover {
  border-color: var(--primary);
  color: var(--primary);
}

/* Steps */
.steps-container {
  max-width: 800px;
  margin: 0 auto 1.5rem;
  background: var(--bg-white);
  padding: 1.25rem;
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.steps {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.steps::-webkit-scrollbar {
  display: none;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  flex: 1;
  min-width: 70px;
  position: relative;
}

.step__number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--bg-light);
  border: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-light);
  transition: all 0.3s;
  position: relative;
  z-index: 1;
}

.step__label {
  font-size: 0.75rem;
  color: var(--text-light);
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
}

.step--active .step__number {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
}

.step--active .step__label {
  color: var(--primary);
  font-weight: 600;
}

.step--done .step__number {
  background: var(--secondary);
  border-color: var(--secondary);
  color: white;
}

.step--done .step__label {
  color: var(--secondary);
}

.progress-bar {
  height: 6px;
  background: var(--bg-light);
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background: var(--secondary);
  border-radius: 3px;
  transition: width 0.4s ease;
}

/* Form Card */
.form-card {
  max-width: 800px;
  margin: 0 auto;
  background: var(--bg-white);

  padding: 2rem;
  border: 1px solid var(--border-color);
}

@media (max-width: 640px) {
  .form-card {
    padding: 1.25rem;
    border-radius: 16px;
  }
}

/* Section Header */
.section-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.75rem;
  padding-bottom: 1.25rem;
  border-bottom: 2px solid var(--bg-light);
}

.section-header__icon {
  width: 48px;
  height: 48px;
  background: rgba(16, 123, 95, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.section-header__title {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-dark);
}

.section-header__desc {
  margin: 0.25rem 0 0;
  color: var(--text-light);
  font-size: 0.9rem;
}

/* Form Groups */
.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-dark);
}

.required {
  color: var(--error);
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  font-size: 1rem;
  color: var(--text-dark);
  background: var(--bg-white);
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
}

.form-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: var(--bg-light);
}

select.form-input {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%234b5563' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

.form-input::placeholder {
  color: var(--text-light);
}

.form-input--lg {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  padding: 1.25rem;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-hint {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: var(--text-light);
}

.form-input--error {
  border-color: var(--error) !important;
}

.form-input--error:focus {
  border-color: var(--error) !important;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-alert {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-alert--error {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecdd3;
}

.form-alert svg {
  flex-shrink: 0;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row--2col {
  flex-wrap: wrap;
}

.form-row--2col > .form-group {
  flex: 1;
  min-width: 200px;
}

.form-divider {
  height: 1px;
  background: var(--border-color);
  margin: 1.5rem 0;
}

.subsection-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0 0 1rem;
}

/* Info Cards */
.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-card {
  background: var(--bg-light);
  border: 1px solid var(--border-color);

  padding: 1rem;
  text-align: center;
}

.info-card__value {
  display: block;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--primary);
}

.info-card__label {
  display: block;
  font-size: 0.8rem;
  color: var(--text-light);
  margin-top: 0.25rem;
}

/* Total Box */
.total-box {
  background: var(--secondary);

  padding: 1.25rem;
  color: white;
}

.total-box__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-box__label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.total-box__value {
  font-weight: 600;
}

.total-box__value--big {
  font-size: 1.5rem;
  font-weight: 800;
}

.total-box__divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0.75rem 0;
}

/* Payment Notice */
.payment-notice {
  background: rgba(16, 123, 95, 0.06);
  border: 1px solid rgba(16, 123, 95, 0.2);
 
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.payment-notice__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--secondary);
  margin-bottom: 0.5rem;
}

.payment-notice__text {
  margin: 0 0 1rem;
  color: var(--text-dark);
  font-size: 0.9rem;
}

.payment-accounts {
  display: grid;
  gap: 0.75rem;
}

.payment-account {
  background: var(--bg-white);
  border: 1px solid var(--border-color);

  padding: 0.875rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
}

.payment-account__number {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--secondary);
  font-family: 'Courier New', monospace;
}

.payment-account__name {
  color: var(--text-medium);
  font-size: 0.875rem;
}

.payment-account__bank {
  background: var(--secondary);
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* File Upload */
.file-upload {
  position: relative;
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  background: var(--bg-light);
  cursor: pointer;
  transition: all 0.2s;
}

.file-upload:hover {
  border-color: var(--primary);
  background: rgba(37, 99, 235, 0.02);
}

.file-upload--has-file {
  border-color: var(--secondary);
  border-style: solid;
  background: rgba(16, 123, 95, 0.05);
}

.file-upload__input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.file-upload__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
}

.file-upload__content svg {
  color: var(--primary);
}

.file-upload--has-file .file-upload__content svg {
  color: var(--secondary);
}

.file-upload__filename {
  color: var(--secondary);
  font-weight: 600;
}

.file-upload__text {
  font-size: 0.9rem;
}

/* Review */
.review-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.review-block {
  background: var(--bg-light);
  border-radius: 12px;
  padding: 1.25rem;
}

.review-block__title {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.review-block__items {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.review-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.review-item__label {
  color: var(--text-light);
  font-size: 0.85rem;
}

.review-item__value {
  color: var(--text-dark);
  font-weight: 500;
  font-size: 0.85rem;
  text-align: right;
}

.review-uploads {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.review-upload {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: rgba(16, 123, 95, 0.1);
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--secondary);
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--bg-light);
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 1.5rem;
 
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn--secondary {
  background: var(--bg-light);
  color: var(--text-medium);
  border: 1px solid var(--border-color);
}

.btn--secondary:hover:not(:disabled) {
  background: var(--border-color);
}

.btn--secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn--primary {
  background: var(--primary);
  color: white;
}

.btn--primary:hover {
  background: var(--primary-dark);
}

.btn--success {
  background: var(--secondary);
  color: white;
}

.btn--success:hover:not(:disabled) {
  background: var(--secondary-dark);
}

.btn--success:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Date Input Responsive */
.form-input--date {
  font-size: 1rem;
}

.form-group--date {
  position: relative;
}

/* Responsive */
@media (max-width: 640px) {
  .form-header {
    flex-direction: column;
    align-items: stretch;
  }

  .form-header__brand {
    justify-content: flex-start;
  }

  .btn-back {
    width: 100%;
    justify-content: center;
  }

  /* Modernized Mobile Steps */
  .steps-container {
    padding: 1rem;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .steps {
    gap: 0.5rem;
    padding: 0.5rem 0;
    margin-bottom: 1.25rem;
    justify-content: center;
  }

  .step {
    min-width: 50px;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 12px;
    transition: background 0.2s;
  }

  .step:hover {
    background: rgba(37, 99, 235, 0.04);
  }

  .step--active {
    background: rgba(37, 99, 235, 0.08);
  }

  .step__number {
    width: 44px;
    height: 44px;
    font-size: 1rem;
    flex-shrink: 0;
  }

  .step__label {
    display: none;
  }

  .progress-bar {
    height: 4px;
    border-radius: 2px;
  }

  /* Date Field Responsive */
  .form-row--2col {
    flex-direction: column;
  }

  .form-group--date {
    min-width: 80%;
    width: 80%;
    flex: 0 0 80%;
    align-self: center;
  }

  .form-input--date {
    font-size: 16px; /* Prevents zoom on iOS */
    padding: 0.875rem 1rem;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    display: block;
    box-sizing: border-box;
  }

  .form-row--2col > .form-group {
    min-width: 100%;
    width: 100%;
    flex: 1 1 100%;
  }

  .form-row--2col > .form-group:not(.form-group--date) {
    margin-top: 0;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .review-grid {
    grid-template-columns: 1fr;
  }
}
</style>
