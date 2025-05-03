/**
 * @author ${Vatsal Yadav}
 */

import {supabase} from "../models/index.js";
import {errorCodeResponses, isFieldAbsent} from "../utils.js";
import nodemailer from "nodemailer";
import schedule from "node-schedule";

// The controller creates a reminder in database with details provided by the user and schedule an email
export const createReminder = async (request, response) => {

    const {name, amount, user_id, desc, date, email} = request.body;

    try {
        const fields = [
            {
                label: "Name",
                value: name
            },
            {
                label: "Amount",
                value: amount
            },
            {
                label: "User Id",
                value: user_id
            },
            {
                label: "Description",
                value: desc
            },
            {
                label: "Date",
                value: date
            }
        ];

        const field = isFieldAbsent(fields);

        if (field) {
            return response.status(400).send({error: `${field.label} is a required field`});
        }

        const {data, error} = await supabase
            .from('reminder')
            .insert([
                { name: name, amount: amount, date: date, desc: desc, user_id: user_id }
            ]);

        if (error) {
            return response.status(400).send(error);
        }

        console.log("user", email)

        // e-mail message options
        let mailOptions = {
            from: 'tripmanagementasdc@gmail.com',
            to: email,
            subject: 'Payment Reminder for '+name,
            text: 'Payment Reminder \nAmount: '+amount+'$ \nDetails: '+name+' - '+desc
        };

        // Code Reference [1]: https://stackoverflow.com/a/72279819/12146592
        // e-mail transport configuration
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'tripmanagementasdc@gmail.com',
                pass: 'ythscondtmxkatkj'
            }
        });

        // Code Reference [2]: https://blog.greenroots.info/send-and-schedule-e-mails-from-a-nodejs-app
        // Schedule email for the payment reminder date and time
        schedule.scheduleJob(data[0].id.toString(),new Date(date), function(){
            console.log('Sending mail');
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });

        return response.send({success: data});
    } catch (e) {
        return response.status(500).send(errorCodeResponses["500"]);
    }
}

// The controller updated a reminder in database with details provided by the user and reschedules the previous email
export const updateReminder = async (request, response) => {

    const {id, name, amount, user_id, desc, date, email} = request.body;

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
                label: "Amount",
                value: amount
            },
            {
                label: "User Id",
                value: user_id
            },
            {
                label: "Description",
                value: desc
            },
            {
                label: "Date",
                value: date
            }
        ];

        const field = isFieldAbsent(fields);

        if (field) {
            return response.status(400).send({error: `${field.label} is a required field`});
        }

        const {data, error} = await supabase
            .from('reminder')
            .update(
                { name: name, amount: amount, date: date, desc: desc, user_id: user_id }
            ).match(
                {id:id}
            )

        if (error) {
            return response.status(400).send(error);
        }

        // Code Reference [4]: https://stackoverflow.com/a/53684854/12146592
        let current_job = schedule.scheduledJobs[id.toString()];
        current_job.cancel();

        console.log("user", email)

        // e-mail message options
        let mailOptions = {
            from: 'tripmanagementasdc@gmail.com',
            to: email,
            subject: 'Payment Reminder for '+name,
            text: 'Payment Reminder \nAmount: '+amount+'$ \nDetails: '+name+' - '+desc
        };

        // e-mail transport configuration
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'insert-email',
                pass: 'insert-app-pass'
            }
        });

        schedule.scheduleJob(data[0].id.toString(),new Date(date), function(){
            console.log('Sending mail at '+(new Date()) );
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });

        return response.send({success: data});
    } catch (e) {
        return response.status(500).send(errorCodeResponses["500"]);
    }
}

// The controller deletes the selected payment reminder in the database and deletes the scheduled email
export const deleteReminder = async (request, response) => {
    const id = request.params.id;
    try {
        const {data, error} = await supabase
            .from('reminder')
            .delete()
            .match({id: id});
        if (error) {
            return response.status(400).send(error);
        }

        let current_job = schedule.scheduledJobs[id.toString()];
        current_job.cancel();

        return response.send({success: data});

    } catch (e) {
        return response.status(500).send(errorCodeResponses["500"]);
    }
}

// The controller gets the list of payment reminders added by a user
export const viewReminders = async (request, response) => {
    const {user_id} = request.body;
    try {
        const {data, error} = await supabase
            .from('reminder')
            .select('*')
            .eq('user_id', user_id);
        if (error) {
            return response.status(400).send(error);
        }
        return response.send({success: data});
    } catch (e) {
        return response.status(500).send(errorCodeResponses["500"]);
    }
}