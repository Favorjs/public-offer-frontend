<template>
  <div class="admin-page">
    <div v-if="!isAuthed" class="login-shell">
      <div class="login-card glass">
        <div class="login-header">
          <h2>Welcome back</h2>
          <p>Please sign in to continue</p>
        </div>
        <label class="field">
          <span>Email Address</span>
          <input
            v-model="email"
            type="email"
            class="input"
            placeholder="you@example.com"
            @keyup.enter="authenticate"
          />
        </label>
        <label class="field">
          <span>Password</span>
          <input
            v-model="password"
            type="password"
            class="input"
            placeholder="Password"
            @keyup.enter="authenticate"
          />
        </label>
        <div class="login-actions">
          <button class="btn primary" @click="authenticate" :disabled="isLoading">Continue</button>
          <span v-if="authError" class="error-text">{{ authError }}</span>
        </div>
        <div class="login-meta">
          <a class="muted">Forgot Password?</a>
          <a class="muted">Need access? Contact admin.</a>
        </div>
      </div>
    </div>

    <template v-else>
      <header class="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Rights Issue Submissions Management</p>
        </div>
        <div class="header-actions">
          <button class="btn" @click="exportCsv" :disabled="isLoading || !allApplications.length">Export CSV</button>
          <button class="btn btn-secondary" @click="logout">Logout</button>
        </div>
      </header>

   <!-- In the template section -->
<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-icon">👥</div>
    <div>
      <p>Total Submissions</p>
      <h3>{{ formatNumber(totalApplications) }}</h3>
    </div>
  </div>
  <div class="stat-card">
    <div class="stat-icon">⏳</div>
    <div>
      <p>Pending</p>
      <h3>{{ formatNumber(pendingCount) }}</h3>
    </div>
  </div>
  <div class="stat-card">
    <div class="stat-icon">✅</div>
    <div>
      <p>Approved</p>
      <h3>{{ formatNumber(approvedCount) }}</h3>
    </div>
  </div>
</div>

      <div class="controls">
        <input
          v-model="search"
          type="text"
          class="input"
          placeholder="Search by name, email, phone, stockbroker..."
        />
        <select v-model="statusFilter" class="input">
          <option value="">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="SUBMITTED">Submitted</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <select v-model.number="limit" class="input">
          <option :value="10">10 per page</option>
          <option :value="25">25 per page</option>
          <option :value="50">50 per page</option>
        </select>
      </div>

      <div v-if="isLoading" class="card">Loading applications...</div>
      <div v-else-if="!filtered || !filtered.length" class="card">No applications found.</div>

   <!-- In your AdminView.vue template -->
<div v-else-if="filtered && filtered.length" class="card table-card">
  <table class="table">
    <thead>
      <tr>
        <th>Ref</th>
        <th>Name</th>
        <th>Account Type</th>
        <th>Shares</th>
        <th>Amount</th>
        <th>Stockbroker</th>
        <th>Status</th>
        <th>Submitted</th>
        <th>Files</th>
        <th>PDF</th>
      </tr>
    </thead>
    <tbody>
      <!-- CHANGE: Use paginatedApplications instead of filtered -->
      <tr v-for="app in paginatedApplications" :key="app.id">
        <td>{{ formatRef(app.id) }}</td>
        <td>
          {{ app.title }} {{ app.surname }} {{ app.first_name }}
          <div class="subtext">{{ app.email }} — {{ app.phone }}</div>
        </td>
        <td>{{ app.account_type }}</td>
        <td>{{ formatNumber(app.shares_applied) }}</td>
        <td>₦{{ formatNumber(app.amount_payable) }}</td>
        <td>
          {{ app.stockbroker?.name || '—' }}
          <div class="subtext">{{ app.stockbroker?.code || app.stockbrokers_code || '—' }}</div>
        </td>
        <td><span class="badge">{{ app.status }}</span></td>
        <td>{{ formatDate(app.created_at) }}</td>
        <td class="files">
          <a v-if="app.payment_receipt" :href="app.payment_receipt" target="_blank">Receipt</a>
          <span v-if="app.payment_receipt && signatureUrl(app)"> • </span>
          <a v-if="signatureUrl(app)" :href="signatureUrl(app)" target="_blank">Signature</a>
        </td>
        <td>
          <button class="link-btn" @click="viewPdf(app.id)">View PDF</button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Pagination controls -->
  <div class="pagination">
    <button class="btn" :disabled="page <= 1" @click="changePage(page - 1)">Prev</button>
    <span>Page {{ page }} of {{ totalPages || 1 }} (Showing {{ paginatedApplications.length }} of {{ filtered.length }})</span>
    <button class="btn" :disabled="page >= totalPages" @click="changePage(page + 1)">Next</button>
  </div>
</div>
    </template>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref, watch } from 'vue'
  import { useToast } from 'vue-toastification'
  import { publicOfferAPI } from '../services/api'
  
  const toast = useToast()
  
  // Data
  const allApplications = ref([]) // Store ALL applications
  const isLoading = ref(false)
  const search = ref('')
  const statusFilter = ref('')
  const page = ref(1)
  const limit = ref(10)
  const totalPages = ref(1)
  const totalApplications = ref(0) // Total count from backend
  
  // Authentication
  const password = ref('')
  const authError = ref('')
  const isAuthed = ref(false)
  const ADMIN_KEY = import.meta.env?.VITE_ADMIN_KEY || ''
  
  // Computed properties
const filtered = computed(() => {
  const apps = allApplications.value || [];
  const term = search.value.toLowerCase().trim();
  return apps.filter((app) => {
      if (statusFilter.value && app.status !== statusFilter.value) return false
      if (!term) return true
      const sbName = app.stockbroker?.name || ''
      const sbCode = app.stockbroker?.code || app.stockbrokers_code || ''
      return [
        app.surname,
        app.first_name,
        app.email,
        app.phone,
        sbName,
        sbCode
      ].some((field) => (field || '').toLowerCase().includes(term))
    })
  })
  
  const pendingCount = computed(() => 
    (allApplications.value || []).filter((a) => a.status === 'PENDING').length
  )
  
  const approvedCount = computed(() => 
    (allApplications.value || []).filter((a) => a.status === 'APPROVED').length
  )
  
  const paginatedApplications = computed(() => {
  const start = (page.value - 1) * limit.value
  const end = start + limit.value
  return filtered.value.slice(start, end)
})
  
  const email = ref('')
  
  onMounted(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      isAuthed.value = true
      fetchAllApps()
    }
  })
  
  // Fetch ALL applications (not paginated)
// In AdminView.vue - Update the fetchAllApps method
const fetchAllApps = async () => {
  try {
    isLoading.value = true
    
    // Get statistics for counts
    const statsRes = await publicOfferAPI.getStatistics()
    if (statsRes.data?.success) {
      totalApplications.value = statsRes.data.data.total
    }
    
    // Get ALL applications with a large limit parameter
    const res = await publicOfferAPI.getApplications({ limit: 1000 })
    if (res.data?.success) {
      allApplications.value = Array.isArray(res.data.data) ? res.data.data : []
      
      // Calculate total pages for filtered results
      totalPages.value = Math.ceil(filtered.value.length / limit.value)
    } else {
      allApplications.value = []
    }
    
  } catch (err) {
    console.error('Error fetching applications:', err)
    toast.error('Failed to load applications')
    allApplications.value = []
  } finally {
    isLoading.value = false
  }
}
  
  // If you don't have an "all applications" endpoint, you'll need to create one
  // in your backend. Add this to your controller:
  
  /*
  // In public_offers.js controller
  getAllPublicOffersNoPagination = async(req, res)=> {
    try {
      const publicOffers = await prisma.publicOffer.findMany({
        include: {
          stockbroker: true
        },
        orderBy: {
          created_at: 'desc'
        }
      });
  
      res.json({
        success: true,
        data: publicOffers.map(serializePublicOffer)
      });
  
    } catch (error) {
      console.error('Error fetching all public offers:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch all applications',
        error: error.message
      });
    }
  }
  */
  
  // Update your API service to include this method
  /*
  // In services/api.js
  export const publicOfferAPI = {
    // ... existing methods
    getAllApplications: () => axios.get('/public-offers/all'),
  }
  */
  
  const changePage = (p) => {
    page.value = p
  }
  
  const logout = () => {
    localStorage.removeItem('adminToken')
    isAuthed.value = false
    allApplications.value = []
    totalApplications.value = 0
  }
  
  const authenticate = async () => {
    try {
      isLoading.value = true
      const res = await publicOfferAPI.adminLogin(email.value.trim(), password.value.trim())
      if (res.data?.success && res.data.token) {
        localStorage.setItem('adminToken', res.data.token)
        isAuthed.value = true
        authError.value = ''
        fetchAllApps()
      } else {
        authError.value = 'Invalid credentials'
      }
    } catch (err) {
      authError.value = 'Invalid credentials'
    } finally {
      isLoading.value = false
    }
  }
  
  const formatNumber = (val) => {
    if (val === undefined || val === null) return '0'
    const num = typeof val === 'bigint' ? Number(val) : Number(val)
    return isNaN(num) ? '0' : num.toLocaleString()
  }
  
  const formatDate = (val) => {
    if (!val) return ''
    return new Date(val).toLocaleString('en-GB')
  }
  
  const formatRef = (id) => `TIP/PO/${String(id).padStart(6, '0')}`
  
  const signatureUrl = (app) => app.individual_signature || app.corporate_signature || app.joint_signature
  
  const viewPdf = (id) => {
    const base = import.meta.env.VITE_APP_API_BASE_URL || ''
    const url = `${base}/public-offers/applications/${id}/pdf`
    window.open(url, '_blank')
  }
  

  // Add this function in your script
const formatDateForCSV = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    // Format as YYYY-MM-DD
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}
  // Export ALL filtered applications (not just current page)
  const exportCsv = () => {
    const rows = [
      [
        'Name of Stockbroker',
        "Shareholder's Bank Verification Number (BVN)",
        "Shareholder's Clearing House Number (CHN)",
        'CSCS Number',
        'Phone Number',
        'Email',
        'Unit Applied For',
        'Amount Paid',
        'Payment Method',
        "Shareholder Name (Surname)",
        "Shareholder Name (Other Names)",
        'Shareholder Address',
        'Date Submitted'
      ],
      ...filtered.value.map((a) => [
        a.stockbroker?.name || '',
        a.bvn || '',
        a.chn || '',
        a.cscs_no || '',
        a.phone || '',
        a.email || '',
        formatNumber(a.shares_applied),
        formatNumber(a.amount_payable),
        a.payment_method || '',
        a.surname || '',
        `${a.first_name || ''} ${a.other_names || ''}`.trim(),
        a.address || '',
        formatDateForCSV(a.created_at)
      ])
    ]
  
    const csv = rows.map((r) =>
      r
        .map((cell) => {
          const safe = String(cell || '').replace(/"/g, '""')
          return `"${safe}"`
        })
        .join(',')
    ).join('\n')
  
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `public-offer-applications-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
  
  // Watch for filter changes to reset page
  watch([search, statusFilter], () => {
    page.value = 1
    totalPages.value = Math.ceil(filtered.value.length / limit.value)
  })
  </script>
  


<style scoped>
.admin-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
}
.login-shell {
  display: grid;
  place-items: center;
  min-height: 70vh;
}
.glass {
  background: #fff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}
.login-card {
  width: 100%;
  max-width: 420px;
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.login-header h2 {
  margin: 0;
}
.login-header p {
  margin: 0.25rem 0 0;
  color: #6b7280;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-weight: 600;
  color: #374151;
}
.login-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.login-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}
.muted {
  color: #6b7280;
}
.primary {
  background: #a10056;
}
.secondary {
  background: #fff;
  color: #2563eb;
  border: 1px solid #d1d5db;
}
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}
.admin-header h1 {
  margin: 0;
  font-size: 1.5rem;
}
.admin-header p {
  margin: 0.25rem 0 0;
  color: #6b7280;
}
.header-actions {
  display: flex;
  gap: 0.5rem;
}
.controls {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.input {
  padding: 0.65rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  min-width: 220px;
}
.card {
  background: #fff;
  border: 1px solid #e5e7eb;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.75rem;
}
.stat-card {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.9rem 1rem;
  background: #f9fafb;
}
.stat-card p {
  margin: 0;
  color: #6b7280;
}
.stat-card h3 {
  margin: 0.1rem 0 0;
  font-size: 1.4rem;
}
.stat-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: #eef2ff;
  color: #4338ca;
  font-weight: 700;
}
.table-card {
  overflow: auto;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
  vertical-align: top;
}
.table thead {
  background: #f1f5f9;
  position: sticky;
  top: 0;
  z-index: 1;
}
.subtext {
  color: #6b7280;
  font-size: 0.85rem;
}
.badge {
  background: #eef2ff;
  color: #4338ca;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
}
.files a, .link-btn {
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
}
.link-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}
.btn {
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 0.65rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
}
.login-card {
  max-width: 420px;
}
.login-actions {
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.error-text {
  color: #dc2626;
  font-size: 0.9rem;
}
@media (max-width: 768px) {
  .table th, .table td {
    padding: 0.5rem;
  }
  .admin-header {
    flex-direction: column;
  }
  .controls {
    flex-direction: column;
  }
  .input {
    width: 100%;
  }
  .pagination {
    justify-content: center;
  }
}

/* Table borders */
.table {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.table th, .table td {
  border-right: 1px solid #e5e7eb;
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
  vertical-align: top;
}

.table th:last-child, .table td:last-child {
  border-right: none;
}

.table tr:last-child td {
  border-bottom: none;
}

.table thead {
  background: #f1f5f9;
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 2px solid #d1d5db;
}

/* Make table responsive */
.table-card {
  overflow-x: auto;
  border-radius: 8px;
}

/* Add alternating row colors */
.table tbody tr:nth-child(even) {
  background-color: #f9fafb;
}

.table tbody tr:hover {
  background-color: #f3f4f6;
}
</style>

