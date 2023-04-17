import Navigation from "@/components/Navigation";
import ProjectDisplay from "@/components/ProjectDisplay";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface projectData {
  description: string;
  id: number;
  imageUrl: string;
  name: string;
}

export default function Project() {
  const router = useRouter();
  const projectId = router.query.projectId;
  const [project, setProject] = useState<projectData>();
  useEffect(() => {
    async function getData() {
      const data = await axios.post("/api/fetchProject", {
        projectId,
      });
      setProject(data.data.message);
    }
    if (projectId !== undefined) {
      getData();
    }
  }, [projectId]);
  return (
    <>
      <Navigation />
      {project ? (
        <ProjectDisplay
          imageName={project.name}
          imageDescription={project.description}
          imageUrl={project.imageUrl}
        />
      ) : null}
    </>
  );
}
