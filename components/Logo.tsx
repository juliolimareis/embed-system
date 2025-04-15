'use client'

import Image from "next/image";

type LogoProps = {
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo (props: LogoProps){
  return (
    <Image
      alt="Clever Advertising "
      src={"/images/logo.png"}
      className={props.className}
      // className={"mx-auto h-20 w-auto"}
      width={props.width || 100}
      height={props.width || 100}
    />
  )
}