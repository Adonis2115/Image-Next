// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  image: File;
  description: string;
};

export default function imageUpload(req: NextApiRequest, res: NextApiResponse) {
  // const name = req.body.name;
  // const description = req.body.description;
  // const image = req.body.image;
  // console.log(name);
  // console.log(description);
  // console.log(image);
  console.log(req.body);
  res
    .status(200)
    .json({ name: "name, description: description, image: image " });
}
