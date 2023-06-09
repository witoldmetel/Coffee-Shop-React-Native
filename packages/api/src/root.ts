import { authRouter } from "./router/auth";
import { likeRouter } from "./router/like";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  postxd: postRouter,
  auth: authRouter,
  like: likeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
