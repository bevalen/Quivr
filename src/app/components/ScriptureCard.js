import { Bars3BottomRightIcon } from '@heroicons/react/24/solid';

export default function ScriptureCard({ reference, version, content, handleChatClick }) {
  return (
    <div className="bg-gray-200 p-4 w-96 rounded-lg shadow relative">
      <button
        onClick={() => handleChatClick({ reference, version, content })}
        className="absolute top-2 right-2 p-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition duration-300 ease-out"
      >
        <Bars3BottomRightIcon className="h-6 w-6" />
      </button>
      <h2 className="text-xl font-semibold">{reference}</h2>
      <p className="text-sm text-gray-600">{version}</p>
      {/* Divider */}
      <div className="border-b border-gray-300 my-4"></div>
      <p className="mt-2">{content}</p>
    </div>
  );
}