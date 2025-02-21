// import { API_USER_URL } from '@env';
"use client"
/**
 * Object Request Header
 */
import { Cookies } from 'react-cookie';
const cookies = new Cookies();
let access = '';
if (typeof window !== 'undefined') {
  access = cookies.get('deep-access');
}
export const requestHeader = {
  Accept: 'application/json',
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  'deep-token': access
};

const getAccessToken = async () => {
  return await cookies.get("deep-access");
};

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

// export const requestHeader = {
//     Accept: "application/json",
//     "Cache-Control": "no-cache",
//     "Content-Type": "application/json",
//     "deep-token": getAccessToken(),
// };

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
  requestHeader['Content-Type'] =
    form === true ? 'multipart/form-data' : 'application/json'

  requestHeader['deep-token'] = access || cookies.get('deep-access');

  console.log(requestHeader);

  if (method === "GET") {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
    })
      .then((res) => {
        if (res.status === 403) {
          // Redirect to the login page
          logout();
          throw new Error("Access forbidden. Redirecting to login page.");
        } else if (text === true) {
          return res.text();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Request Error ${url}: `, err);
        throw new Error(err);
        // return err;
      });
  } else {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
      body: form === true ? payload : JSON.stringify(payload),
    })
      .then((res) => {
        if (res.status === 403) {
          // Redirect to the login page
          logout();
          throw new Error("Access forbidden. Redirecting to login page.");
        } else if (text === true) {
          return res.text();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Request Error ${url}: `, err);
        return err;
      });
  }
}
