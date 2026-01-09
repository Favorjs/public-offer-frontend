<!-- Submission.vue -->
<template>
  <div class="submission-page">
    <!-- Background Orbs -->
    <div class="background-orbs">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>

    <div class="submission-container">
      <div class="success-card">
        <!-- Success Header -->
        <div class="success-header">
          <div class="success-icon-wrapper">
            <svg class="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div class="success-badge">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <span>Application Submitted</span>
          </div>
        </div>

        <!-- Main Content -->
        <div class="success-content">
          <h1 class="success-title">Application Submitted Successfully!</h1>
          <p class="success-description">Your application has been received and is being processed. You'll receive a confirmation email shortly.</p>
          
          <div class="application-id-card">
            <div class="id-label">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <polyline points="17 11 19 13 23 9"/>
              </svg>
              <span>Application Reference</span>
            </div>
            <div class="id-value">{{ applicationId }}</div>
          </div>

          <!-- Download Section -->
          <div class="download-section">
            <div class="section-header">
              <h3>Download Application Form</h3>
              <p>Keep a copy of your application for your records</p>
            </div>
            
            <button 
              @click="downloadPDF" 
              :disabled="isDownloading"
              class="download-btn"
            >
              <div class="btn-content">
                <svg v-if="!isDownloading" class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <svg v-else class="btn-icon loading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                <span class="btn-text">
                  {{ isDownloading ? 'Downloading Your PDF...' : 'Download Application Form (PDF)' }}
                </span>
              </div>
            </button>

            <div v-if="downloadSuccess" class="status-message success">
              <svg class="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>Download completed! Check your downloads folder.</span>
            </div>
            
            <div v-if="downloadError" class="status-message error">
              <svg class="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              <span>{{ downloadError }}</span>
            </div>
          </div>

          <!-- Next Steps -->
          <div class="next-steps-section">
            <div class="section-header">
              <h3>What Happens Next?</h3>
              <p>Here's what to expect after your submission</p>
            </div>
            
            <div class="steps-grid">
              <div class="step-card">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>Email Confirmation</h4>
                  <p>You'll receive a confirmation email with your application details within the next few minutes</p>
                </div>
              </div>
              
              <div class="step-card">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>Application Review</h4>
                  <p>Our team will review your application and verify all submitted information</p>
                </div>
              </div>
              
              <div class="step-card">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>Status Updates</h4>
                  <p>You'll receive regular updates about your application status via email</p>
                </div>
              </div>
              
              <div class="step-card">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>Allotment & Payment</h4>
                  <p>Once approved, you'll receive instructions for share allotment and payment</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-section">
            <div class="action-buttons">
              <button @click="goHome" class="btn btn-secondary">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span>Back to Home</span>
              </button>
              
              <button @click="submitAnother" class="btn btn-primary">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                <span>Submit Another Application</span>
              </button>
            </div>
            
            <div class="support-note">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              <span>Need help? Contact our support team at <strong>support@initiatesplc.com</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { publicOfferAPI } from '@/services/api';
import { toast } from 'vue3-toastify';

const route = useRoute();
const router = useRouter();
const applicationId = ref(route.params.id);
const isDownloading = ref(false);
const downloadError = ref('');
const downloadSuccess = ref(false);

const downloadPDF = async () => {
  if (!applicationId.value) {
    downloadError.value = 'Application ID not found';
    return;
  }

  try {
    isDownloading.value = true;
    downloadError.value = '';
    downloadSuccess.value = false;
    
    await publicOfferAPI.downloadPDF(applicationId.value);
    downloadSuccess.value = true;
    toast.success('PDF downloaded successfully!');
    
  } catch (error) {
    console.error('Download error:', error);
    
    if (error.response?.status === 404) {
      downloadError.value = 'Application not found. Please contact support.';
    } else if (error.response?.status === 500) {
      downloadError.value = 'Server error. Please try again later.';
    } else {
      downloadError.value = 'Failed to download PDF. Please try again.';
    }
    
    toast.error('Failed to download application form');
  } finally {
    isDownloading.value = false;
  }
};

const goHome = () => {
  router.push('/');
};

const submitAnother = () => {
  router.push('/forms');
};

// Auto-download when component mounts
onMounted(() => {
  if (applicationId.value) {
    // Small delay to ensure component is fully rendered
    setTimeout(() => {
      downloadPDF();
    }, 1500);
  } else {
    downloadError.value = 'No application ID provided. Please contact support.';
    toast.error('Invalid application reference');
  }
});
</script>

<style scoped>
.submission-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.background-orbs {
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

.orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #f093fb 0%, transparent 70%);
  top: -10%;
  right: -10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #4facfe 0%, transparent 70%);
  bottom: -10%;
  left: -10%;
  animation-delay: 7s;
}

.orb-3 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, #43e97b 0%, transparent 70%);
  top: 50%;
  left: 50%;
  animation-delay: 14s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.submission-container {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.success-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.success-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.success-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.success-icon-wrapper {
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  position: relative;
  z-index: 2;
}

.success-icon {
  width: 48px;
  height: 48px;
  color: white;
}

.success-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 2;
}

.success-badge .icon {
  width: 20px;
  height: 20px;
}

.success-content {
  padding: 4rem 3rem;
}

.success-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.success-description {
  font-size: 1.25rem;
  color: #64748b;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.application-id-card {
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.id-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
}

.id-label .icon {
  width: 16px;
  height: 16px;
}

.id-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e293b;
  font-family: 'Courier New', monospace;
  background: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
}

.download-section {
  margin-bottom: 4rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-header h3 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.section-header p {
  color: #64748b;
  font-size: 1.125rem;
}

.download-btn {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  display: block;
}

.download-btn:hover:not(:disabled) {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
}

.download-btn:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.btn-icon {
  width: 24px;
  height: 24px;
}

.btn-icon.loading {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.status-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-top: 1.5rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 500;
}

.status-message.success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.status-message.error {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.status-icon {
  width: 20px;
  height: 20px;
}

.next-steps-section {
  margin-bottom: 4rem;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.step-card {
  background: white;
  padding: 2rem 1.5rem;
  border-radius: 16px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.step-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
}

.step-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.step-number {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  margin-bottom: 1rem;
}

.step-content h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.step-content p {
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

.action-section {
  text-align: center;
}

.action-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  min-width: 200px;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: white;
  color: #475569;
  border: 2px solid #e2e8f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.btn-secondary:hover {
  background: #f8fafc;
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.support-note {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  color: #475569;
  font-size: 0.875rem;
}

.support-note .icon {
  width: 16px;
  height: 16px;
}

.support-note strong {
  color: #667eea;
}

/* Responsive Design */
@media (max-width: 768px) {
  .submission-page {
    padding: 1rem;
  }
  
  .success-content {
    padding: 2rem 1.5rem;
  }
  
  .success-title {
    font-size: 2rem;
  }
  
  .success-description {
    font-size: 1.125rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
  
  .steps-grid {
    grid-template-columns: 1fr;
  }
  
  .application-id-card {
    padding: 1.5rem;
  }
  
  .id-value {
    font-size: 1.25rem;
    padding: 0.75rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .success-header {
    padding: 2rem 1rem;
  }
  
  .success-content {
    padding: 1.5rem 1rem;
  }
  
  .success-title {
    font-size: 1.75rem;
  }
  
  .section-header h3 {
    font-size: 1.5rem;
  }
  
  .download-btn {
    padding: 1.25rem 1.5rem;
  }
}
</style>