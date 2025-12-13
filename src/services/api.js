// api.js
import axios from 'axios';

const API_BASE_URL =
  process.env.VUE_APP_API_BASE_URL || 'https://api.tipoffer.apel.com.ng/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to handle errors
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Public Offer API endpoints
export const publicOfferAPI = {
  // Submit application - increased timeout for file uploads and processing
  submit: (data) => api.post('/public-offers/applications', data, {
    timeout: 120000 // 2 minutes for file uploads, PDF generation, and email sending
  }),
  
  // Get applications
  getApplications: (params = {}) => api.get('/public-offers/applications', { params }),
  
  // Get single application
  getApplication: (id) => api.get(`/public-offers/applications/${id}`),
  
  // Download PDF - CORRECTED ENDPOINT
  downloadPDF: (id) => {
    return api.get(`/public-offers/applications/${id}/pdf`, {
      responseType: 'blob',
      timeout: 60000 // 1 minute for PDF generation and download
    }).then(response => {
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `public-offer-application-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      return response;
    });
  },
  
  // Update status
  updateStatus: (id, status) => api.patch(`/public-offers/applications/${id}/status`, { status }),
  
  // Get statistics
  getStatistics: () => api.get('/public-offers/statistics'),

  // Get stockbrokers
  getStockbrokers: () => api.get('/public-offers/stockbrokers')
};

export default api;