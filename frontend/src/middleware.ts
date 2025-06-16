import { NextRequest, NextResponse } from "next/server";
import { ERROR_MSGS } from "./constants";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  console.log({ pathname });

  // if (pathname === "/") {
  //   return NextResponse.redirect(new URL("/conversas", req.url));
  // }

  // if (pathname !== "/login") {
  //   if (!accessToken) {
  //     res.cookies.set(
  //       "toastMsg",
  //       JSON.stringify({ msg: ERROR_MSGS.DO_LOGIN, type: "info" }),
  //       {
  //         path: "/",
  //         httpOnly: false,
  //       },
  //     );
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  // } else if (accessToken) NextResponse.redirect(new URL("/dashboard", req.url));

  return res;
}

export const config = {
  // serve pra carregar o css no redirecionamento
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
