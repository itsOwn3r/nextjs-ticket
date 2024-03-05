import NextAuth, { DefaultUser } from "next-auth"
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: {
      email: string
      name: string
      avatar?: string
      type: string
      password?: string
    }
  }

  interface User extends DefaultUser {
    id: user.id,
    email: user.email,
    name: user.name,
    type: user.type,
    avatar: user.avatar,
  }


  export interface DefaultUser {
    id: string
    name?: string | null
    email?: string | null
    password?: string
    avatar?: string | null
  }
  Currentl
  
declare module "@auth/core/adapters" {
    interface AdapterUser {
      // Add your additional properties here:
      email: string | null;
      password?: string | null;
      avatar?: string
      type: string
    }
  }
}