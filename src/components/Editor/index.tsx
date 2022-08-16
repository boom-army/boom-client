import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { AutoScrollPlugin } from "@lexical/react/LexicalAutoScrollPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { LexicalEditor } from "lexical";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ReactNode, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useRef } from "react";

import { RichTextPlugin } from "./plugins/RichTextPlugin";
import { EditorContext } from "./EditorContext";
import { TabFocusPlugin } from "./plugins/TabFocusPlugin";

interface IEditorProps {
  children?: ReactNode;
  hashtagsEnabled?: boolean;
  autoLinkEnabled?: boolean;
  emojisEnabled?: boolean;
  actionsEnabled?: boolean;
  placeholder?: string;
  listMaxIndent?: number;
  initialEditorState?: string;
  isReadOnly?: boolean;
  onChange?: (editorState: string, editorInstance?: LexicalEditor) => void;
}

export const TextEditor = ({
  children,
  hashtagsEnabled = false,
  initialEditorState,
  isReadOnly = false,
  onChange,
}: IEditorProps) => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  const editorStateRef = useRef(null);
  const placeholderComponent = <div>Write something...</div>;
  const scrollRef = useRef(null);

  useEffect(() => {
    editor.setReadOnly(isReadOnly);
  }, []);

  return (
    <EditorContext.Provider
      value={{ initialEditor: editor, activeEditor, setActiveEditor }}
    >
      {children}
      <div className={`editor-container`} ref={scrollRef}>
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        {hashtagsEnabled && <HashtagPlugin />}
        <AutoScrollPlugin scrollRef={scrollRef} />

        <>
          <RichTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={placeholderComponent}
            initialEditorState={initialEditorState}
          />
          <OnChangePlugin
            ignoreInitialChange={false}
            onChange={(editorState) => {
              onChange?.(JSON.stringify(editorState), activeEditor);
              return (editorStateRef.current = editorState);
            }}
          />
          <ListPlugin />
          <CheckListPlugin />
          <LinkPlugin />
          <TabFocusPlugin />
        </>
      </div>
    </EditorContext.Provider>
  );
};
