import axiosInstance from './axiosInstance'; // Import your Axios instance

// Function to handle user signup
export const signup = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/signup', userData);
    return response.data; // Return the response from the backend
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
    throw error; // Re-throw error for the calling function to handle
  }
};


const login = async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      const { token, user } = response.data; // Adjust based on backend response
      localStorage.setItem('authToken', token); // Store token in local storage
      return user;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  };
  