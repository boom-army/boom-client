import { Box, Link } from "@mui/material";
import React, { FC } from "react";
import { Tag } from "../generated/graphql";
import { shuffle } from "lodash";
import { RoutePath } from "../constants";

interface Props {
  tagData: Tag[];
}

export const WordCloud: FC<Props> = ({ tagData }) => {
  // // Get the maximum and minimum count values
  // const maxCount = tagData ? Math.max(...tagData.map((tag: any) => tag.count)) : 0;
  // const minCount = tagData ? Math.min(...tagData.map((tag: any) => tag.count)) : 0;

  // // Calculate the size range for the tags
  // const sizeRange = maxCount - minCount;

  // const shuffledTagData = shuffle(tagData);

  return (
    <Box p={2}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {tagData &&
          tagData.map((tag: Tag) => {
            // const tagSize = 12 + ((tag.count - minCount) * (30 - 12)) / sizeRange;
            return (
              <Box
                key={tag.tag}
                sx={{
                  // fontSize: tagSize,
                  padding: 2,
                }}
              >
                <Link
                  href={`/${RoutePath.EXPLORE}?type=TAGS&term=${tag.tag.replace(
                    "#",
                    ""
                  )}`}
                  sx={{
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {tag.tag}
                </Link>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};
