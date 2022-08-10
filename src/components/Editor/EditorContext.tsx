import { LexicalEditor } from 'lexical';
import React, { createContext } from 'react';

interface IEditorContext {
  initialEditor: LexicalEditor;
  activeEditor: LexicalEditor;
  setActiveEditor: React.Dispatch<React.SetStateAction<LexicalEditor>>;
}

export const EditorContext = createContext<IEditorContext | null>(null);
