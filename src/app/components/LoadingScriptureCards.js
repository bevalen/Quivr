import { ChevronRightIcon } from '@heroicons/react/24/solid';

export default function LoadingScriptureCards() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="mx-2 lg:mx-20">
                <h2 className="text-xl text-center font-semibold mb-10 mt-4">
                    Quivr is looking for scripture passages...
                </h2>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 justify-center">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-gray-200 p-4 w-96 h-64 rounded-lg shadow relative animate-pulse"
                        >
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <div className="flex flex-col pr-10">
                                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                    </div>
                                    {/* Divider */}
                                    <div className="border-b border-gray-300 my-4"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-300 rounded w-2/4"></div>
                                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                                    </div>
                                </div>
                                <div className="absolute top-2 right-2 p-2 rounded-xl text-gray-600">
                                    <ChevronRightIcon className="h-6 w-6" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
