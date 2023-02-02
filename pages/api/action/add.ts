import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!session) {
    throw new Error("Access denied!");
  }
  const userName = session.name || '';

  const { name, description } = req.body;
  try {
    const action = await prisma.action.create({
      data: {
        name,
        description,
        creator: {
          connect: {
            name: userName,
          },
        },
      },
    });
    res.status(200).json(action);
  } catch (err: any) {
    res.status(500).json(err?.message || err);
  }
}
