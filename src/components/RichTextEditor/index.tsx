import './styles.css'

import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCaret from '@tiptap/extension-collaboration-caret'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import PartyKitProvider from 'y-partykit/provider'

import type { User } from '@/types'

import { PresenceAvatars } from './PresenceAvatars'
import Toolbar from './Toolbar'

interface RichTextEditorProps {
  provider: PartyKitProvider
  user: User | null
}

export function RichTextEditor({ provider, user }: RichTextEditorProps) {
  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          undoRedo: false, // use Yjs for history
        }),
        Collaboration.configure({
          document: provider.doc,
        }),
        CollaborationCaret.configure({
          provider,
          user: {
            name: user?.name ?? 'Anonymous',
            color: user?.color ?? '#000000',
          },
        }),
      ],
      // Don't set content when using Collaboration - it comes from Yjs doc
      editorProps: {
        attributes: {
          class:
            'prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4',
        },
      },
    },
    [provider.doc, user],
  )

  if (!editor || !provider || !user) {
    return <div>Loading editor...</div>
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Presence Avatars */}
      <PresenceAvatars provider={provider} currentUser={user} />

      {/* Toolbar */}
      <Toolbar editor={editor} />

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}
