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
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  fetchOptions: { credentials: 'include' },
  session: {
    secret: process.env.BETTER_AUTH_SECRET as string,
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,
    disableSessionRefresh: false,
    cookieCache: { enabled: true, maxAge: 60 },
    cookie: {
      httpOnly: true,
      sameSite:
        (process.env.NODE_ENV as string) === 'production' ? 'none' : 'lax',
      secure: (process.env.NODE_ENV as string) === 'production',
      domain: process.env.FRONTEND_DOMAIN as string,
    },
  },
  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    // facebook: {
    //   clientId: process.env.FACEBOOK_CLIENT_ID as string,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    // },
  },
  trustedOrigins: [process.env.FRONTEND_URL as string, 'http://localhost:5173'],
  user: {
    additionalFields: {
      role: { type: 'string', input: true, defaultValue: 'PENGGUNA' },
    },
  },
});
