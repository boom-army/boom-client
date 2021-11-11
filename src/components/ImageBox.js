import { SRLWrapper } from "simple-react-lightbox";
import styled from 'styled-components';

const ImageBoxWrapper = styled.div`
  > div {
    display: flex;
    border-radius: 16px;
    border: 1px solid ${(props) => props.theme.secondaryColor};
    overflow: hidden;
    width: 90%;
    flex-wrap: wrap;
    margin: 0 0 0.75rem;
  }

  > div > .tweet-image-col {
    display: flex;
    flex: 50%;
    width: 100%;
  }
`;

const ImageColumn = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 50%;
  margin-right: ${props => props.filesLength > 1 ? '2px;' : '0;'}
`;

const ImageWrapper = styled.div`
  line-height: 0;
  height: 100%;
  margin-bottom: ${props => props.hasBottomMargin ? '2px;' : '0;'}
`;

const Image = styled.img`
  object-fit: cover;
  max-width: 100%;
  width: 100%;
  height: 100%;
  position: relative;
  cursor: ${props => props.disableLightbox ? 'inherit' : 'pointer'}
`;

const ImageColumnContainer = ({ files, isLeftCol, disableLightbox }) => {
  const className = `tweet-image-col ${isLeftCol ? 'tweet-image-left-col' : 'tweet-image-right-col'}`
  return (
    <div className={className}>
      <ImageColumn filesLength={files.length}>
        {files.map((file, index, arr) => (
          <ImageWrapper key={file.id} hasFullHeight={arr.length === 1} hasBottomMargin={arr.length > 1 && index === 0} fileIndex={index}>
            <Image disableLightbox={disableLightbox} key={file.id} src={file.url} alt="tweet-file" />
          </ImageWrapper>
        ))}
      </ImageColumn>
    </div>
  );
};

export const ImageBox = ({ files, disableLightbox }) => {
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
    return index === 1 || (arr.length === 3 && index === 2) || (arr.length === 4 && index === 3);
  });

  if (disableLightbox) return (
    <ImageBoxWrapper>
      {!!files.length && (
        <div>
          {!!leftColumnFiles.length && <ImageColumnContainer disableLightbox files={leftColumnFiles} isLeftCol={true} />}
          {!!rightColumnFiles.length && <ImageColumnContainer disableLightbox files={rightColumnFiles} isLeftCol={false} />}
        </div>
      )}
    </ImageBoxWrapper>
  )

  return (
    <ImageBoxWrapper>
      {!!files.length && (
        <SRLWrapper options={options}>
          {!!leftColumnFiles.length && <ImageColumnContainer files={leftColumnFiles} isLeftCol={true} />}
          {!!rightColumnFiles.length && <ImageColumnContainer files={rightColumnFiles} isLeftCol={false} />}
        </SRLWrapper>
      )}
    </ImageBoxWrapper>
  );
};
