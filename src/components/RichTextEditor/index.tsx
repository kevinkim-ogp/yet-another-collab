import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import Toolbar from "./Toolbar";
import * as Y from "yjs";
import type { User } from "@/lib/yjs";

import PartyKitProvider from "y-partykit/provider";
import useYProvider from "y-partykit/react";
import "./styles.css";

interface RichTextEditorProps {
  ydoc: Y.Doc;
  provider: PartyKitProvider;
  user: User | null;
}

export function RichTextEditor(props: RichTextEditorProps) {
  const { ydoc, user } = props;

  const provider = useYProvider({
    room: "test",
    // Don't pass doc - let useYProvider create its own
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        undoRedo: false, // use Yjs for history
      }),
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCaret.configure({
        provider,
        user: {
          name: user?.name,
          color: user?.color,
        },
      }),
    ],
    content: `
      <h1>Yet another collaborative text editor!</h1>
      <h2>It's December already????</h2>
      <p><strong>Time to get some learning done!</strong></p>
    `,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4",
      },
    },
  });

  if (!editor || !provider || !user) return <div>Loading editor...</div>;

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <Toolbar editor={editor} />

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
