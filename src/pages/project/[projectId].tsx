import Navigation from "@/components/Navigation";
import ProjectDisplay from "@/components/ProjectDisplay";
import Skeleton from "@/components/Skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

interface projectData {
  description: string;
  id: number;
  imageUrl: string;
  name: string;
}

async function getData(projectId: string | string[] | undefined) {
  const data = await axios.post("/api/fetchProject", {
    projectId,
  });
  return data.data.message;
}

export default function Project() {
  const router = useRouter();
  const projectId = router.query.projectId;
  const [project, setProject] = useState<projectData>();
  const { status, error, data } = useQuery({
    enabled: projectId != undefined,
    queryKey: ["image", projectId],
    queryFn: () => getData(projectId),
  });
  useEffect(() => {
    setProject(data);
  }, [data]);
  return (
    <>
      <Head>
        <title>{project ? project.name : "Image_resize"}</title>
      </Head>
      <Navigation />
      {status === "loading" ? (
        <Skeleton />
      ) : project ? (
        <ProjectDisplay
          imageName={project.name}
          imageDescription={project.description}
          imageUrl={project.imageUrl}
        />
      ) : null}
    </>
  );
}
