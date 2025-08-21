const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getData() {
    return this.request('/data');
  }

  async createData(data) {
    return this.request('/data', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateData(id, data) {
    return this.request(`/data/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteData(id) {
    return this.request(`/data/${id}`, {
      method: 'DELETE',
    });
  }

  
}

export const apiService = new ApiService();