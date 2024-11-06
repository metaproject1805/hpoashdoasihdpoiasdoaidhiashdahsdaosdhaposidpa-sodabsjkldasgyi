import Cookies from "js-cookie";
import { TokenObjectInterface } from "./types";

export function useToken() {

  // useEffect(() => {
  //   if (accessToken) {
  //     try {
  //       const decoded = jwt.decode(accessToken) as DecodedToken;
  //       const currentTime = Math.floor(Date.now() / 1000);

  //       if (decoded.exp && decoded.exp < currentTime) {
  //         console.error("Token has expired");
  //         setError("Session expired. Please log in again.");
  //         return;
  //       }

  //       setUserId(decoded.user_id);
  //     } catch (error) {
  //       console.error("Failed to decode token:", error);
  //       setError("Invalid token. Please log in again.");
  //     }
  //   }
  // }, [accessToken]);
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
