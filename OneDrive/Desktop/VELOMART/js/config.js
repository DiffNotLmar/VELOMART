// API Configuration
const API_CONFIG = {
    BASE_URL: 'https://velomart-production.up.railway.app',
    API_URL: 'https://velomart-production.up.railway.app/api'
};

// Helper function to make API calls
async function apiCall(endpoint, options = {}) {
    const url = `${API_CONFIG.API_URL}${endpoint}`;
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
