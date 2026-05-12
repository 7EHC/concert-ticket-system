const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001') + '/api';

const getHeaders = () => {
  const headers: any = {
    'Content-Type': 'application/json',
  };
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const api = {
  async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: getHeaders(),
    });
    if (!response.ok) {
      const error = await parseError(response);
      throw error;
    }
    return response.json();
  },

  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await parseError(response);
      throw error;
    }
    return response.json();
  },

  async put(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await parseError(response);
      throw error;
    }
    return response.json();
  },

  async delete(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const error = await parseError(response);
      throw error;
    }
    if (response.status === 204) return null;
    return response.json();
  },
};

async function parseError(response: Response): Promise<Error> {
  let message = `HTTP error! status: ${response.status}`;
  try {
    const payload = await response.json();
    if (payload && (payload.message || payload.error)) {
      message = Array.isArray(payload.message) ? payload.message.join(', ') : payload.message || payload.error;
    }
  } catch {
    // ignore JSON parse errors
  }
  return new Error(message);
}

// Concert API
export const concertApi = {
  getAll: () => api.get('/concerts'),

  create: (data: { name: string; description: string; totalSeats: number }) => api.post('/concerts', data),
  delete: (id: string) => api.delete(`/concerts/${id}`),
};

// Auth API
export const authApi = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (name: string, email: string, password: string, role?: string) => api.post('/auth/register', { name, email, password, role }),

};

// Reservation API
export const reservationApi = {
  create: (data: { userId: string; concertId: string }) => api.post('/reservations', data),
  getUserReservations: (userId: string) => api.get(`/reservations?userId=${userId}`),
  cancel: (id: string, userId: string) => api.put(`/reservations/${id}/cancel`, { userId }),
  getStats: () => api.get('/reservations/stats'),
};