import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import ImageUpload from "./ImageUpload";
import Image from "next/image";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function NewImageModal(props: ModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const uploadHandler = async () => {
    setUploading(true);
    try {
      if (!image) return;
      const formData = new FormData();
      formData.append("fileName", name);
      formData.append("description", description);
      formData.append("image", image);
      const data = await axios.post("/api/imageUploadS3", formData);
      console.log(data.data.message);
      props.handleClose();
      setName("");
      setDescription("");
      setImage(null);
    } catch (error: any) {
      console.log(error);
    }
    setUploading(false);
  };
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Add New Image
        </Typography>
        <Typography sx={{ mt: 2 }}>Photo Upload</Typography>
        <ImageUpload setImage={setImage} setSelectedImage={setSelectedImage} />
        {image ? (
          <Image
            alt="preview image"
            src={selectedImage}
            width="300"
            height="200"
          />
        ) : null}

        <TextField
          label="Name"
          variant="outlined"
          sx={{ mt: 2 }}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Description"
          multiline
          variant="outlined"
          rows={4}
          sx={{ mt: 2 }}
          fullWidth
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          disabled={uploading}
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={uploadHandler}
        >
          {uploading ? "Uploading.." : "Upload"}
        </Button>
      </Box>
    </Modal>
  );
}
