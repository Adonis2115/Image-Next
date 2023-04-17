import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function fetchProject(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projectId = Number(req.body.projectId);
  try {
    const project = await prisma.images.findUnique({
      where: { id: projectId },
    });
    res.status(200).json({ message: project });
  } catch (error) {
    res.status(500).json({ error });
  }
}
