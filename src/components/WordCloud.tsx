import { Box, Link, Typography } from "@mui/material";
import React, { FC } from "react";

interface Tag {
  value: string;
  count: number;
}
interface Props {
  tagData: Tag[];
}

function shuffleArray(array: Tag[]) {
  // Shuffle the array using the Fisher-Yates algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const WordCloud: FC<Props> = ({ tagData }) => {
  // Get the maximum and minimum count values
  const maxCount = Math.max(...tagData.map((tag) => tag.count));
  const minCount = Math.min(...tagData.map((tag) => tag.count));

  // Calculate the size range for the tags
  const sizeRange = maxCount - minCount;

  const shuffledTagData: Array<{ value: string; count: number }> =
    shuffleArray(tagData);

  return (
    <Box p={2}>
      <Box style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {shuffledTagData.map((tag) => {
          const tagSize = 12 + ((tag.count - minCount) * (30 - 12)) / sizeRange;
          return (
            <Box
              key={tag.value}
              style={{
                fontSize: tagSize,
                padding: 2,
              }}
            >
              <Link
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {tag.value}
              </Link>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
