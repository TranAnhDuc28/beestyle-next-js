import axios from "axios";

const httpInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
});


// param pagination json-server
export type OptionsParams = {
    params?: {
        page?: number,
        size?: number,
        // [key: string]: any
    }
}

export default httpInstance;