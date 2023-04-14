const FileUploader = (props: { setImage: any; setSelectedImage: any }) => {
  return (
    <div>
      <div>
        <input
          type="file"
          onChange={({ target }) => {
            if (target.files) {
              const file = target.files[0];
              props.setSelectedImage(URL.createObjectURL(file));
              props.setImage(file);
            }
          }}
        />
      </div>
    </div>
  );
};

export default FileUploader;
