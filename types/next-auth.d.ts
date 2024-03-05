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
    }
  }

  interface User extends DefaultUser {
      type: string    
      id: string
      name?: string | null
      email: string
      image?: string | null
      avatar?: string | null
      password: string
  }

  
declare module "@auth/core/adapters" {
    interface AdapterUser {
      // Add your additional properties here:
      email: string | null;
      password: string | null;
    }
  }
}