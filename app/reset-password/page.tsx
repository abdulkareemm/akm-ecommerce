"use client"
import UpdatePassword from "@components/UpdatePassword";
import axios from "axios";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


interface Props {
  searchParams: {
    token: string;
    userId: string;
  };
}

export default  function ResetPassword({ searchParams }: Props) {
  const { token, userId } = searchParams;
  const [ verifyToken, setVerifyToken ] = useState(false);
  const verify = async()=>{
    try {
      const response = await axios.post("/api/users/verify-password-token", { token, userId });
      setVerifyToken(response.data.verifyToken);
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  }
  useEffect(() => {
  console.log(token, userId);

      verify();
  }, [token, userId])
  if (!token || !userId) return notFound();
  return (
    <>
      {verifyToken ? (
        <div className="flex items-center justify-center mt-28">
          <UpdatePassword token={token} userId={userId} />
        </div>
      ) : (
        <div className="text-3xl opacity-70 text-center p-5 animate-pulse">
          Please wait...
          <p>We are verifying your link</p>
        </div>
      )}
    </>
  );
}
