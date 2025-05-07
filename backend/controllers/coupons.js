import { supabase } from "../models/index.js";
import { errorCodeResponses, isFieldAbsent } from "../utils.js";
import * as _ from "lodash";
/**
 * Author:    Ayush Verma
 * Created:   15.07.2022
 *
 * (c) Copyright by Group 24.
 **/
// Fetch all coupons from the database
export const getCoupons = async (request, response) => {
  try {
    const { data, error } = await supabase.from("coupons").select("*");
    if (error) {
      return response.status(400).send(error);
    }
    return response.json(data);
  } catch (err) {
    return response.status(500).send(errorCodeResponses["500"]);
  }
};

// fetch particular coupons from the database
export const getCoupon = async (request, response) => {
  try {
    let id = request.params.id.trim();
    if (id) {
      const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .eq("id", id);
      if (error) {
        return response.status(400).send(error);
      }
      return response.json(data);
    } else {
      return response.status(400).send(error);
    }
  } catch (err) {
    return response.status(500).send(errorCodeResponses["500"]);
  }
};

export const getMerchantReviews = async (request, response) => {
  try {
    let t = request.params.id;
    const { data, error } = await supabase
      .from("coupon_merchant_reviews")
      .select("*")
      .eq("coupon_merchant", t);
    if (error) {
      return response.status(400).send(error);
    }
    return response.json(data);
  } catch (err) {
    console.log(err);
    return response.status(500).send(errorCodeResponses["500"]);
  }
};

export const getMerchantLocations = async (request, response) => {
  let { data: location_of_merchants, error } = await supabase
    .from("location_of_merchants")
    .select("*")
    .eq("merchant_id", request.params.id);
  console.log(location_of_merchants);
  response.json(location_of_merchants);
};
export const addMerchantToDB = async (request, response) => {
  const { data, error } = await supabase
    .from("coupon_transactions")
    .insert([{ merchant: request.body.merchant, user: request.body.user }]);
  response.send(data);
  console.log(data);
};
