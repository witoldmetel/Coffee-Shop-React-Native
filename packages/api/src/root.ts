import { authRouter } from "./router/auth";
import { likeRouter } from "./router/like";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  like: likeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
