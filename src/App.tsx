import { RichTextEditor } from "@/components/RichTextEditor";

function App() {
  return (
    <div className="min-h-screen min-w-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900">
          Real-time collaboration! 🎉
        </h1>
        <p className="mt-4 text-gray-600 ">
          Yet another collaborative text editor!
        </p>
        <main className="max-w-4xl mx-auto px-4 py-8 w-[50vw]">
          <RichTextEditor />
        </main>
      </div>
    </div>
  );
}

export default App;
