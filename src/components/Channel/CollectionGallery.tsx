import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export const CollectionGallery: React.FC = () => {
  const [listings, setListings] = useState<any>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const containerScrollPosition = scrollContainerRef.current.scrollLeft;
    
    // If at start and trying to scroll left, or at end and trying to scroll right, prevent default action
    if ((containerScrollPosition === 0 && e.deltaY < 0) || (containerScrollPosition === (container.scrollWidth - container.clientWidth) && e.deltaY > 0)) {
      e.preventDefault();
      return;
    }
  
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + Math.sign(e.deltaY) * 100,
      behavior: 'smooth'
    });
  };
  
  
  

  return (
    <Box
      ref={scrollContainerRef}
      onWheel={handleWheel}
      sx={{ overflowX: "auto", whiteSpace: "nowrap" }}
    >
      {listings
        ? listings.map((listing: any, index: number) => (
            <Card
              key={index}
              sx={{ minWidth: 100, display: "inline-block", margin: 2 }}
            >
              <CardMedia
                component="img"
                height="140"
                image={listing.extra.img}
                alt="NFT Image"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Price: {listing.price}
                </Typography>
                <Typography variant="body2">
                  Rarity Rank: {listing.rarity.moonrank.rank}
                </Typography>
              </CardContent>
            </Card>
          ))
        : null}
    </Box>
  );
};
