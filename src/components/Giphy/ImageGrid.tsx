import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box } from '@mui/system';
import { GIFObject } from 'giphy-api';
import { Loader } from '../Loader';
import Stack from '@mui/material/Stack';

interface Props {
  gifArr: GIFObject[],
  setGif: React.Dispatch<React.SetStateAction<GIFObject>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isLoadingMore: boolean,
};

export const ImageGrid: React.FC<Props> = ({ gifArr, setGif, setOpen, isLoadingMore }) => {
  if (!gifArr?.length) {
    return <Box sx={{ margin: 2 }}>
      <p>No gifs were found</p>
    </Box>
  }
  return (
    <Stack direction="column">
      <ImageList variant="masonry" cols={3} gap={8} sx={{ overflowY: 'auto' }}>
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
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Box height="50px">{isLoadingMore && <Loader />}</Box>
    </Stack>
  );
};
