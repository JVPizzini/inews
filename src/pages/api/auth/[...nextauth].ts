//next
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

//faundaDB
import { fauna } from '../../../services/fauna'
import { query as q } from 'faunadb';
import { signIn } from "next-auth/client";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user'
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(user, account, profile) {

      console.log(user)
      const { email } = user;

      try {
        await fauna.query(

          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_email'),
                q.Casefold(user.email)
              )
            )
          )


        )
        return true
      }
      catch { return false }
    }
  },
})