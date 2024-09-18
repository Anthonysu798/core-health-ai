import NextAuth from 'next-auth';
import GoogleProvider from '@auth/google-provider';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // Add any additional configuration here
});