// app.use(express.json());
import Stripe from 'stripe';
const stripe = new Stripe(
  'sk_test_51L5xY5GQAnXJ0JEKipyVcR2IyoP5ECqTXhyRcSgxkGSiCunc3UFK2mtehvGpYtpCYnI57zf9S6ki82t36hyadpaT00q04YVOCW',
);
// const stripe = require('stripe')(
//     'sk_test_51L5xY5GQAnXJ0JEKipyVcR2IyoP5ECqTXhyRcSgxkGSiCunc3UFK2mtehvGpYtpCYnI57zf9S6ki82t36hyadpaT00q04YVOCW',
//   );
export const createPaymentIntent = async (req, res) => {
  const items = req.body;
  console.log(items);
  // let payee = items.lastName + ',' + items.firstName;
  let amount = items.amount;
  // let timestamp = new Date().toUTCString();
  // let userid = '4e8eea9b-2526-41e6-ad70-469e14b6d9a7';
  console.log(amount);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: items.amount * 100,
    description: items.payFor,
    receipt_email: items.email,
    currency: 'cad',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
