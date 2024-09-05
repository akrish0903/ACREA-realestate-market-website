async function useApi({
    url = "/", method = "GET", headers = { 'Content-Type': 'application/json' }, data = {}
}) {
    try {
        var rawRes = await fetch(`${import.meta.env.VITE_BASE_API_URL}${url}`, {
            method: method,
            headers: headers,
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