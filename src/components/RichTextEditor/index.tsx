import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";

export function RichTextEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
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

  if (!editor) return <div>Loading editor...</div>;

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <Toolbar editor={editor} />

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
