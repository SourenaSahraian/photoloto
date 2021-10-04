async function client(endpoint, config) {
    const response = await window.fetch(endpoint, config);

    const contentType = response.headers.get('content-type');

    let data;
    if (!contentType) {
        data = null;
    } else {
        data = await response.json();
    }

    if (response.ok) {
        return data;
    }

    const error = data;             
    return await Promise.reject(error);
}

export default client;