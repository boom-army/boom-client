import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Typography } from "@mui/material";

export const ContentEditable = ({
  spellCheck = true,
  style,
  tabIndex,
}: {
  spellCheck?: boolean;
  style?: any;
  tabIndex?: any;
  testid?: string | null | undefined;
}) => {
  const [editor] = useLexicalComposerContext();
  const ref = React.useCallback(
    (rootElement: any) => {
      editor.setRootElement(rootElement);
    },
    [editor]
  );
  const handleChange = () => {
    console.log(editor);
  }
  return React.createElement(Typography, {
    onChange: handleChange,
    ref: ref,
    spellCheck: spellCheck,
    style: style,
    tabIndex: tabIndex,
  });
};
