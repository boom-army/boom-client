import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box } from '@mui/system';
import { GIFObject } from 'giphy-api';

interface Props {
  gifArr: GIFObject[],
  setGif: React.Dispatch<React.SetStateAction<GIFObject>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

export const ImageGrid: React.FC<Props> = ({ gifArr, setGif, setOpen }) => {
  if (!gifArr.length) {
    return <Box sx={{ margin: 2 }}>
      <p>No gifs were found</p>
    </Box>
  }
  return (
    <ImageList variant="masonry" cols={3} gap={8}>
      {gifArr.map((item) => (
        <ImageListItem
          component="button"
          key={item.id}
          onClick={() => {
            setGif(item);
            setOpen(false);
          }}
          sx={{
            margin: 0,
            padding: 0,
            appearance: 'none',
            background: 'none',
            border: 'none',
            lineHeight: 0,
          }}>
          <img
            src={item.images.fixed_width_downsampled.url}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
