import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function uploadS3formidable(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const images = await prisma.images.findMany();
    res.status(200).json({ message: images });
  } catch (error) {
    res.status(500).json({ error });
  }
}
