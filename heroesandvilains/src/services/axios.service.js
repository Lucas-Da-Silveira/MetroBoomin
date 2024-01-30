import Axios from 'axios';

let axiosAgent = Axios.create({
    baseURL: 'https://apidemo.iut-bm.univ-fcomte.fr/herocorp'
});

let errorHandler = (err) => {
    if (err.response) {
        console.log("Response Error: " + JSON.stringify(err.response));
        return {
            data: {
                error: 1,
                data: err.response.data
            }
        };
    } else if (err.request) {
        console.log("Network Error: " + JSON.stringify(err.request));
        return {
            data: {
                error: 1,
                data: 'Server unreachable or no response from server'
            }
        };
    } else {
        console.log("Unknown Error");
        return {
            data: {
                error: 1,
                data: 'Unknown Error'
            }
        };
    }
}

let getMethod = async (url, options) => {
    let res = null;
    try {
        res = await axiosAgent.get(url, options);
    } catch(err) {
        res = errorHandler(err);
    }
    return res.data;
}

let postMethod = async (url, data) => {
    let res = null;
    try {
        res = await axiosAgent.post(url, data);
    } catch(err) {
        res = await errorHandler(err);
    }
    return res.data;
}

let patchMethod = async (url, data) => {
    let res = null;
    try {
        res = await axiosAgent.patch(url, data);
    } catch(err) {
        res = await errorHandler(err);
    }
    return res.data;
}

let deleteMethod = async (url) => {
    let res = null;
    try {
        res = await axiosAgent.delete(url);
    } catch(err) {
        res = await errorHandler(err);
    }
    return res.data;
}

export {
    getMethod,
    postMethod,
    patchMethod,
    deleteMethod
};