import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { Account, User, Session } from "next-auth"
import { JWT } from "next-auth/jwt"

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if(account?.provider === "google") {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/oauth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: "google",
            provider_id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.image,
          }),
        })
        if(!res.ok) return false
      }
      return true
    },
    async redirect({ baseUrl }) {
      console.log("Redirecionando para:", `${baseUrl}/meals`)
      return `${baseUrl}/meals`
    },
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      if(account) token.accessToken = account.access_token
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        accessToken: token.accessToken,
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
