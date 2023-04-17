import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function projectDisplay(props: {
  imageName: string;
  imageUrl: string;
  imageDescription: string;
}) {
  return (
    <Card sx={{ maxWidth: 345, mt: 6, ml: 4 }}>
      <Image
        alt={props.imageName}
        src={props.imageUrl}
        width="300"
        height="200"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.imageName}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {props.imageDescription}
        </Typography>
      </CardContent>
    </Card>
  );
}
