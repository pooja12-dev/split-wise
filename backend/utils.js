import {supabase} from "./models/index.js";

export const errorCodeResponses = {
    500: "An error occurred. Please try again!"
}

// The function check if a field is present or not in a JSON object
export const isFieldAbsent = (fields) => {
    let fieldAbsent = false;

    for (let field of fields) {
        if (!field.value) {
            fieldAbsent = field;
            break;
        }
    }
    return fieldAbsent;
}