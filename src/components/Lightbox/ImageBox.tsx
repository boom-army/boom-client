import { SRLWrapper } from "simple-react-lightbox";
import { styled } from "@mui/material/styles";

const ImageBoxWrapper = styled("div")((props: any) => ({
  "> div": {
    display: "flex",
    borderRadius: "0.2em",
    border: `1px solid ${props.theme.secondaryColor}`,
    overflow: "hidden",
    maxWidth: "400px",
    width: "100%",
    flexWrap: "wrap",
    margin: "0.75rem 0",
  },

  "> div > .tweet-image-col": {
    display: "flex",
    flex: "50%",
    width: "100%",
  },
}));

const ImageColumn = styled("div")<{ fileslength?: any; props?: any }>(
  (props) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: "50%",
    marginRight: props.fileslength > 1 ? "2px;" : "0;",
  })
);

const ImageWrapper = styled("div")<{
  hasfullheight?: any;
  hasbottommargin?: any;
  fileindex?: any;
  props?: any;
}>({
  lineHeight: "0",
  height: "100%",
});

const Image = styled("img")<{ disablelightbox?: any; props?: any }>(
  (props) => ({
    objectFit: "cover",
    maxWidth: "400px",
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: props.disablelightbox ? "inherit" : "pointer",
  })
);

interface Props {
  files?: any;
  isLeftCol?: boolean;
  disablelightbox?: any;
}

const ImageColumnContainer = ({ files, isLeftCol, disablelightbox }: Props) => {
  const className = `tweet-image-col ${
    isLeftCol ? "tweet-image-left-col" : "tweet-image-right-col"
  }`;  

  return (
    <div className={className}>
      <ImageColumn fileslength={files.length}>
        {files.map((file: any, index: number, arr: any) => (
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

export const ImageBox = ({ files, disablelightbox }: Props) => {
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

  const leftColumnFiles = files.filter((_: any, index: number, arr: any) => {
    return index === 0 || (arr.length === 4 && index === 2);
  });

  const rightColumnFiles = files.filter((_: any, index: number, arr: any) => {
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
