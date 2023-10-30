const Skeleton = () => {
  return (
    <div role="status" className="w-full animate-pulse mt-5">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-48 mb-4" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300  mb-2.5" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300  mb-2.5" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300  mb-2.5" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 " />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;
