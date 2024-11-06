"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import ProfilePage from "@/components/UserComponent";
import AdminPage from "@/components/AdminProfile";

interface UserToken {
  active: boolean;
  email: string;
  exp: number;
  iat: number;
  is_superuser: boolean;
  jti: string;
  name: string;
  token_type: string;
  user_id: number;
}

const UserProfilePage = () => {
  const router = useRouter();
  const [token, setToken] = useState<UserToken | JwtPayload | null>(null);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  useEffect(() => {
    const accessToken = Cookies.get("access-token");
    setAccessToken(accessToken);
    if (!accessToken) {
      router.push("/login");
    } else {
      const decodedToken = jwt.decode(accessToken) as JwtPayload | null;
      setToken(decodedToken);
      if (decodedToken && typeof decodedToken !== "string") {
        if (!decodedToken.active) {
        }
      }
    }
  }, [router]);
  if (accessToken) {
    if (token?.is_superuser) {
      return <AdminPage/>;
    } else {
      return (
        <ProfilePage
          token={accessToken}
          id={token?.user_id}
          active={token?.active}
        />
      );
    }
  }
};

export default UserProfilePage;
