<template>
  <div class="admin-page">
    <div v-if="!isAuthed" class="card login-card">
      <h3>Admin Login</h3>
      <input
        v-model="email"
        type="email"
        class="input"
        placeholder="Admin email"
        @keyup.enter="authenticate"
      />
      <input
        v-model="password"
        type="password"
        class="input"
        placeholder="Password"
        @keyup.enter="authenticate"
      />
      <div class="login-actions">
        <button class="btn" @click="authenticate">Login</button>
        <span v-if="authError" class="error-text">{{ authError }}</span>
      </div>
    </div>

    <template v-else>
      <header class="admin-header">
        <div>
          <h1>Applications</h1>
          <p>Review submissions, download PDFs, receipts, and signatures.</p>
        </div>
        <div class="header-actions">
          <button class="btn" @click="exportCsv" :disabled="isLoading || !applications.length">Export CSV</button>
          <button class="btn btn-secondary" @click="logout">Logout</button>
        </div>
      </header>

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
      <div v-else-if="!filtered.length" class="card">No applications found.</div>

      <div v-else class="card table-card">
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
            <tr v-for="app in filtered" :key="app.id">
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
                <a v-if="signatureUrl(app)" :href="signatureUrl(app)" target="_blank">Signature</a>
              </td>
              <td>
                <button class="link-btn" @click="viewPdf(app.id)">View PDF</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pagination">
          <button class="btn" :disabled="page <= 1" @click="changePage(page - 1)">Prev</button>
          <span>Page {{ page }} of {{ totalPages || 1 }}</span>
          <button class="btn" :disabled="page >= totalPages" @click="changePage(page + 1)">Next</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { publicOfferAPI } from '../services/api'

const toast = useToast()
const applications = ref([])
const isLoading = ref(false)
const search = ref('')
const statusFilter = ref('')
const page = ref(1)
const limit = ref(10)
const totalPages = ref(1)

const password = ref('')
const authError = ref('')
const isAuthed = ref(false)
const ADMIN_KEY = import.meta.env?.VITE_ADMIN_KEY || ''

const authenticate = async () => {
  try {
    isLoading.value = true
    const res = await publicOfferAPI.adminLogin(email.value.trim(), password.value.trim())
    if (res.data?.success && res.data.token) {
      localStorage.setItem('adminToken', res.data.token)
      isAuthed.value = true
      authError.value = ''
      fetchApps()
    } else {
      authError.value = 'Invalid credentials'
    }
  } catch (err) {
    authError.value = 'Invalid credentials'
  } finally {
    isLoading.value = false
  }
}

const email = ref('')

onMounted(() => {
  const token = localStorage.getItem('adminToken')
  if (token) {
    isAuthed.value = true
    fetchApps()
  }
})

const fetchApps = async () => {
  try {
    isLoading.value = true
    const res = await publicOfferAPI.getApplications({ page: page.value, limit: limit.value })
    applications.value = res.data?.data || []
    const pagination = res.data?.pagination || {}
    totalPages.value = pagination.pages || 1
  } catch (err) {
    toast.error('Failed to load applications')
  } finally {
    isLoading.value = false
  }
}

const changePage = (p) => {
  page.value = p
  fetchApps()
}

const logout = () => {
  localStorage.removeItem('adminToken')
  isAuthed.value = false
  applications.value = []
}

const filtered = computed(() => {
  const term = search.value.toLowerCase().trim()
  return applications.value.filter((app) => {
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

const exportCsv = () => {
  const rows = [
    [
      'Reference',
      'Account Type',
      'Name',
      'Email',
      'Phone',
      'Shares',
      'Amount',
      'Stockbroker',
      'Stockbroker Code',
      'Status',
      'Created At',
      'Receipt URL',
      'Signature URL'
    ],
    ...filtered.value.map((a) => [
      formatRef(a.id),
      a.account_type,
      `${a.title} ${a.surname} ${a.first_name}`,
      a.email,
      a.phone,
      formatNumber(a.shares_applied),
      formatNumber(a.amount_payable),
      a.stockbroker?.name || '',
      a.stockbroker?.code || a.stockbrokers_code || '',
      a.status,
      formatDate(a.created_at),
      a.payment_receipt || '',
      signatureUrl(a) || ''
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
  link.setAttribute('download', 'public-offer-applications.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.admin-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
</style>

