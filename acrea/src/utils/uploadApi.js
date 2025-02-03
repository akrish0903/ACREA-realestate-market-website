async function uploadApi({
    url = "/",
    method = "POST",
    data = {},
    authRequired = false,
    authToken,
}) {
    try {
        const headers = { 'Content-Type': 'multipart/form-data' }; // Set content type for file uploads
        if (authRequired && authToken) {
            headers["Authorization"] = `Bearer ${authToken}`;
        }

        const rawRes = await fetch(`${import.meta.env.VITE_BASE_API_URL}${url}`, {
            method: method,
            headers: headers,
            body: data, // Send the FormData directly
        });

        return await rawRes.json();
    } catch (err) {
        console.error('Error in uploadApi:', err);
        throw new Error('Failed to upload images');
    }
}

export default uploadApi;
