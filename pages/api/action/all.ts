import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const actions = await prisma.action.findMany({
    include: {
      creator: true,
    },
    orderBy: [
      {
        dateCreated: 'desc',
      },
    ],
  });
  res.status(200).json(actions);
}
