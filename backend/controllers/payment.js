import { supabase } from '../models/index.js';
import { errorCodeResponses, isFieldAbsent } from '../utils.js';

export const recordTransaction = async (request, response) => {
  const { payer, payee, amount, timestamp, status, userid } = request.body;

  try {
    const fields = [
      {
        label: 'Payer',
        value: payer,
      },
      {
        label: 'Payee',
        value: payee,
      },
      {
        label: 'amount',
        value: amount,
      },
      {
        label: 'Timestamp',
        value: timestamp,
      },
      {
        label: 'Status',
        value: status,
      },
      {
        label: 'User ID',
        value: userid,
      },
    ];

    const field = isFieldAbsent(fields);

    if (field) {
      return response
        .status(400)
        .send({ error: `${field.label} is a required field` });
    }

    const { data, error } = await supabase
      .from('transaction')
      .insert([{ payer, payee, amount, timestamp, status, userid }]);

    if (error) {
      return response.status(400).send(error);
    }

    return response.send({ success: data });
  } catch (e) {
    return response.status(500).send(errorCodeResponses['500']);
  }
};

export const viewTransactions = async (request, response) => {
  const id = request.params.id;

  try {
    const { data, error } = await supabase
      .from('transaction')
      .select('*')
      .eq('id', id);
    if (error) {
      return response.status(400).send(error);
    }
    return response.send({ success: data });
  } catch (e) {
    return response.status(500).send(errorCodeResponses['500']);
  }
};

// export const viewGroups = async (request, response) => {
//   try {
//     const { data, error } = await supabase.from('group').select('*');
//     if (error) {
//       return response.status(400).send(error);
//     }
//     return response.send({ success: data });
//   } catch (e) {
//     return response.status(500).send(errorCodeResponses['500']);
//   }
// };
