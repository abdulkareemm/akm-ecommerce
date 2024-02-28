import React from "react";
import Image from "next/image";
import Link from "next/link";
type Props = {
  width: number;
  height: number;
};
export default function Logo(props: Props) {
  return (
    <Link href="/" className="rounded-lg overflow-hidden">
      <Image
        src="/images/logo.jpeg"
        alt="Logo"
        className="relative"
        width={props.width}
        height={props.height}
      />
    </Link>
  );
}
