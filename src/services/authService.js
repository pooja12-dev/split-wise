import axiosInstance from '../axiosInstance'; // Import your Axios instance
import { setUser } from '../slice/userSlice'; // Import setUser action
import { useDispatch } from 'react-redux'; // Import useDispatch hook

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

export const login = async (credentials, dispatch) => { // Now accept dispatch as an argument
  try {
    const response = await axiosInstance.post('/auth/signin', credentials);
    const { token, user } = response.data; // Adjust based on backend response
    console.log(user, "user from authService");
    console.log(token, "token from authService");

    // Store token in localStorage
    localStorage.setItem('authToken', token);

    // Dispatch the user data to Redux store
    dispatch(setUser(user));

    return user;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};
