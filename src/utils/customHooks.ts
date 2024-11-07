import Cookies from "js-cookie";
import { TokenObjectInterface } from "./types";

export function useToken() {

  const token = Cookies.get("access-token");
  function decodeToken() {
    if (!token) {
      return undefined
      // throw new Error("No access token found");
    }

    const decodedToken: TokenObjectInterface = JSON.parse(
      atob(token.split(".")[1])
    );
    return decodedToken;
  }

  function tokenHandler() {
    if (!token) {
      return undefined
      // throw new Error("No access token found");
    }
    return token;
  }

  return { accessToken: tokenHandler(), tokenObject: decodeToken() };
}
