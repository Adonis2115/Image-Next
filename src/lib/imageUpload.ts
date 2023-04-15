import S3 from "aws-sdk/clients/s3";

const bucketName = process.env.S3_BUCKET_NAME!;
const region = process.env.S3_BUCKET_REGION;
const accessKeyId = process.env.S3_BUCKET_USER_ACCESS_KEY;
const secretAccessKey = process.env.S3_BUCKET_USER_SECRET;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export default function imageUpload(file: File) {
  const uploadParams = {
    Bucket: bucketName,
    Body: file,
    Key: "test",
  };
  s3.upload(uploadParams).promise();
}
