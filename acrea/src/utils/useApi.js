async function useApi({
    url = "/",
    method = "GET",
    headers,
    data = {},
    authRequired = false,
    authToken,
}) {
    try {
        var headers_default = { 'Content-Type': 'application/json' }
        if(authRequired && authToken){
            headers_default["Authorization"] = `Bearer ${authToken}`
        }
        var rawRes = await fetch(`${import.meta.env.VITE_BASE_API_URL}${url}`, {
            method: method,
            headers: headers || headers_default,
            ...(method !== "GET" ? { body: JSON.stringify(data) } : {})
        })
        try {
            return await rawRes.json();
        } catch (err) {
            return ("Error while converting to JSON")
        }

    } catch (err) {
        return err
    }
}
export default useApi;