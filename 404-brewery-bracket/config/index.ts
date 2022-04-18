const dev = process.env.NEXT_PUBLIC_NODE_ENV !== "prod";

export const server = dev
  ? "http://localhost:3000"
  : "https://brewery-bracket.vercel.app";
