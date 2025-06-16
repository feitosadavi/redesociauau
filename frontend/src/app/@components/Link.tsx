"use client";

import React, { AnchorHTMLAttributes } from "react";
import NextLink from "next/link";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const Link: React.FC<Props> = ({ children, href, ...props }) => {
  return (
    <NextLink
      href={href}
      prefetch={true}
      className="inline-block rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;
