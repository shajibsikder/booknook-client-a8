import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://admin:admin123@cluster0.mongodb.net/booknook_db?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const db = client.db(process.env.DB_NAME || "booknook_db");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  secret: process.env.BETTER_AUTH_SECRET || "booknook-better-auth-secret-key-super-secure-32",
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export type Session = typeof auth.$Infer.Session;
