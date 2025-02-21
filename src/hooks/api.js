// import { API_USER_URL } from '@env';

/**
 * Object Request Header
 */
import { Cookies } from "react-cookie";

const cookies = new Cookies();

/**
 * Get the access token from cookies
 * @returns {string} The access token or empty string if not found
 */
const getAccessToken = () => {
    if (typeof window !== "undefined") {
        return cookies.get("deep-access") || "";
    }
    return "";
};

/**
 * Logout function that handles user logout
 */
const logout = () => {
    const accessToken = getAccessToken();
    fetch(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/80/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "deep-token": accessToken
        },
        body: JSON.stringify({
            refreshToken: accessToken,
        }),
    }).then((res) => {
        cookies.remove("deep-access", { path: "/" });
        localStorage.clear();
        window.location.replace(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_PORT}/auth/login`);
    });
};

/**
 * Request headers configuration
 */
export const requestHeader = {
    Accept: "application/json",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "deep-token": getAccessToken(),
};

/**
 *
 * @param {string} url
 * @param {string, [GET, POST, PATCH, PUT...]} method
 * @param {payload} payload
 * @param {boolean} token
 * @param {boolean} text
 * @param {boolean} form
 * @returns Response Data;
 */

// const API_USER_URL = 'http://localhost:4040/'
const API_USER_URL = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_INTERROGATOR_API_ROUTE}/`;

export async function request(url, method, payload, token, text, form) {
    const headers = {
        ...requestHeader,
        "Content-Type": form ? "multipart/form-data" : "application/json",
        "deep-token": token ? getAccessToken() : getAccessToken(),
    };

    const requestOptions = {
        method,
        headers,
    };

    if (method !== "GET" && payload) {
        requestOptions.body = form ? payload : JSON.stringify(payload);
    }

    try {
        const response = await fetch(API_USER_URL + url, requestOptions);

        if (response.status === 403) {
            logout();
            throw new Error("Access forbidden. Redirecting to login page.");
        }

        return text ? await response.text() : await response.json();
    } catch (err) {
        console.error(`Request Error ${url}: `, err);
        throw err;
    }
}
