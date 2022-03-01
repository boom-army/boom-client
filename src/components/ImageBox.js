import { SRLWrapper } from "simple-react-lightbox";
import { styled } from "@mui/material/styles";

const ImageBoxWrapper = styled("div")((props) => ({
  "> div": {
    display: "flex",
    borderRadius: "16px",
    border: `1px solid ${props.theme.secondaryColor}`,
    overflow: "hidden",
    width: "90%",
    flexWrap: "wrap",
    margin: "0 0 0.75rem",
  },

  "> div > .tweet-image-col": {
    display: "flex",
    flex: "50%",
    width: "100%",
  },
}));

const ImageColumn = styled("div")((props) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  flex: "50%",
  marginRight: props.fileslength > 1 ? "2px;" : "0;",
}));

const ImageWrapper = styled("div")((props) => ({
  lineHeight: "0",
  height: "100%",
  marginBottom: props.hasbottommargin ? "2px;" : "0;",
}));

const Image = styled("img")((props) => ({
  objectFit: "cover",
  maxWidth: "100%",
  width: "100%",
  height: "100%",
  position: "relative",
  cursor: props.disablelightbox ? "inherit" : "pointer",
}));

const ImageColumnContainer = ({ files, isLeftCol, disablelightbox }) => {
  const className = `tweet-image-col ${
    isLeftCol ? "tweet-image-left-col" : "tweet-image-right-col"
  }`;
  return (
    <div className={className}>
      <ImageColumn fileslength={files.length}>
        {files.map((file, index, arr) => (
          <ImageWrapper
            key={file.id}
            hasfullheight={arr.length === 1 ? "true" : "false"}
            hasbottommargin={arr.length > 1 && index === 0 ? "true" : "false"}
            fileindex={index}
          >
            <Image
              disablelightbox={disablelightbox}
              key={file.id}
              src={file.url}
              alt="tweet-file"
            />
          </ImageWrapper>
        ))}
      </ImageColumn>
    </div>
  );
};

export const ImageBox = ({ files, disablelightbox }) => {
  const options = {
    settings: {
      lightboxTransitionSpeed: 0,
    },
    buttons: {
      showAutoplayButton: false,
      showDownloadButton: false,
      showThumbnailsButton: false,
    },
  };

  const leftColumnFiles = files.filter((_, index, arr) => {
    return index === 0 || (arr.length === 4 && index === 2);
  });

  const rightColumnFiles = files.filter((_, index, arr) => {
    return (
      index === 1 ||
      (arr.length === 3 && index === 2) ||
      (arr.length === 4 && index === 3)
    );
  });

  if (disablelightbox)
    return (
      <ImageBoxWrapper>
        {!!files.length && (
          <div>
            {!!leftColumnFiles.length && (
              <ImageColumnContainer
                disablelightbox
                files={leftColumnFiles}
                isLeftCol={true}
              />
            )}
            {!!rightColumnFiles.length && (
              <ImageColumnContainer
                disablelightbox
                files={rightColumnFiles}
                isLeftCol={false}
              />
            )}
          </div>
        )}
      </ImageBoxWrapper>
    );

  return (
    <ImageBoxWrapper>
      {!!files.length && (
        <SRLWrapper options={options}>
          {!!leftColumnFiles.length && (
            <ImageColumnContainer files={leftColumnFiles} isLeftCol={true} />
          )}
          {!!rightColumnFiles.length && (
            <ImageColumnContainer files={rightColumnFiles} isLeftCol={false} />
          )}
        </SRLWrapper>
      )}
    </ImageBoxWrapper>
  );
};
