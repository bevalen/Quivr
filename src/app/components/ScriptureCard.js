import { Bars3BottomRightIcon, ChevronRightIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid';

export default function ScriptureCard({ reference, version, content, handleChatClick }) {
  return (
    <button
      onClick={() => handleChatClick({ reference, version, content })}
      className="bg-gray-200 p-4 w-full sm:w-96 rounded-lg shadow relative transition-transform transform hover:scale-105 duration-300 ease-out focus:outline-none text-left block h-full"
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex flex-col pr-10">
            <h2 className="text-xl font-semibold">{reference}</h2>
            <p className="text-sm text-gray-600">{version}</p>
          </div>
          {/* Divider */}
          <div className="border-b border-gray-300 my-4"></div>
          <p className="mt-2">{content}</p>
        </div>
        <div className="absolute top-2 right-2 p-2 rounded-xl text-gray-600">
          <ChevronRightIcon className="h-6 w-6" />
        </div>
      </div>
    </button>
  );
}