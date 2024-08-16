export default function ScriptureCard({ reference, version, content }) {
  return (
    <div className="bg-gray-200 p-4 w-96 rounded shadow">
      <h2 className="text-xl font-semibold">{reference}</h2>
      <p className="text-sm text-gray-600">{version}</p>
      <p className="mt-2">{content}</p>
    </div>
  );
}