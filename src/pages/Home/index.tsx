import DocumentCard from './DocumentCard'

const DOCUMENT_CARDS = [
  {
    title: 'Text Editor (public demo)',
    documentType: 'text' as const,
    description: 'The content of this editor is shared with other users.',
    roomId: 'public-demo-text',
  },
  {
    title: 'Code Editor (public demo)',
    documentType: 'code' as const,
    description: 'Coming soon!',
    // roomId: 'public-demo-code',
  },
]

function Home() {
  return (
    <div className="px-2 py-10 min-h-screen bg-gray-50">
      <div id="features" className="mx-auto max-w-6xl">
        <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Yet another real-time collaborative text editor! 🎉
        </h2>
        <ul className="mt-16 grid grid-cols-1 gap-6 text-center text-slate-700 md:grid-cols-2">
          {DOCUMENT_CARDS.map((card) => (
            <DocumentCard key={card.title} {...card} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
