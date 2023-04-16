import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function ImageDisplay() {
  const imageUrl =
    "https://earlyfusedevbucket.s3.amazonaws.com/d2ff28858ae3044ddc9bbad03.png";
  return (
    <Card sx={{ maxWidth: 345, mt: 6, ml: 4 }}>
      <Image alt="preview image" src={imageUrl} width="300" height="200" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
      </CardContent>
    </Card>
  );
}
