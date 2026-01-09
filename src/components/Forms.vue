<template>
  <div class="forms-page">
    <!-- Modern Navigation Header -->
    <div class="navigation-header">
      <router-link to="/" class="back-button">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Back to Home</span>
      </router-link>
    </div>

    <!-- Modern Header with Gradient -->
    <!-- <div class="page-header">
      <div class="header-content">
        <div class="header-badge">Public Offering</div>
        <h1>Share Application Form</h1>
        <p>Complete your investment in The Initiates PLC</p>
      </div>
    </div> -->

    <!-- Modern Progress Indicator -->
    <div class="progress-section">
      <div class="progress-track">
        <div class="progress-glow" :style="{ width: progressWidth }"></div>
        <div class="progress-fill" :style="{ width: progressWidth }"></div>
      </div>
      <div class="progress-steps">
        <div v-for="(step, index) in steps" :key="index" 
             class="progress-step" 
             :class="{ active: currentStep === index, completed: currentStep > index }">
          <div class="step-circle">
            <div class="step-inner">
              <svg v-if="currentStep > index" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              <span v-else>{{ index + 1 }}</span>
            </div>
          </div>
          <div class="step-label">{{ step.label }}</div>
        </div>
      </div>
    </div>

    <!-- Form Sections with Modern Cards -->
    <div class="form-container">
      <!-- Personal Details -->
      <div v-if="currentStep === 0" class="form-section animate-in">
        <div class="section-header">
          <div class="section-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
            </svg>
          </div>
          <div>
            <h2>Personal Information</h2>
            <p>Tell us about yourself</p>
          </div>
        </div>

        <div class="form-content">
          <div class="form-group">
            <label class="modern-label">
              <span>Account Type</span>
              <span class="required">*</span>
            </label>
            <div class="select-wrapper">
              <select v-model="formData.account_type" class="modern-select" required>
                <option value="INDIVIDUAL">Individual</option>
                <option value="CORPORATE">Corporate</option>
                <option value="JOINT">Joint</option>
              </select>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label class="modern-label">
                <span>Title</span>
                <span class="required">*</span>
              </label>
              <div class="select-wrapper">
                <select v-model="formData.title" class="modern-select" required>
                  <option value="MR">Mr</option>
                  <option value="MRS">Mrs</option>
                  <option value="MISS">Miss</option>
                  <option value="OTHERS">Others</option>
                </select>
              </div>
              <div v-if="formData.title === 'OTHERS'" class="nested-field">
                <input 
                  v-model="formData.title_others" 
                  type="text" 
                  class="modern-input" 
                  required
                  placeholder="Specify your title">
              </div>
            </div>
            <div class="form-group">
              <label class="modern-label">
                <span>Surname</span>
                <span class="required">*</span>
              </label>
              <input v-model="formData.surname" type="text" class="modern-input" placeholder="Enter your surname" required>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label class="modern-label">
                <span>First Name</span>
                <span class="required">*</span>
              </label>
              <input v-model="formData.first_name" type="text" class="modern-input" placeholder="Enter your first name" required>
            </div>
            <div class="form-group">
              <label class="modern-label">Other Names</label>
              <input v-model="formData.other_names" type="text" class="modern-input" placeholder="Enter other names (optional)">
            </div>
          </div>

          <div class="form-group">
            <label class="modern-label">
              <span>Residential Address</span>
              <span class="required">*</span>
            </label>
            <textarea v-model="formData.address" class="modern-textarea" rows="3" placeholder="Enter your full address" required></textarea>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label class="modern-label">
                <span>City</span>
                <span class="required">*</span>
              </label>
              <input v-model="formData.city" type="text" class="modern-input" placeholder="Enter city" required>
            </div>
            <div class="form-group">
              <label class="modern-label">
                <span>State</span>
                <span class="required">*</span>
              </label>
              <input v-model="formData.state" type="text" class="modern-input" placeholder="Enter state" required>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label class="modern-label">
                <span>Phone Number</span>
                <span class="required">*</span>
              </label>
              <input v-model="formData.phone" type="tel" class="modern-input" placeholder="+234 800 000 0000" required>
            </div>
            <div class="form-group">
              <label class="modern-label">
                <span>Email Address</span>
                <span class="required">*</span>
              </label>
              <input v-model="formData.email" type="email" class="modern-input" placeholder="your@email.com" required>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label class="modern-label">
                <span>Date of Birth</span>
                <span class="required">*</span>
              </label>
              <input v-model="formData.dob" type="date" class="modern-input" required>
            </div>
            <div class="form-group">
              <label class="modern-label">
                <span>Next of Kin</span>
                <span class="required">*</span>
              </label>
              <input v-model="formData.next_of_kin" type="text" class="modern-input" placeholder="Full name of next of kin" required>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="nextStep" class="btn btn-primary">
            <span>Continue</span>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Investment Details -->
      <div v-if="currentStep === 1" class="form-section animate-in">
        <div class="section-header">
          <div class="section-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div>
            <h2>Investment Details</h2>
            <p>Choose your investment amount</p>
          </div>
        </div>

        <div class="form-content">
          <div class="investment-cards">
            <div class="info-card gradient-1">
              <div class="card-icon">₦</div>
              <div class="card-label">Price per Share</div>
              <div class="card-value">₦9.50</div>
            </div>
            <div class="info-card gradient-2">
              <div class="card-icon">📊</div>
              <div class="card-label">Minimum Purchase</div>
              <div class="card-value">1,000 shares</div>
            </div>
            <div class="info-card gradient-3">
              <div class="card-icon">➕</div>
              <div class="card-label">Multiples</div>
              <div class="card-value">1,000 shares</div>
            </div>
          </div>

          <div class="form-group">
            <label class="modern-label">
              <span>Number of Shares</span>
              <span class="required">*</span>
            </label>
            <div class="input-with-hint">
              <input v-model.number="formData.shares_applied" 
                     type="number" 
                     class="modern-input large-input" 
                     min="1000" 
                     step="1000" 
                     placeholder="1000"
                     required>
              <div class="input-hint">Minimum: 1,000 shares in multiples of 1,000</div>
            </div>
          </div>

          <div class="amount-card">
            <div class="amount-label">Total Investment</div>
            <div class="amount-value">₦{{ calculateAmountPayable.toLocaleString() }}</div>
            <div class="amount-shares">{{ formData.shares_applied?.toLocaleString() || 0 }} shares</div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="prevStep" class="btn btn-secondary">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>Back</span>
          </button>
          <button type="button" @click="nextStep" class="btn btn-primary">
            <span>Continue</span>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- CSCS Details -->
      <div v-if="currentStep === 2" class="form-section animate-in">
        <div class="section-header">
          <div class="section-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z"/>
            </svg>
          </div>
          <div>
            <h2>CSCS Information</h2>
            <p>Your securities account details</p>
          </div>
        </div>

        <div class="form-content">
          <div class="form-group">
            <label class="modern-label">
              <span>Stockbroker</span>
              <span class="required">*</span>
            </label>
            <div class="select-wrapper">
              <select v-model="formData.stockbrokers_id" class="modern-select" required :disabled="isLoadingStockbrokers">
                <option value="">{{ isLoadingStockbrokers ? 'Loading...' : 'Select your stockbroker' }}</option>
                <option v-for="broker in stockbrokers" :key="broker.id" :value="broker.id">
                  {{ broker.name }} ({{ broker.code }})
                </option>
              </select>
            </div>
            <div v-if="isLoadingStockbrokers" class="loading-indicator">
              <div class="spinner"></div>
              <span>Loading stockbrokers...</span>
            </div>
          </div>

          <div class="form-group">
            <label class="modern-label">
              <span>CSCS Account Number</span>
              <span class="required">*</span>
            </label>
            <input v-model="formData.cscs_no" type="text" class="modern-input" placeholder="Enter CSCS number" required>
          </div>

          <div class="form-group">
            <label class="modern-label">CHN Number</label>
            <input v-model="formData.chn" type="text" class="modern-input" placeholder="Clearing House Number (optional)">
          </div>

          <div v-if="formData.account_type === 'CORPORATE'" class="form-group">
            <label class="modern-label">
              <span>Contact Person</span>
              <span class="required">*</span>
            </label>
            <input v-model="formData.contact_person" type="text" class="modern-input" placeholder="Enter contact person name" required>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="prevStep" class="btn btn-secondary">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>Back</span>
          </button>
          <button type="button" @click="nextStep" class="btn btn-primary">
            <span>Continue</span>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Bank Details -->
      <div v-if="currentStep === 3" class="form-section animate-in">
        <div class="section-header">
          <div class="section-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
          </div>
          <div>
            <h2>Bank Details</h2>
            <p>Your banking information</p>
          </div>
        </div>

        <div class="form-content">
          <div class="form-group">
            <label class="modern-label">
              <span>Bank Name</span>
              <span class="required">*</span>
            </label>
            <input v-model="formData.bank_name" type="text" class="modern-input" placeholder="Enter bank name" required>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label class="modern-label">
                <span>Bank Verification Number (BVN)</span>
                <span class="required">*</span>
              </label>
              <input v-model="formData.bvn" type="text" class="modern-input" placeholder="11-digit BVN" required maxlength="11">
            </div>
            <div class="form-group">
              <label class="modern-label">
                <span>Account Number</span>
                <span class="required">*</span>
              </label>
              <input v-model="formData.account_number" type="text" class="modern-input" placeholder="10-digit account number" required>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label class="modern-label">
                <span>Branch</span>
                <span class="required">*</span>
              </label>
              <input v-model="formData.branch" type="text" class="modern-input" placeholder="Branch name" required>
            </div>
            <div class="form-group">
              <label class="modern-label">
                <span>City</span>
                <span class="required">*</span>
              </label>
              <input v-model="formData.bank_city" type="text" class="modern-input" placeholder="Branch city" required>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="prevStep" class="btn btn-secondary">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>Back</span>
          </button>
          <button type="button" @click="nextStep" class="btn btn-primary">
            <span>Review Application</span>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Review & Submit -->
      <div v-if="currentStep === 4" class="form-section animate-in">
        <div class="section-header">
          <div class="section-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
          </div>
          <div>
            <h2>Review Application</h2>
            <p>Please verify all information before submitting</p>
          </div>
        </div>

        <div class="review-grid">
          <div class="review-card">
            <div class="review-header">
              <svg class="review-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
              </svg>
              <h3>Personal Details</h3>
            </div>
            <div class="review-content">
              <div class="review-item">
                <span class="label">Account Type:</span>
                <span class="value">{{ formData.account_type }}</span>
              </div>
              <div class="review-item">
                <span class="label">Name:</span>
                <span class="value">{{ formData.title }} {{ formData.surname }} {{ formData.first_name }}</span>
              </div>
              <div class="review-item">
                <span class="label">Address:</span>
                <span class="value">{{ formData.address }}</span>
              </div>
              <div class="review-item">
                <span class="label">City/State:</span>
                <span class="value">{{ formData.city }}, {{ formData.state }}</span>
              </div>
              <div class="review-item">
                <span class="label">Phone:</span>
                <span class="value">{{ formData.phone }}</span>
              </div>
              <div class="review-item">
                <span class="label">Email:</span>
                <span class="value">{{ formData.email }}</span>
              </div>
              <div class="review-item">
                <span class="label">Date of Birth:</span>
                <span class="value">{{ formatDate(formData.dob) }}</span>
              </div>
              <div class="review-item">
                <span class="label">Next of Kin:</span>
                <span class="value">{{ formData.next_of_kin }}</span>
              </div>
            </div>
          </div>

          <div class="review-card">
            <div class="review-header">
              <svg class="review-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              <h3>Investment Details</h3>
            </div>
            <div class="review-content">
              <div class="review-item highlight">
                <span class="label">Shares Applied:</span>
                <span class="value">{{ formData.shares_applied?.toLocaleString() }}</span>
              </div>
              <div class="review-item highlight">
                <span class="label">Amount Payable:</span>
                <span class="value">₦{{ calculateAmountPayable?.toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <div class="review-card">
            <div class="review-header">
              <svg class="review-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z"/>
              </svg>
              <h3>CSCS Details</h3>
            </div>
            <div class="review-content">
              <div class="review-item">
                <span class="label">CHN Number:</span>
                <span class="value">{{ formData.chn || 'N/A' }}</span>
              </div>
              <div class="review-item">
                <span class="label">CSCS Number:</span>
                <span class="value">{{ formData.cscs_no }}</span>
              </div>
              <div class="review-item">
                <span class="label">Stockbroker:</span>
                <span class="value">{{ getStockbrokerName(formData.stockbrokers_id) }}</span>
              </div>
            </div>
          </div>

          <div class="review-card">
            <div class="review-header">
              <svg class="review-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              <h3>Bank Details</h3>
            </div>
            <div class="review-content">
              <div class="review-item">
                <span class="label">Bank Name:</span>
                <span class="value">{{ formData.bank_name }}</span>
              </div>
              <div class="review-item">
                <span class="label">Account Number:</span>
                <span class="value">{{ formData.account_number }}</span>
              </div>
              <div class="review-item">
                <span class="label">BVN:</span>
                <span class="value">{{ formData.bvn }}</span>
              </div>
              <div class="review-item">
                <span class="label">Branch:</span>
                <span class="value">{{ formData.branch }}, {{ formData.bank_city }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="prevStep" class="btn btn-secondary">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>Back</span>
          </button>
          <button type="button" @click="submitApplication" class="btn btn-success" :disabled="isSubmitting">
            <svg v-if="!isSubmitting" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <div v-else class="spinner"></div>
            <span>{{ isSubmitting ? 'Submitting...' : 'Submit Application' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { publicOfferAPI } from '../services/api'

export default {
  name: 'Forms',
  setup() {
    const router = useRouter()
    const currentStep = ref(0)
    const isSubmitting = ref(false)
    const isLoadingStockbrokers = ref(false)
    
    const formData = reactive({
      account_type: 'INDIVIDUAL',
      title: 'MR',
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

    const stockbrokers = ref([])

    const steps = [
      { label: 'Personal Details' },
      { label: 'Investment' },
      { label: 'CSCS Details' },
      { label: 'Bank Details' },
      { label: 'Review & Submit' }
    ]

    const progressWidth = computed(() => {
      return `${((currentStep.value + 1) / steps.length) * 100}%`
    })

    const calculateAmountPayable = computed(() => {
      return formData.shares_applied * 9.50
    })

    const fetchStockbrokers = async () => {
      try {
        isLoadingStockbrokers.value = true
        const response = await publicOfferAPI.getStockbrokers()
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          stockbrokers.value = response.data.data
        } else {
          console.error('Unexpected response format:', response.data)
          stockbrokers.value = []
        }
      } catch (error) {
        console.error('Error fetching stockbrokers:', error)
        stockbrokers.value = []
      } finally {
        isLoadingStockbrokers.value = false
      }
    }

    const nextStep = async () => {
      if (currentStep.value < steps.length - 1) {
        currentStep.value++
        localStorage.setItem('publicOfferApplication', JSON.stringify(formData))
      }
    }

    const prevStep = () => {
      if (currentStep.value > 0) {
        currentStep.value--
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-GB')
    }

    const getStockbrokerName = (brokerId) => {
      const broker = stockbrokers.value.find(b => b.id === brokerId)
      return broker ? `${broker.name} (${broker.code})` : ''
    }

    const submitApplication = async () => {
      try {
        isSubmitting.value = true
        
        if (!formData.dob || isNaN(new Date(formData.dob).getTime())) {
          alert('Please enter a valid date of birth')
          isSubmitting.value = false
          return
        }

        const formattedData = {
          ...formData,
          dob: new Date(formData.dob).toISOString().split('T')[0],
          individual_signature: formData.account_type === 'INDIVIDUAL' ? 'SIGNED' : null,
          corporate_signature: formData.account_type === 'CORPORATE' ? 'SIGNED' : null,
          joint_signature: formData.account_type === 'JOINT' ? 'SIGNED' : null
        }

        const response = await publicOfferAPI.submit(formattedData)
        
        if (response.data && response.data.success) {
          router.push(`/submission/${response.data.data.id}`)
          localStorage.removeItem('publicOfferApplication')
        } else {
          throw new Error(response.data?.message || 'Submission failed')
        }
      } catch (error) {
        console.error('Submission error:', error)
        alert('Error submitting application: ' + error.message)
      } finally {
        isSubmitting.value = false
      }
    }

    onMounted(() => {
      const savedData = localStorage.getItem('publicOfferApplication')
      if (savedData) {
        Object.assign(formData, JSON.parse(savedData))
      }
      fetchStockbrokers()
    })

    return {
      currentStep,
      formData,
      stockbrokers,
      steps,
      progressWidth,
      calculateAmountPayable,
      isSubmitting,
      isLoadingStockbrokers,
      nextStep,
      prevStep,
      formatDate,
      getStockbrokerName,
      submitApplication
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.forms-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  position: relative;
}

.forms-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.navigation-header {
  max-width: 1200px;
  margin: 0 auto 2rem;
  position: relative;
  z-index: 10;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.back-button .icon {
  width: 20px;
  height: 20px;
}

.page-header {
  max-width: 1200px;
  margin: 0 auto 3rem;
  text-align: center;
  position: relative;
  z-index: 10;
}

.header-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 3rem 2rem;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.header-badge {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #64748b;
  font-size: 1.125rem;
  margin: 0;
}

.progress-section {
  max-width: 1200px;
  margin: 0 auto 3rem;
  position: relative;
  z-index: 10;
}

.progress-track {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.progress-glow {
  position: absolute;
  top: -2px;
  left: 0;
  height: 12px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  filter: blur(8px);
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.6;
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 50px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.step-circle {
  width: 56px;
  height: 56px;
  padding: 3px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
  border-radius: 50%;
  margin-bottom: 0.75rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.progress-step.active .step-circle {
  background: linear-gradient(135deg, #667eea, #764ba2);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  transform: scale(1.1);
}

.progress-step.completed .step-circle {
  background: linear-gradient(135deg, #10b981, #059669);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
}

.step-inner {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  color: #94a3b8;
}

.progress-step.active .step-inner {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.progress-step.completed .step-inner {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.check-icon {
  width: 24px;
  height: 24px;
}

.step-label {
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
}

.progress-step.active .step-label {
  color: white;
  font-size: 0.9375rem;
}

.form-container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.form-section {
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.animate-in {
  animation: slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f1f5f9;
}

.section-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.section-icon svg {
  width: 28px;
  height: 28px;
  stroke: white;
}

.section-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.section-header p {
  color: #64748b;
  margin: 0;
  font-size: 0.9375rem;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.modern-label {
  font-weight: 600;
  color: #334155;
  font-size: 0.9375rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.required {
  color: #ef4444;
  font-size: 1rem;
}

.modern-input,
.modern-select,
.modern-textarea {
  padding: 0.875rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  color: #1e293b;
}

.modern-input:focus,
.modern-select:focus,
.modern-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.modern-input::placeholder {
  color: #94a3b8;
}

.large-input {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  padding: 1.25rem;
}

.select-wrapper {
  position: relative;
}

.select-wrapper::after {
  content: '';
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #64748b;
  pointer-events: none;
}

.modern-select {
  appearance: none;
  width: 100%;
  cursor: pointer;
  padding-right: 3rem;
}

.nested-field {
  margin-top: 0.75rem;
  padding-left: 1rem;
  border-left: 3px solid #667eea;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.input-with-hint {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-hint {
  font-size: 0.875rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.investment-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-card {
  padding: 1.5rem;
  border-radius: 16px;
  color: white;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-4px);
}

.gradient-1 {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.gradient-2 {
  background: linear-gradient(135deg, #f093fb, #f5576c);
}

.gradient-3 {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.card-label {
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
}

.card-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.amount-card {
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  color: white;
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
  margin: 2rem 0;
}

.amount-label {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.amount-value {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.amount-shares {
  font-size: 1.125rem;
  opacity: 0.9;
}

.loading-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f1f5f9;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #64748b;
}

.review-grid {
  display: grid;
  gap: 1.5rem;
}

.review-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.review-card:hover {
  border-color: #667eea;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.1);
}

.review-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
}

.review-icon {
  width: 24px;
  height: 24px;
  stroke: #667eea;
}

.review-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
}

.review-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.review-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: white;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.review-item:hover {
  background: #f1f5f9;
}

.review-item.highlight {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  font-weight: 600;
}

.review-item .label {
  color: #64748b;
  font-size: 0.9375rem;
}

.review-item .value {
  color: #1e293b;
  font-weight: 600;
  text-align: right;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #f1f5f9;
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn .icon {
  width: 20px;
  height: 20px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #f1f5f9;
  color: #64748b;
}

.btn-secondary:hover {
  background: #e2e8f0;
  color: #334155;
}

.btn-success {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
}

.btn-success:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(16, 185, 129, 0.4);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .forms-page {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 1.75rem;
  }

  .form-section {
    padding: 1.5rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .progress-steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  .step-label {
    font-size: 0.75rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .investment-cards {
    grid-template-columns: 1fr;
  }

  .amount-value {
    font-size: 2rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-secondary {
    order: 2;
  }

  .review-item {
    flex-direction: column;
    gap: 0.25rem;
  }

  .review-item .value {
    text-align: left;
  }
}
</style>