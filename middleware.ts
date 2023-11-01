export { default } from "next-auth/middleware"

export const config = {matcher: ["/dashboard", "/new", "/ticket/:path*", "/dashboard/setting"]}