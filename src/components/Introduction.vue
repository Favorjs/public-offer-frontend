<template>
  <div class="introduction-page">
    <!-- Modern Hero Section -->
    <div v-if="$route.path === '/'" class="hero-section">
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-badge">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span>Public Offering Now Open</span>
        </div>
        
        <h1 class="hero-title">
          Invest in The Initiates Plc
        </h1>
        
        <div class="hero-subtitle">
          <div class="shares-info">
            <span class="shares-number">932,022,138</span>
            <span class="shares-text">Ordinary Shares of 50 kobo each</span>
          </div>
          <div class="price-tag">
            <span class="price-label">at</span>
            <span class="price-value">₦9.50</span>
            <span class="price-unit">per share</span>
          </div>
        </div>
        
        <div class="offer-timeline">
          <div class="timeline-item">
            <svg class="timeline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <div>
              <div class="timeline-label">Opens</div>
              <div class="timeline-date">5 November 2025</div>
            </div>
          </div>
          <div class="timeline-divider">→</div>
          <div class="timeline-item">
            <svg class="timeline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <div>
              <div class="timeline-label">Closes</div>
              <div class="timeline-date">12 December 2025</div>
            </div>
          </div>
        </div>
        
        <div class="hero-actions">
          <router-link to="/forms" class="btn btn-hero-primary">
            <span>Start Your Application</span>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </router-link>
          <a href="#details" class="btn btn-hero-secondary">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
            <span>Learn More</span>
          </a>
        </div>
        
     
      </div>
    </div>

    <!-- Router view for nested routes -->
    <router-view v-if="$route.path !== '/'" />

    <!-- Content Section -->
    <div v-if="$route.path === '/'" class="content-section">
      <div class="container">
        <!-- Key Benefits -->
   

   
    


        <!-- Requirements -->
        <div class="section-header">
          <div class="section-label">Get Prepared</div>
          <h2>What You'll Need</h2>
          <p>Have these documents ready before starting your application</p>
        </div>

        <div class="requirements-grid">
          <div class="requirement-card">
            <div class="requirement-number">1</div>
            <div class="requirement-content">
              <div class="requirement-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h4>Personal Information</h4>
              <p>Valid identification details, residential address, and contact information</p>
            </div>
          </div>

          <div class="requirement-card">
            <div class="requirement-number">2</div>
            <div class="requirement-content">
              <div class="requirement-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z"/>
                </svg>
              </div>
              <h4>CSCS Details</h4>
              <p>Your Clearing House Number (CHN) and CSCS account number for securities</p>
            </div>
          </div>

          <div class="requirement-card">
            <div class="requirement-number">3</div>
            <div class="requirement-content">
              <div class="requirement-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
              </div>
              <h4>Banking Information</h4>
              <p>Bank Verification Number (BVN), account number, and bank details</p>
            </div>
          </div>

          <div class="requirement-card">
            <div class="requirement-number">4</div>
            <div class="requirement-content">
              <div class="requirement-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h4>Stockbroker Details</h4>
              <p>Name and code of your preferred registered stockbroker</p>
            </div>
          </div>
        </div>

    

  
        <!-- CTA Section -->
        <div class="cta-section">
          <div class="cta-content">
            <div class="cta-badge">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>Limited Time Offer</span>
            </div>
            <h2>Ready to Start Your Investment Journey?</h2>
            <p>Join thousands of investors in The Initiates PLC and be part of Nigeria's sustainable future</p>
            <div class="cta-actions">
              <router-link to="/forms" class="btn btn-cta-primary">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>Begin Application</span>
              </router-link>
              <a href="#prospectus" class="btn btn-cta-secondary">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Download Prospectus</span>
              </a>
            </div>
            <div class="cta-note">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              <span>Applications close on 12 December 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Introduction'
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.introduction-page {
  min-height: 100vh;
  background: #f8fafc;
}

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 2rem;
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
  opacity: 0.3;
  animation: float 20s infinite ease-in-out;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #f093fb 0%, transparent 70%);
  top: -10%;
  right: -10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #4facfe 0%, transparent 70%);
  bottom: -10%;
  left: -10%;
  animation-delay: 7s;
}

.orb-3 {
  width: 300px;
  height: 300px;
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

.hero-content {
  max-width: 1000px;
  text-align: center;
  position: relative;
  z-index: 10;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
}

.hero-badge .icon {
  width: 16px;
  height: 16px;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 2rem;
  line-height: 1.1;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-subtitle {
  margin-bottom: 3rem;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.shares-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.shares-number {
  font-size: 2.5rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1rem 2rem;
  display: inline-block;
}

.shares-text {
  font-size: 1.125rem;
  opacity: 0.9;
}

.price-tag {
  display: inline-flex;
  align-items: baseline;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  padding: 1.5rem 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.price-label {
  font-size: 1rem;
  font-weight: 500;
}

.price-value {
  font-size: 3rem;
  font-weight: 800;
}

.price-unit {
  font-size: 1.125rem;
  font-weight: 500;
}

.offer-timeline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.25rem 2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.timeline-icon {
  width: 32px;
  height: 32px;
}

.timeline-label {
  font-size: 0.875rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timeline-date {
  font-size: 1.125rem;
  font-weight: 700;
}

.timeline-divider {
  font-size: 2rem;
  opacity: 0.5;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn .icon {
  width: 20px;
  height: 20px;
}

.btn-hero-primary {
  background: white;
  color: #667eea;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.btn-hero-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3);
}

.btn-hero-secondary {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-hero-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-4px);
}

.trust-indicators {
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease-out 0.8s both;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.9;
}

.trust-icon {
  width: 24px;
  height: 24px;
}

/* Content Section */
.content-section {
  padding: 6rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-label {
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

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
}

.section-header p {
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
}







/* Benefits Grid */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 6rem;
}

.benefit-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.benefit-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.benefit-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.benefit-icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.benefit-icon svg {
  width: 40px;
  height: 40px;
}

.gradient-1 {
  background: linear-gradient(135deg, #ff6b6b, #ffa8a8);
  color: white;
}

.gradient-2 {
  background: linear-gradient(135deg, #4ecdc4, #88d3ce);
  color: white;
}

.gradient-3 {
  background: linear-gradient(135deg, #45b7d1, #96cde3);
  color: white;
}

.gradient-4 {
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
}

.benefit-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}

.benefit-card p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.benefit-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #f8fafc;
  color: #475569;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid #e2e8f0;
}

/* Details Wrapper */
.details-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 6rem;
}

.details-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
}

.details-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.details-card.highlight {
  border: 2px solid #667eea;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
}

.details-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
}

.details-icon {
  width: 32px;
  height: 32px;
  color: #667eea;
}

.details-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.details-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: 600;
  color: #475569;
  flex: 1;
}

.detail-value {
  font-weight: 500;
  color: #1e293b;
  text-align: right;
  flex: 1;
}

/* Requirements Grid */
.requirements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 6rem;
}

.requirement-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.requirement-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12);
}

.requirement-number {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.requirement-content {
  text-align: center;
}

.requirement-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
}

.requirement-icon svg {
  width: 40px;
  height: 40px;
}

.requirement-card h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}

.requirement-card p {
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

/* Process Timeline */
.process-timeline {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6rem;
  position: relative;
}

.process-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  position: relative;
  z-index: 2;
}

.process-number {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  position: relative;
  z-index: 3;
}

.process-content {
  max-width: 250px;
}

.process-content h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.process-content p {
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

.process-connector {
  flex: 1;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  margin-top: 38px;
  position: relative;
  z-index: 1;
}

.process-connector::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: #e2e8f0;
  transform: translateY(-50%);
  z-index: -1;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 2rem;
  border-radius: 30px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2rem;
}

.cta-badge .icon {
  width: 16px;
  height: 16px;
}

.cta-section h2 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.cta-section p {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.btn-cta-primary {
  background: white;
  color: #667eea;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.btn-cta-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3);
}

.btn-cta-secondary {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-cta-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-4px);
}

.cta-note {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
}

.cta-note .icon {
  width: 16px;
  height: 16px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .price-value {
    font-size: 2.5rem;
  }
  
  .offer-timeline {
    flex-direction: column;
    gap: 1rem;
  }
  
  .timeline-divider {
    transform: rotate(90deg);
  }
  
  .process-timeline {
    flex-direction: column;
    gap: 3rem;
  }
  
  .process-connector {
    width: 4px;
    height: 60px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .shares-number {
    font-size: 2rem;
    padding: 0.75rem 1.5rem;
  }
  
  .price-tag {
    padding: 1rem 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .price-value {
    font-size: 2rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .trust-indicators {
    gap: 2rem;
    flex-direction: column;
  }
  
  .benefits-grid,
  .details-wrapper,
  .requirements-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-section h2 {
    font-size: 2.5rem;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .cta-section h2 {
    font-size: 2rem;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .benefit-card,
  .details-card,
  .requirement-card {
    padding: 2rem 1.5rem;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Focus styles for accessibility */
.btn:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Loading animations */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Apply animations to elements */
.benefit-card:nth-child(odd) {
  animation: slideInLeft 0.6s ease-out;
}

.benefit-card:nth-child(even) {
  animation: slideInRight 0.6s ease-out;
}

.details-card:nth-child(odd) {
  animation: slideInLeft 0.6s ease-out 0.2s both;
}

.details-card:nth-child(even) {
  animation: slideInRight 0.6s ease-out 0.2s both;
}

.requirement-card {
  animation: fadeInUp 0.6s ease-out;
}

.requirement-card:nth-child(1) { animation-delay: 0s; }
.requirement-card:nth-child(2) { animation-delay: 0.1s; }
.requirement-card:nth-child(3) { animation-delay: 0.2s; }
.requirement-card:nth-child(4) { animation-delay: 0.3s; }

.process-step {
  animation: fadeInUp 0.6s ease-out;
}

.process-step:nth-child(1) { animation-delay: 0s; }
.process-step:nth-child(3) { animation-delay: 0.2s; }
.process-step:nth-child(5) { animation-delay: 0.4s; }
.process-step:nth-child(7) { animation-delay: 0.6s; }
</style>