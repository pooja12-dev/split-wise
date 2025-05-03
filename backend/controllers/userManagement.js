import { supabase } from "../models/index.js";
import jwt from "jsonwebtoken";

const SECRET_KEY =
  process.env.JWT_SECRET ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMyZDljYTU2LTYzNTctNDFhYS1iYjk4LWYzMzc3MjUxNzk0NiIsImVtYWlsIjoicmFuZG9tQGdtYWlsLmNvbSIsInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNjgzMTUwMzg3LCJleHAiOjE2ODMxNTM5ODd9.wX-5cwZOg7mkPOo6Xee-kAD6Ynz9orf079RhhQMFIpA";

// Signup module
export const userSignup = async (request, response) => {
  try {
    const { email, password } = request.body;

    let { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error during signup:", error.message);
      return response.status(400).send({ message: error.message });
    }

    console.log("User signed up successfully:", user);

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return response.status(201).send({ user, token });
  } catch (err) {
    console.error("Error during signup:", err.message);
    return response.status(500).send({ message: "Internal server error" });
  }
};

// Signin module
export const userSignin = async (request, response) => {
  try {
    const { email, password } = request.body;

    // Using the correct method for signing in with password
    let { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    // Check if there is an error
    if (error) {
      console.error("Error during signin:", error.message);
      return response.status(400).send({
        message: "Authentication failed",
        error: error.message,
      });
    }

    // Ensure user exists in response
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log(token);
    console.log(user)

    return response.status(200).send({ user, token });
  } catch (err) {
    console.error("Error during signin:", err.message);
    return response.status(500).send({ message: "Internal server error" });
  }
};

// Protected route
export const protectedRoute = (request, response) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response
      .status(401)
      .send({ message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded user info:", decoded);

    return response
      .status(200)
      .send({ message: "Access granted", user: decoded });
  } catch (err) {
    console.error("Invalid token:", err.message);
    return response.status(403).send({ message: "Invalid token" });
  }
};
