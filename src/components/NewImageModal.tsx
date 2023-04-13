import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import ImageUpload from "./ImageUpload";

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
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}

export default function NewImageModal(props: ModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const uploadHandler = () => {
    console.log(name);
    console.log(description);
    console.log(image);
  };
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Add New Image
        </Typography>
        <Typography sx={{ mt: 2 }}>Photo Upload</Typography>
        <ImageUpload setImage={setImage} />
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
        <Button variant="outlined" sx={{ mt: 2 }} onClick={uploadHandler}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
}
