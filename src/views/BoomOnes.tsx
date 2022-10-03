import { Box, Grid } from "@mui/material";

export const BoomOnes = () => {
  return (
    <Grid container spacing={1} mt={2} px={2}>
      <Grid item xs={12}>
        <Box>
            Harkl leads!
            Share button 
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ overflow: 'hidden' }}>
          <img
            src={"/assets/420.png"}
            width="100%"
            alt="Boom Heroes #420"
          />
        </Box>
      </Grid>
      <Grid item xs={6}>
        Name
        Family
        Description 
        Bid History 
        Creator 
        Series
        Details
        Metadata 
        Price
      </Grid>
      <Grid item xs={12}>
        Promo box 
      </Grid>
    </Grid>
  );
};
