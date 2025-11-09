import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const auth = betterAuth({
  baseUrl: process.env.BETTER_AUTH_URL as string,
  cookies: {
    sessionToken: { sameSite: 'none', secure: true },
    csrfToken: { sameSite: 'none', secure: true },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    },
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
});
