import React, { FormEventHandler, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  title: string;
}

export default function AuthFormContainer({
  title,
  children,
  onSubmit,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-96  mt-5 mb-5 rounded-md relative overflow-hidden  p-1 bg-transparent"
    >
      <span className="box"></span>
      <div className="flex flex-col space-y-6 p-5 bg-white ">
        <h3 className="text-center font-semibold mt-4">{title}</h3>
        {children}
      </div>
    </form>
  );
}
