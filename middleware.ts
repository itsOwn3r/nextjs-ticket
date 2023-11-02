export { default } from "next-auth/middleware"

export const config = {matcher: ["/", "/new", "/ticket/:path*", "/setting"]}