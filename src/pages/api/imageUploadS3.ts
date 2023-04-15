import aws from "aws-sdk";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

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
      const data = await s3.upload(params).promise();
      res.status(200).json({ message: data });
    } catch (error) {
      res.status(500).json({ error });
    }
  });
}
