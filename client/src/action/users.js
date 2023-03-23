const { axiosInstance } = require(".");

export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/register", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const AuthUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/Auth", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
};


export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/login", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const CurrentUser = async () => {
    try {
        const response = await axiosInstance.get("/api/users/current-user");
        return response.data;
    } catch (error) {
        return error;
    }
}

export const editProfile = async () => {
    try {
        const response = await axiosInstance.patch("/api/users/editProfile");
        return response.data;
    } catch (error) {
        return error.response;
    }
    
}