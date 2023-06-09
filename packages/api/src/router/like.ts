import { z } from "zod";

import { type PrismaClient } from "@acme/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

/**
 * ACTIONS
 */
export const toggleLikeInput = z.object({
  id: z.number(),
});

export const toggleLike = async (
  input: z.infer<typeof toggleLikeInput>,
  prisma: PrismaClient,
): Promise<void> => {
  try {
    const { id } = input;
    // Check if the item with the provided ID exists
    const existingItem = await prisma.like.findUnique({ where: { id } });

    if (!existingItem) {
      // Create a new item with the provided ID and initial liked status
      await prisma.like.create({
        data: { id, liked: true },
      });
    } else {
      // Perform the toggle action (e.g., updating the liked status)
      await prisma.like.update({
        where: { id },
        data: { liked: !existingItem.liked },
      });
    }
  } catch (error) {
    console.error("Toggle like action failed:", error);

    throw error;
  }
};

export const findLikeInput = z.object({
  id: z.number().optional(),
});

export const findLike = async (
  input: z.infer<typeof findLikeInput>,
  prisma: PrismaClient,
) => {
  try {
    const { id } = input;

    if (!id) {
      throw new Error("Item not found");
    }

    return await prisma.like.findFirst({ where: { id: input.id } });
  } catch (error) {
    console.error("Find like action failed:", error);

    throw error;
  }
};

/**
 * ROUTER
 */
export const likeRouter = createTRPCRouter({
  toggleLike: publicProcedure
    .input(toggleLikeInput)
    .mutation(({ ctx, input }) => {
      return toggleLike(input, ctx.prisma);
    }),
  findLike: publicProcedure.input(findLikeInput).query(({ ctx, input }) => {
    return findLike(input, ctx.prisma);
  }),
});
