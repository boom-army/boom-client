import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardMedia } from "@mui/material";

export const CollectionGallery: React.FC = () => {
  const [listings, setListings] = useState<any>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch(
        "https://api-mainnet.magiceden.dev/v2/collections/boomheroes/listings",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const result = await response.json();
      setListings(result);
    };

    fetchListings();
  }, []);

  return (
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
  );
};
