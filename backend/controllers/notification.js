import {supabase} from "../models/index.js";
import {errorCodeResponses, isFieldAbsent} from "../utils.js";
import sgMail from '@sendgrid/mail'


export const getNotificationTypes = async (request, response) => {

    try {
        const {data, error} = await supabase
            .from('notification_types')
            .select("*");

        if (error) {
            return response.status(400).send(error);
        }
        return response.send({success: data});
    } catch (e) {
        return response.status(500).send(errorCodeResponses["500"]);
    }
}

export const updateNotificationSettings = async (request, response) => {

    const {user_id, types} = request.body;
    try {
        const fields = [
            {
                label: "User Id",
                value: user_id
            },
            {
                label: "Types",
                value: types && Array.from(types, Number)
            }
        ];

        const field = isFieldAbsent(fields);

        if (field) {
            return response.status(400).send({error: `${field.label} is a required field`});
        }

        const {data, error} = await supabase
            .from('notification_settings')
            .select('*')
            .eq('user_id', user_id);

        if (error) {
            return response.status(400).send(error);
        }

        if (!data.length) {
            const {newData, newError} = await supabase
                .from('notification_settings')
                .insert([
                    {types, user_id}
                ]);
            if (newError) {
                return response.status(400).send(newError);
            }
            return response.send({success: newData});
        }

        const {newData, newError} = await supabase
            .from('notification_settings')
            .update([
                {types}
            ]).match(
                {user_id}
            );
        if (newError) {
            return response.status(400).send(newError);
        }
        return response.send({success: newData});

    } catch (e) {
        return response.status(500).send(errorCodeResponses["500"]);
    }
}


export const viewNotificationSettings = async (request, response) => {
    const {user_id} = request.body;
    try {
        if (user_id) {
            const {data, error} = await supabase
                .from('notification_settings')
                .select("*")
                .eq("user_id", user_id);

            if (error) {
                return response.status(400).send(error);
            }
            return response.send({success: data});
        }
        return response.status(400).send({"error": "User Id is required"});
    } catch (e) {
        return response.status(500).send(errorCodeResponses["500"]);
    }
};


export const viewNotifications = async (request, response) => {
    try {
        const {user_id} = request.query;

        const {data, error} = await supabase
            .from('notification')
            .select("*");

        const res = {lent: [], owed: [], added_group: [], deleted_group: []};

        const lent = data.filter((ele) => ele.data.user_id === user_id && ele.type === 3);

        const owed = [];

        data.forEach((ele) => {
            if (ele.data.user_id !== user_id && ele.data.user_ids.includes(user_id) && ele.type === 3) {
                owed.push(ele);
            }
        });

        for (const owe of owed) {
            const {data, error} = await supabase
                .from('users')
                .select("*")
                .in('id', owe.data.user_ids);
            res["owed"].push({
                id: owe.id,
                name: owe.data.name,
                users: data.map((ele) => ele.email_id),
                amount: owe.data.amount
            })
        }

        for (const len of lent) {
            const {data, error} = await supabase
                .from('users')
                .select("*")
                .in('id', len.data.user_ids);
            res["lent"].push({
                id: len.id,
                name: len.data.name,
                users: data.map((ele) => ele.email_id),
                amount: len.data.amount
            })
        }

        const deleted = data.filter((ele) => ele.type === 4 && ele.data.user_id === user_id);

        for (const del of deleted) {
            const {data, error} = await supabase
                .from('users')
                .select("*")
                .in('id', del.data.user_ids);
            res["deleted_group"].push({
                id: del.id, name: del.data.name, users: data.map((ele) => ele.email_id)
                , amount: del.data.amount
            })
        }

        const groups = data.filter((ele) => ele.type === 1 && ele.data.user_ids.includes(user_id));
        for (const group of groups) {
            res["added_group"].push({id: group.id, name: group.data.name})
        }

        if (error) {
            return response.status(400).send(error);
        }
        return response.send({success: res});
    } catch (e) {
        return response.status(500).send(errorCodeResponses["500"]);
    }
}

export const addNotification = async (request, response) => {
    const {type, data} = request.body;

    try {
        const res = await supabase
            .from('notification')
            .insert([
                {data, type}
            ]);

        if (res.error) {
            return response.status(400).send(res.error);
        }
        return response.send({success: res.data});
    } catch (e) {
        return response.status(500).send(errorCodeResponses["500"]);
    }
}

export const sendCustomEmail = async (request, response) => {
    sgMail.setApiKey("insert-api-key")

    const {emailSubject, emailBody, emailMembers} = request.body;

    const msg = {
        to: emailMembers,
        from: 'uppeabhishek97@gmail.com',
        subject: emailSubject,
        text: emailBody,
    }

    sgMail
        .sendMultiple(msg)
        .then(() => {
            return response.status(200).send("Email successfully sent");
        })
        .catch((error) => {
            return response.status(400).send(error);
        })
}

export const deleteNotification = async (request, response) => {
    const id = request.params.id;
    try {
        const {data, error} = await supabase
            .from('notification')
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