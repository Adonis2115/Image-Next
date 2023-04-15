import aws from "aws-sdk";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export const config = {
  api: {
    bodyParser: false,
  },
};
interface Fields {
  fileName: string;
  description: string;
}
export default async function imageUploadS3(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files: any) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    const s3 = new aws.S3({
      region: process.env.S3_BUCKET_REGION,
      accessKeyId: process.env.S3_BUCKET_USER_ACCESS_KEY,
      secretAccessKey: process.env.S3_BUCKET_USER_SECRET,
    });
    const params = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: files.image.newFilename,
      Body: files.image.filepath,
    };
    try {
      const imageDetails = await s3.upload(params).promise();
      const record = await prisma.images.create({
        data: {
          name: Array.isArray(fields.fileName)
            ? fields.fileName[0]
            : fields.fileName,
          description: Array.isArray(fields.description)
            ? fields.description[0]
            : fields.description,
          imageUrl: imageDetails.Location,
        },
      });
      res.status(200).json({ message: record });
    } catch (error) {
      res.status(500).json({ error });
    }
  });
}
