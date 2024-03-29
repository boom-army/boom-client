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

  const title = data?.getMeta?.open_graph?.title || data?.getMeta?.title;
  const description =
    data?.getMeta?.open_graph?.description || data?.getMeta?.description;

  const images = data?.getMeta?.open_graph?.images ||
    data?.getMeta?.twitter_card?.images || [{ url: null }];
  const heroImage = images[0]?.url;
  const videos = data?.getMeta?.open_graph?.videos ||
    data?.getMeta?.twitter_card?.players || [{ url: null }];
  const heroVideo = videos[0]?.url;
  const rootUrl = url?.match(
    /[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})/g
  );

  const hasData = heroImage && title && description && url;

  return hasData ? (
    <Card sx={{ maxWidth: 400, margin: "1em 0" }}>
      <CardActionArea onClick={() => window.open(url, "_blank")?.focus()}>
        {heroVideo ? (
          <CardMedia component="iframe" image={heroVideo} height="240" />
        ) : (
          <CardMedia
            component="img"
            height="140"
            image={heroImage}
            alt={title || ""}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="body2" component="div">
            {rootUrl && rootUrl[0]}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ) : null;
};
