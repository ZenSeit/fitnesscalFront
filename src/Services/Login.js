import { decodeToken, isExpired } from "react-jwt";

export async function Logins(nickname, password) {

  const res = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname, password }),
  }).catch((error) => error.text());
  const data = res.headers;
  if (data.get("Authorization") !== null){
    window.localStorage.setItem("token", data.get("Authorization"));
    return "ok"
  }
}

export function VerifyToken() {
  const token = window.localStorage.getItem("token");

  const myDecodedToken = token ? decodeToken(token).jti : null;
  const availableToken = token ? !isExpired(token) :false;

  return {myDecodedToken,availableToken};
}
