import axiosInstance from '../axiosInstance'; // Import your Axios instance
import { setUser } from '../slice/userSlice'; // Import setUser action
import { useDispatch } from 'react-redux'; // Import useDispatch hook

// Helper function to save user in the `users` table
const saveUserToDatabase = async (user) => {
  try {
    // Make a request to save the user in the `users` table
    await axiosInstance.post('/users', { user }); // Adjust endpoint based on backend API
    console.log('User saved to database:', user);
  } catch (error) {
    console.error('Error saving user to database:', error.response?.data || error.message);
  }
};

// Function to handle user signup
export const signup = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/signup', userData);
    const user = response.data.user; // Get the user data from the backend response

    // Save the user to the database
    await saveUserToDatabase(user);

    return response.data; // Return the response from the backend
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
    throw error; // Re-throw error for the calling function to handle
  }
};

// Function to handle user login
export const login = async (credentials, dispatch) => {
  try {
    const response = await axiosInstance.post('/auth/signin', credentials);
    const { token, user } = response.data; // Adjust based on backend response
    console.log(user, "user from authService");
    console.log(token, "token from authService");

    // Store token in localStorage
    localStorage.setItem('authToken', token);

    // Dispatch the user data to Redux store
    dispatch(setUser(user));

    // Save the user to the database (in case they were not saved during signup)
    await saveUserToDatabase(user);

    return user;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};
