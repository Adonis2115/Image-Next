import ImageDisplay from "@/components/ImageDisplay";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/components/Skeleton";
import Head from "next/head";

interface imageData {
  description: string;
  id: number;
  imageUrl: string;
  name: string;
}

async function getData() {
  const res = await fetch("/api/fetchImages");
  const data = await res.json();
  return data.message;
}

export default function Home() {
  const [images, setImages] = useState<imageData[]>([]);
  const { status, error, data } = useQuery({
    queryKey: ["images"],
    queryFn: getData,
  });
  useEffect(() => {
    if (data) setImages(data);
  }, [data]);
  return (
    <>
      <Head>
        <title>Image_resize</title>
      </Head>
      <Navigation />
      <div className="mt-14">
        {status === "loading" ? (
          <Skeleton />
        ) : (
          images.map((image, index) => {
            return (
              <ImageDisplay
                key={index}
                imageName={image.name}
                imageUrl={image.imageUrl}
                imageId={image.id}
              />
            );
          })
        )}
      </div>
    </>
  );
}
