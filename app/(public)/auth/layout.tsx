import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className=" flex items-center justify-center mt-28">{children}</div>
  );
}
