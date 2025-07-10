import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import mongoose from "mongoose";
import connectDb from '@/db/connectDb';
import User from '@/models/User';
import Payment from '@/models/Payment';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
      callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
         if(account.provider == "github" || account.provider == "google") { 
          await connectDb()
          // Check if the user already exists in the database
          const currentUser =  await User.findOne({email: email}) 
          if(!currentUser){
            // Create a new user
             const newUser = await User.create({
              email: user.email, 
              username: user.email.split("@")[0], 
            })   
          } 
          return true
         }
      },
      
      async session({ session, user, token }) {
        const dbUser = await User.findOne({email: session.user.email})
        session.user.name = dbUser.username
        return session
      },
    } 
});

export { handler as GET, handler as POST };
