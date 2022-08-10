// From https://codesandbox.io/s/lexical-rich-text-example-5tncvy
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ListItemNode, ListNode } from "@lexical/list";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "./plugins/RichTextPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ToolbarPlugin } from "./plugins/ToolbarPlugin";
import { exampleTheme } from "./themes/ExampleTheme";

const editorConfig = {
  namespace: "RTEEditor",
  theme: exampleTheme,
  onError(error: Error) {
    console.log(error);
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

export const TextEditor = () => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin />
          <AutoFocusPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
};
