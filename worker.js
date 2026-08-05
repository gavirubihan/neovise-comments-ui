export default {
    async fetch(request, env) {
        // Handle CORS preflight requests
        if (request.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, OPTIONS",
                    "Access-Control-Allow-Headers": "*",
                },
            });
        }

        // Serve the requested asset
        const response = await env.ASSETS.fetch(request);

        // Clone the response so we can modify headers
        const newResponse = new Response(response.body, response);

        // Add CORS headers
        newResponse.headers.set("Access-Control-Allow-Origin", "*");
        newResponse.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
        newResponse.headers.set("Access-Control-Allow-Headers", "*");

        return newResponse;
    }
};