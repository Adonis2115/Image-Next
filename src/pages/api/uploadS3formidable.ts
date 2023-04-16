import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const accessKeyId = process.env.S3_BUCKET_USER_ACCESS_KEY!;
const secretAccessKey = process.env.S3_BUCKET_USER_SECRET!;
const region = process.env.S3_BUCKET_REGION!;
const bucket = process.env.S3_BUCKET_NAME!;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
  region: region,
});

export default async function uploadS3formidable(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files: any) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    const imageName =
      files.image.newFilename + "." + files.image.mimetype.split("/")[1];
    const params = {
      Bucket: bucket,
      Key: imageName,
      Body: fs.createReadStream(files.image.filepath),
      ContentType: files.image.mimetype,
    };
    try {
      const uploadCommand = new PutObjectCommand(params);
      await s3.send(uploadCommand);
      const record = await prisma.images.create({
        data: {
          name: Array.isArray(fields.fileName)
            ? fields.fileName[0]
            : fields.fileName,
          description: Array.isArray(fields.description)
            ? fields.description[0]
            : fields.description,
          imageUrl: `https://${bucket}.s3.amazonaws.com/${imageName}`,
        },
      });
      res.status(200).json({ message: record });
    } catch (error) {
      res.status(500).json({ error });
    }
  });
}
