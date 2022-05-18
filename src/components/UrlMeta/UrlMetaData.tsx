import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useGetMetaQuery } from "../../generated/graphql";

interface Props {
  url: string;
}

export const UrlMetaData: React.FC<Props> = ({ url }: Props) => {
  const { data } = useGetMetaQuery({
    variables: {
      url,
    },
  });

  const images = data?.getMeta?.open_graph?.images ||
    data?.getMeta?.twitter_card?.images || [{ url: null }];
  const heroImage = images[0]?.url;
  const rootUrl = url?.match(
    /[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})/g
  );

  const hasData =
    heroImage && data?.getMeta?.title && data?.getMeta?.description && url;

  return hasData ? (
    <Card sx={{ maxWidth: 400, margin: "1em 0" }}>
      <CardActionArea onClick={() => window.open(url, '_blank')?.focus()}>
        <CardMedia
          component="img"
          height="140"
          image={heroImage}
          alt={data?.getMeta?.title || ""}
        />
        <CardContent>
          <Typography gutterBottom variant="body2" component="div">
            {rootUrl && rootUrl[0]}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {data?.getMeta?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.getMeta?.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ) : null;
};
