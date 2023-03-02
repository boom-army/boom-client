import { Box } from "@mui/material";
import React from "react";
import { Loader } from "../Loader";

interface NftAttributesProps {
  attributes: Array<{ trait_type: string; value: string }> | undefined;
  loading: boolean;
}

export const NftAttributes: React.FunctionComponent<NftAttributesProps> = ({
  attributes,
  loading,
}) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : attributes && attributes.length > 0 ? (
        attributes.map((attribute) => (
          <Box key={attribute.trait_type}>
            {attribute.trait_type}: <strong>{attribute.value}</strong>
          </Box>
        ))
      ) : (
        <div className="candy-value">No attributes</div>
      )}
    </>
  );
};
