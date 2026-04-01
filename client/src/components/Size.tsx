const Size = () => {
  return (
    <div className="absolute top-10 right-10 size-20 opacity-50">
      <div className="flex size-full items-center justify-center rounded-md bg-green-400 sm:hidden">
        sm
      </div>
      <div className="hidden size-full items-center justify-center rounded-md bg-blue-400 sm:flex md:hidden">
        md
      </div>
      <div className="hidden size-full items-center justify-center rounded-md bg-red-400 md:flex lg:hidden">
        lg
      </div>
      <div className="hidden size-full items-center justify-center rounded-md bg-yellow-400 lg:flex xl:hidden">
        xl
      </div>
      <div className="hidden size-full items-center justify-center rounded-md bg-orange-400 xl:flex 2xl:hidden">
        2xl
      </div>
    </div>
  );
};

export default Size;
