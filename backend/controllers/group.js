/**
 * @author ${abhishekuppe}
 */

import {supabase} from "../models/index.js";
import {errorCodeResponses, isFieldAbsent} from "../utils.js";


// The controller creates a group in database with based on the group details
export const createGroup = async (request, response) => {

    const {name, type, user_ids, icon} = request.body;

    try {
        const fields = [
            {
                label: "Name",
                value: name
            },
            {
                label: "Type",
                value: type
            },
            {
                label: "User Ids",
                value: user_ids && Array.from(user_ids, Number)
            },
            {
                label: "Icon",
                value: icon
            }
        ];

        const field = isFieldAbsent(fields);

        if (field) {
            return response.status(400).send({error: `${field.label} is a required field`});
        }

        const {data, error} = await supabase
            .from('group')
            .insert([
                {name, type, user_ids, icon}
            ]);

        if (error) {
            return response.status(400).send(error);
        }

        return response.send({success: data});
    } catch (e) {
        return response.status(500).send(errorCodeResponses["500"]);
    }
}

// The controller updates a group in database with based on the group details
export const updateGroup = async (request, response) => {

    const {name, user_ids, icon} = request.body;

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
                label: "Icon",
                value: icon
            }
        ];

        const field = isFieldAbsent(fields);

        if (field) {
            return response.status(400).send({error: `${field.label} is a required field`});
        }

        const {data, error} = await supabase
            .from('group')
            .update(
                {name, user_ids, icon}
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

// The controller deletes the group in database with based on the group id
export const deleteGroup = async (request, response) => {
    const id = request.params.id;
    try {
        const {data, error} = await supabase
            .from('group')
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

// The controller views the group in database with based on the group id
export const viewGroup = async (request, response) => {
    const id = request.params.id;
    const user = request.query.user;

    try {
        const {data, error} = await supabase
            .from('group')
            .select('*')
            .eq('id', id);

        if (error) {
            return response.status(400).send(error);
        }

        const userResponse = await supabase
            .from('users')
            .select('*')
            .in('id', data[0].user_ids);

        if (userResponse.error) {
            return response.status(400).send(error);
        }

        delete data[0].user_ids;
        data[0].users = userResponse.data;

        const expenseResponse = await supabase
            .from('expense')
            .select('*')
            .eq('group_id', id)

        if (expenseResponse.error) {
            return response.status(400).send(expenseResponse.error);
        }

        const expenses = {lent: [], owed: []};

        expenseResponse.data.forEach((exp) => {
            if (exp.user_id === user) {
                expenses['lent'].push(exp);
            } else {
                if (exp.user_ids.includes(user)) {
                    expenses['owed'].push(exp);
                }
            }
        });

        data[0].expenses = expenses;
        return response.send({success: data});
    } catch (e) {
        return response.status(500).send(errorCodeResponses["500"]);
    }
}

// The controller view all the groups in database
export const viewGroups = async (request, response) => {

    const user = request.query.user;
    try {
        let {data, error} = await supabase
            .from('group')
            .select('*')

        if (user && user !== "undefined") {
            data = data.filter((ele) => ele.user_ids.includes(user));
        }

        if (error) {
            return response.status(400).send(error);
        }

        return response.send({success: data});
    } catch (e) {
        return response.status(500).send(errorCodeResponses["500"]);
    }
}

// The controller view all the users in database
export const viewUsers = async (request, response) => {
    try {
        const {data, error} = await supabase
            .from('users')
            .select('*');


        if (error) {
            return response.status(400).send(error);
        }
        return response.send({success: data});
    } catch (e) {
        return response.status(500).send(errorCodeResponses["500"]);
    }
}