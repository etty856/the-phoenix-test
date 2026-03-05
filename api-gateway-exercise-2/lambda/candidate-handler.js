function validateRequest(body) {
    console.log(`[CREATE] Request Validation`)
    if (!body) {
        console.log("Bad Request - Request Body is required");
        return "Request body is required";
    }

    if (!body.name) {
        console.log("Bad Request - Missing field 'name'");
        return "Missing required field: name";
    }

    return null;
}

/**
 * Create a new candidate.
 *
 * Validates that the request body exists and contains a 'name' field.
 *
 * Responses:
 *   201: Candidate created successfully
 *   400: Missing or invalid 'name' field
 *   500: Internal server error
 *
 * @param {object} event - Lambda event
 * @param {object} context - Lambda context object
 * @returns {object} HTTP response with statusCode and body
 */
module.exports.create = async (event, context) => {
    console.log("[CREATE] Start");
    console.log("Request ID:", context.awsRequestId);

    try {
        const body = event.body ? JSON.parse(event.body) : null;

        const validationError = validateRequest(body);
        if (validationError) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: validationError })
            };
        }

        console.log("Candidate Data:", body);

        return {
            statusCode: 201,
            body: JSON.stringify({ message: "Candidate created successfully"})
        };

    } catch (error) {
        console.error(`[CREATE] An error occurred. error message: ${error.message}`);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" })
        };
    }
};
