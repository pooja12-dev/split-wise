/**
 * @author ${Vatsal Yadav, Abhishek Uppe}
 */

import express from "express";
import { protectedRoute } from "../controllers/userManagement.js";
// import { userSignup } from '../controllers/userManagement'; // Import your controlleimport { userSignup } from '../controllers/userManagement'; // Import your controlle
import { supabase } from "../models/index.js";
import {
  addMerchantToDB,
  getCoupon,
  getCoupons,
  getMerchantLocations,
  getMerchantReviews,
} from "../controllers/coupons.js";

import { userSignin, userSignup } from "../controllers/userManagement.js";
import {
  createReminder,
  deleteReminder,
  updateReminder,
  viewReminders,
} from "../controllers/reminders.js";

import {
  createTag,
  deleteTag,
  updateTag,
  viewTag,
  viewTagExpenses,
  viewTags,
} from "../controllers/tags.js";

import {
  createGroup,
  deleteGroup,
  updateGroup,
  viewGroup,
  viewGroups,
  viewUsers,
} from "../controllers/group.js";

import {
  addExpense,
  deleteExpense,
  editExpense,
  settleExpense,
  viewExpense,
  viewExpenses,
} from "../controllers/expense.js";

import { createPaymentIntent } from "../controllers/payment-server.js";
import {
  addNotification,
  deleteNotification,
  getNotificationTypes,
  sendCustomEmail,
  updateNotificationSettings,
  viewNotifications,
  viewNotificationSettings,
} from "../controllers/notification.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("API is working!");
});

// Signup route
router.post("/user-signup", async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  // Check if all required fields are provided
  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Sign up the user using Supabase
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Optionally, insert additional profile info into your database
    const { data, profileError } = await supabase.from("profiles").insert([
      {
        user_id: user.id,
        first_name,
        last_name,
        email_id: email,
      },
    ]);

    if (profileError) {
      return res.status(500).json({ error: profileError.message });
    }

    return res.status(200).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
//signuprouter

// Protected route example
router.get("/protected", protectedRoute);
//added by pooja - /router
// group routes
router.post("/create-group", createGroup);
router.put("/update-group/:id", updateGroup);
router.delete("/delete-group/:id", deleteGroup);
router.get("/view-groups", viewGroups);
router.get("/view-group/:id", viewGroup);
router.get("/view-users", viewUsers);

//expense routes
router.post("/add-expense", addExpense);
router.put("/edit-expense/:id", editExpense);
router.delete("/delete-expense/:id", deleteExpense);
router.get("/view-expenses", viewExpenses);
// router.get("/view-expenses", async (req, res) => {
//     console.log("API endpoint hit: /view-expenses");
//     console.log("Query Parameters:", req.query);

//     // Existing code to fetch expenses
//     const { user_id } = req.query;

//     // Check if user_id is missing
//     if (!user_id) {
//         console.error("Missing user_id in request");
//         return res.status(400).send({ error: "user_id is required" });
//     }

//     try {
//         const { data, error } = await supabase
//             .from("expense")
//             .select("*")
            

//         if (error) {
//             console.error("Supabase error:", error);
//             return res.status(400).send({ error });
//         }

//         console.log("Expenses fetched:", data);
//         return res.status(200).send({ success: data });
//     } catch (e) {
//         console.error("Unexpected error:", e);
//         return res.status(500).send({ error: "Internal server error" });
//     }
// });

router.get("/view-expense/:id", viewExpense);

// tags routes
router.post("/create-tag", createTag);
router.put("/update-tag/:id", updateTag);
router.delete("/delete-tag/:id", deleteTag);
router.get("/view-tags/:id", viewTags);
router.get("/view-tag/:id", viewTag);
router.get("/fetch-expenses/:id", viewTagExpenses);

router.post("/user-signup", userSignup);
router.post("/auth/signin", userSignin);
// routing for the coupon management
router.get("/get-coupons", getCoupons);
router.get("/get-coupon/:id", getCoupon);
// router.post("/signin", userSignin);

// payment reminder routes
router.post("/create-reminder", createReminder);
router.put("/edit-reminder", updateReminder);
router.delete("/delete-reminder/:id", deleteReminder);
router.post("/view-reminders", viewReminders);
router.post("/create-payment-intent", createPaymentIntent);
router.get("/get-reviews/:id", getMerchantReviews);
router.get("/get-location/:id", getMerchantLocations);

router.get("/notification-type", getNotificationTypes);
router.put("/update-notification-settings", updateNotificationSettings);
router.post("/notification-settings", viewNotificationSettings);
router.get("/view-notification", viewNotifications);
router.post("/add-notification", addNotification);
router.post("/send-custom-mail", sendCustomEmail);
router.post("/add-coupon-redeemption", addMerchantToDB);

router.post("/settle-expense", settleExpense);
router.delete("/delete-notification/:id", deleteNotification);

export { router };
