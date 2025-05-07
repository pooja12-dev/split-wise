import {supabase} from "../models/index.js";
import {errorCodeResponses, isFieldAbsent} from "../utils.js";

// business logic to create a tag using supabase connection
// it validates the request body sent to it before it is processed
// error handling is also managed
export const createTag = async (request, response) => {
    let name = request.body.name;
    let user_id = request.body.user_id;
    let icon = request.body.icon;
    let description = request.body.description;

    try {
        const fields = [
            {
                label: "Name",
                value: name,
            },
            {
                label: "User Id",
                value: user_id,
            },
            {
                label: "Icon",
                value: icon,
            },
        ];

        const field = isFieldAbsent(fields);

        if (field) {
            return response.status(400).send({
                message: "Creation Failed",
                status: 400,
                error: `${field.label} is a required field`,
            });
        }

        const user = supabase.auth.user(); // TODO: get logged in user id
        console.log(user);

        const {data, error} = await supabase.from("tags").insert([
            {
                name: name,
                usage_count: 0,
                description: description,
                icon: icon,
                user_id: user_id,
            },
        ]);

        if (error) {
            return response.status(400).send({
                message: "Creation Failed",
                error: error,
                status: 400,
            });
        }
        console.log("returned");
        return response.status(200).send({
            message: "Created Successfully",
            data: {id: data[0].id},
            status: 200,
            error: null,
        });
    } catch (e) {
        console.log(e);
        return response.status(500).send({
            message: "Creation Failed",
            status: 500,
            error: errorCodeResponses["500"],
        });
    }
};

// business logic to update a tag using supabase
// it validates the request body sent to it before it is processed
// error handling is also managed
export const updateTag = async (request, response) => {
    let name = request.body.name;
    let user_id = request.body.user_id;
    let icon = request.body.icon;
    let description = request.body.description;
    let usage_count = request.body.usage_count;

    const id = request.params.id;

    try {
        const fields = [
            {
                label: "Id",
                value: id,
            },
            {
                label: "Name",
                value: name,
            },
            {
                label: "User Id",
                value: user_id,
            },
            {
                label: "Icon",
                value: icon,
            },
        ];

        const field = isFieldAbsent(fields);

        if (field) {
            return response.status(400).send({
                message: "Updation Failed",
                error: `${field.label} is a required field`,
            });
        }

        const {data, error} = await supabase
            .from("tags")
            .update({
                name,
                usage_count,
                description,
                icon,
                user_id,
            })
            .match({id});

        if (error) {
            return response.status(400).send({
                message: "Updation Failed",
                error: error,
                status: 400,
            });
        }
        console.log("returned");
        return response.status(200).send({
            message: "Updated Successfully",
            data: data,
            status: 200,
            error: null,
        });
    } catch (e) {
        console.log(e);
        return response.status(500).send({
            message: "Updation Failed",
            status: 500,
            error: errorCodeResponses["500"],
        });
    }
};

// business logic to delete a tag using supabase connection
// it validates the request body sent to it before it is processed
// it also checks if the tag which is to be deleted exists or not
// error handling is also managed
export const deleteTag = async (request, response) => {
    const id = request.params.id;

    try {
        await checkExistance(id)
            .then(async (_) => {
                const {data, error} = await supabase
                    .from("tags")
                    .delete()
                    .match({id});

                if (error) {
                    return response.status(400).send({
                        message: "Deletion Failed",
                        error: error,
                        status: 400,
                    });
                }
                console.log("returned");
                return response.status(200).send({
                    message: "Deleted Successfully",
                    data: data[0],
                    status: 200,
                    error: null,
                });
            })
            .catch((error) => {
                if (!error.exists) {
                    return response.status(error.status).send({
                        message: error.message,
                        error: error.message,
                        status: error.status,
                    });
                }
            });
    } catch (e) {
        console.log(e);
        return response.status(500).send({
            message: "Deletion Failed",
            status: 500,
            error: errorCodeResponses["500"],
        });
    }
};

// business logic to view a tag using supabase connection
// it validates the request body sent to it before it is processed
// it also checks if the tag which is to be viewed exists or not
// error handling is also managed
export const viewTag = async (request, response) => {
    const id = request.params.id;

    try {
        const {data, error} = await supabase
            .from("tags")
            .select("*", {count: "exact"})
            .eq("id", id);
        if (error) {
            return response.status(400).send({
                message: "Could not fetch tag",
                error: error,
                status: 400,
            });
        }
        if (data.length == 0) {
            return response.status(404).send({
                message: "Tag not found",
                data: null,
                status: 404,
                error: "Requested tag not found",
            });
        } else {
            console.log("returned");
            return response.status(200).send({
                message: "Tag Details fetched successfully",
                data: data[0],
                status: 200,
                error: null,
            });
        }
    } catch (e) {
        console.log(e);
        return response.status(500).send({
            message: "Could not fetch tag",
            status: 500,
            error: errorCodeResponses["500"],
        });
    }
};

// business logic to fetch all the tags associated to a specific user using supabase connection
// it validates the request body sent to it before it is processed
// error handling is also managed
export const viewTags = async (request, response) => {
    try {
        const user_id = request.params.id;
        if (user_id && user_id !== "undefined") {
            const {data, error} = await supabase
                .from("tags")
                .select("*", {count: "exact"})
                .eq("user_id", user_id);

            if (error) {
                return response.status(400).send({
                    error: error,
                    status: 400,
                });
            }
            return response.status(200).send({data: data, status: 200, error: null});
        } else {
            const {data, error} = await supabase
                .from("tags")
                .select("*", {count: "exact"});
            if (error) {
                return response.status(400).send({
                    error: error,
                    status: 400,
                });
            }
            return response.status(200).send({data: data, status: 200, error: null});
        }


    } catch (e) {
        console.log(e);
        return response
            .status(500)
            .send({status: 500, error: errorCodeResponses["500"]});
    }
};

export const viewTagExpenses = async (request, response) => {
  try {
    let tag_id = request.params.id;
    const fields = [
      {
        label: "User ID",
        value: tag_id,
      },
    ];

        const field = isFieldAbsent(fields);

        if (field) {
            return response.status(400).send({
                message: "Updation Failed",
                error: `${field.label} is a required field`,
            });
        }

    const { data, error } = await supabase
      .from("expense")
      .select("*", { count: "exact" })
      .eq("tag_id", tag_id); // use user id here
    if (error) {
      return response.status(400).send({
        error: error,
        status: 400,
      });
    }
    console.log("returned");
    return response.status(200).send({ data: data, status: 200, error: null });
  } catch (e) {
    console.log(e);
    return response
      .status(500)
      .send({ status: 500, error: errorCodeResponses["500"] });
  }
};

function checkExistance(id) {
    return new Promise(async (resolve, reject) => {
        const {data, error} = await supabase
            .from("tags")
            .select("*")
            .eq("id", id);

        console.log(data);

        if (error) {
            reject({
                message: "Bad request",
                exists: false,
                status: 400,
            });
        }
        if (data.length == 0) {
            reject({
                message: "Tag does not exist",
                exists: false,
                status: 404,
            });
        }
        resolve({
            message: "Tag exists",
            exists: true,
            status: 200,
        });
    });
}

// TODO: path 404 not handled
// TODO: FIX - viewTags should fetch only the ones with the user id
// TODO: check if the tag name exists already or not, while creating a new tag
// TODO: edit tag "name" should not be editable
