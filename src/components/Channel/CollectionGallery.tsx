import React from "react";
import { Grid, Card, CardMedia } from "@mui/material";

interface CollectionGalleryProps {
  listings: any;
}

export const CollectionGallery: React.FC<CollectionGalleryProps> = ({
  listings,
}) => {
  return listings ? (
    <Grid container spacing={2}>
      {listings.map((listing: any, index: number) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={listing.extra.img}
              alt="NFT Image"
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  ) : null;
};
