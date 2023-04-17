import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ImageDisplay(props: {
  imageName: string;
  imageUrl: string;
  imageId: number;
}) {
  const router = useRouter();
  function goToProject() {
    router.push(`/project/${props.imageId}`);
  }
  return (
    <Card
      sx={{ maxWidth: 1000, mt: 6, ml: 50, maxHeight: 200 }}
      onClick={goToProject}
    >
      <Image
        alt={props.imageName}
        src={props.imageUrl}
        width="200"
        height="200"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.imageName}
        </Typography>
      </CardContent>
    </Card>
  );
}
