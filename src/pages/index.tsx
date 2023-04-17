import ImageDisplay from "@/components/ImageDisplay";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";

interface imageData {
  description: string;
  id: number;
  imageUrl: string;
  name: string;
}

export default function Home() {
  const [images, setImages] = useState<imageData[]>([]);
  useEffect(() => {
    async function getData() {
      const res = await fetch("/api/fetchImages");
      const data = await res.json();
      setImages(data.message);
    }
    getData();
  }, []);
  return (
    <>
      <Navigation />
      <div className="columns-3 mt-14">
        {images.map((image, index) => {
          return (
            <ImageDisplay
              key={index}
              imageName={image.name}
              imageUrl={image.imageUrl}
              imageId={image.id}
            />
          );
        })}
      </div>
    </>
  );
}
