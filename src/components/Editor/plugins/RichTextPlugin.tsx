import * as dragon from "@lexical/dragon";
import * as richText from "@lexical/rich-text";
import * as text from "@lexical/text";
import * as utils from "@lexical/utils";
import React from "react";
import { Box } from "@mui/material";
import { ContentEditable } from "./ContentEditadblePlugin";
import { flushSync, createPortal } from "react-dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const CAN_USE_DOM =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined";

const useLayoutEffectImpl = CAN_USE_DOM
  ? React.useLayoutEffect
  : React.useEffect;
var useLayoutEffect = useLayoutEffectImpl;

function canShowPlaceholderFromCurrentEditorState(editor: {
  getEditorState: () => {
    (): any;
    new (): any;
    read: { (arg0: any): any; new (): any };
  };
  isComposing: () => any;
  isReadOnly: () => any;
}) {
  const currentCanShowPlaceholder = editor
    .getEditorState()
    .read(
      text.$canShowPlaceholderCurry(editor.isComposing(), editor.isReadOnly())
    );
  return currentCanShowPlaceholder;
}

function useCanShowPlaceholder(editor: {
  registerUpdateListener: (arg0: () => void) => any;
  registerReadOnlyListener: (arg0: () => void) => any;
}) {
  const [canShowPlaceholder, setCanShowPlaceholder] = React.useState(() =>
    canShowPlaceholderFromCurrentEditorState(editor as any)
  );
  useLayoutEffect(() => {
    function resetCanShowPlaceholder() {
      const currentCanShowPlaceholder =
        canShowPlaceholderFromCurrentEditorState(editor as any);
      setCanShowPlaceholder(currentCanShowPlaceholder);
    }

    resetCanShowPlaceholder();
    return utils.mergeRegister(
      editor.registerUpdateListener(() => {
        resetCanShowPlaceholder();
      }),
      editor.registerReadOnlyListener(() => {
        resetCanShowPlaceholder();
      })
    );
  }, [editor]);
  return canShowPlaceholder;
}

function useDecorators(editor: {
  getDecorators: () => any;
  registerDecoratorListener: (arg0: (nextDecorators: any) => void) => any;
  getElementByKey: (arg0: string) => any;
}) {
  const [decorators, setDecorators] = React.useState(() =>
    editor.getDecorators()
  ); // Subscribe to changes

  useLayoutEffect(() => {
    return editor.registerDecoratorListener((nextDecorators: any) => {
      flushSync(() => {
        setDecorators(nextDecorators);
      });
    });
  }, [editor]);
  React.useEffect(() => {
    // If the content editable mounts before the subscription is added, then
    // nothing will be rendered on initial pass. We can get around that by
    // ensuring that we set the value.
    setDecorators(editor.getDecorators());
  }, [editor]); // Return decorators defined as React Portals

  return React.useMemo(() => {
    const decoratedPortals = [];
    const decoratorKeys = Object.keys(decorators);

    for (let i = 0; i < decoratorKeys.length; i++) {
      const nodeKey = decoratorKeys[i];
      const reactDecorator = decorators[nodeKey];
      const element = editor.getElementByKey(nodeKey);

      if (element !== null) {
        decoratedPortals.push(
          /*#__PURE__*/ createPortal(reactDecorator, element)
        );
      }
    }

    return decoratedPortals;
  }, [decorators, editor]);
}

function useRichTextSetup(editor: any, initialEditorState: any) {
  useLayoutEffect(() => {
    return utils.mergeRegister(
      richText.registerRichText(editor, initialEditorState),
      dragon.registerDragonSupport(editor)
    ); // We only do this for init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);
}

export const RichTextPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const showPlaceholder = useCanShowPlaceholder(editor);
  const decorators = useDecorators(editor);
  useRichTextSetup(editor, null);
  return (<Box>
    <ContentEditable />
    <div className="editor-placeholder">What's happening?..</div>
  </Box>)
//   return /*#__PURE__*/ React.createElement(
//     React.Fragment,
//     null,
//     contentEditable,
//     showPlaceholder && placeholder,
//     decorators
//   );
}
