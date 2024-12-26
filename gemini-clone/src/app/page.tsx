import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Gemini Clone</h1>
      <p className="mb-6">Talk to GPT and explore its capabilities!</p>
      <Link href="/chat">
        <button className="px-6 py-2 bg-blue-500 rounded hover:bg-blue-600">
          Start Chat
        </button>
      </Link>
    </div>
  );
}
