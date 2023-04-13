const FileUploader = (props: { setImage: any }) => {
  const selectImage = (event: any) => {
    const image = event.target.files[0];
    image.isUploading = true;
    props.setImage(image);
  };
  return (
    <div>
      <div>
        <input type="file" onChange={selectImage} />
      </div>
    </div>
  );
};

export default FileUploader;
