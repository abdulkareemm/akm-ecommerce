"use client";
import React, { useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

interface Props {
  searchParams: { token: string; userId: string };
}

export default function Verify(props: Props) {
  const { token, userId } = props.searchParams;
  const router = useRouter();
  // verify the token and userId
  const verify = async () => {
    try {
      const response = await axios.post("/api/users/verify", { token, userId });
      toast.success(response.data.message);
      router.replace("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };
  useEffect(() => {
      verify();
  }, [token, userId]);
  if (!token || !userId) return notFound();

  return (
    <div className="text-3xl opacity-70 text-center p-5 animate-pulse">
      Please wait...
      <p>We are verifying your email</p>
    </div>
  );
}
