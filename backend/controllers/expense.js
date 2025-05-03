import {supabase} from "../models/index.js";
import {errorCodeResponses, isFieldAbsent} from "../utils.js";

export const addExpense = async (request, response) => {
    try {
        const { name, amount, type, user_id, group_id, tag_id } = request.body;
        console.log("Incoming Request Body:", request.body);

        const fields = [
            { label: "Name", value: name },
            { label: "Type", value: type },
            { label: "Amount", value: amount },
            { label: "User Id", value: user_id },
            { label: "Tag Id", value: tag_id },
        ];

        // Log fields to check their values before validation
        console.log("Field Values:", fields);

        const field = isFieldAbsent(fields);

        if (field) {
            console.error(`Validation Failed: ${field.label} is missing.`);
            return response.status(400).send({ error: `${field.label} is a required field` });
        }

        let user_ids = [];
        if (group_id) {
            console.log("Fetching user IDs for group_id:", group_id);
            const groupData = await supabase
                .from('group')
                .select('user_ids')
                .eq('id', group_id);

            console.log("Group Data Response:", groupData);
            if (groupData.data && groupData.data.length > 0) {
                user_ids = groupData.data[0].user_ids;
            } else {
                console.warn(`No group found with group_id: ${group_id}`);
            }
        } else {
            console.log("No group_id provided, using user_id:", user_id);
            user_ids = [user_id];
        }

        console.log("Final User IDs:", user_ids);

        const { data, error } = await supabase
            .from('expense')
            .insert([
                { name, type, amount, user_id, user_ids, group_id, tag_id, current_time: new Date() },
            ]);

        if (error) {
            console.error("Supabase Insert Error:", error);
            return response.status(400).send(error);
        }

        console.log("Insert Successful, Response Data:", data);
        return response.send({ success: data });
    } catch (e) {
        console.error("Server Error:", e);
        return response.status(500).send({ error: "Internal server error" });
    }
};


export const editExpense = async (request, response) => {

    const {name, user_ids, amount} = request.body;

    const id = request.params.id;

    try {
        const fields = [
            {
                label: "Id",
                value: id
            },
            {
                label: "Name",
                value: name
            },
            {
                label: "User Ids",
                value: user_ids && Array.from(user_ids, Number)
            },
            {
                label: "Amount",
                value: amount
            }
        ];

        const field = isFieldAbsent(fields);

        if (field) {
            return response.status(400).send({error: `${field.label} is a required field`});
        }

        const {data, error} = await supabase
            .from('expense')
            .update(
                {name, user_ids, amount}
            ).match(
                {id}
            )

        if (error) {
            return response.status(400).send(error);
        }

        return response.send({success: data});
    } catch (e) {
        return response.status(500).send(errorCodeResponses["500"]);
    }
}

export const deleteExpense = async (request, response) => {
    const id = request.params.id;
    try {
        const {data, error} = await supabase
            .from('expense')
            .delete()
            .match({id});

        if (error) {
            return response.status(400).send(error);
        }
        return response.send({success: data});

    } catch (e) {
        return response.status(500).send(errorCodeResponses["500"]);
    }
}

export const viewExpense = async (request, response) => {
    const id = request.params.id;

    try {
        const {data, error} = await supabase
            .from('expense')
            .select('*')
            .eq('id', id);

        if (error) {
            return response.status(400).send(error);
        }

        if (data[0].group_id) {
            const groupResponse = await supabase
                .from('group')
                .select('*')
                .eq('id', data[0].group_id);

            delete data[0].group_id;

            data[0].groups = groupResponse.data.map((ele) => ele.name);

            if (groupResponse.error) {
                return response.status(400).send(error);
            }
        }

        const userResponse = await supabase
            .from('users')
            .select('*')
            .in('id', data[0].user_ids);

        if (userResponse.error) {
            return response.status(400).send(error);
        }

        delete data[0].user_ids;

        data[0].users = userResponse.data.map((ele) => ele.email_id);

        return response.send({success: data});
    } catch (e) {
        return response.status(500).send(errorCodeResponses["500"]);
    }
}

export const viewExpenses = async (req, res) => {
    try {
      const { user_id } = req.params; // Extract user_id from the query parameters
  console.log("userId", user_id)
      if (!user_id) {
        return res.status(400).json({ message: "User ID is required." });
      }
  
      const { data, error } = await supabase
        .from("expense")
        .select("*")
        .eq("user_id", user_id);
  
      if (error) {
        console.error("Supabase error:", error);
        return res.status(400).json({ message: "Failed to fetch expenses.", error });
      }
  
      return res.status(200).json(data); // Respond directly with the data
    } catch (e) {
      console.error("Internal server error:", e.message);
      return res.status(500).json({ message: "Internal server error." });
    }
  };
  

export const settleExpense = async (request, response) => {
    try {
        const {id, amount} = request.body;

        const {data, error} = await supabase
            .from('expense')
            .select('amount')
            .eq("id", id);

        if (error) {
            return response.status(400).send(error);
        }

        const newAmount = data[0].amount - parseInt(amount);

        const expenseResponse = await supabase
            .from('expense')
            .update({amount: newAmount})
            .eq("id", id);

        if (error) {
            return response.status(400).send(error);
        }

        return response.send({success: expenseResponse});
    } catch (e) {
        return response.status(500).send(errorCodeResponses["500"]);
    }
}