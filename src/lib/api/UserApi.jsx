export const userRegister = async ({ username, password, name }) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
            name,
        }),
    });
};

export const userLogin = async ({ username, password }) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/api/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });
};

export const userUpdateProfile = async (token, name) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/api/users/current`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({
            name,
        }),
    });
};

export const userUpdatePassword = async (token, password) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/api/users/current`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({
            password,
        }),
    });
};

export const userDetailProfile = async (token) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/api/users/current`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': token,
        },
    });
};

export const userLogout = async (token) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/api/users/current`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': token,
        },
    });
};
