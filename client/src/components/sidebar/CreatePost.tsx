const CreatePost = ({ className }: { className: string }) => {
  return (
    <div
      className={`flex size-50 items-center justify-center justify-self-stretch rounded-xl border-2 border-dashed border-neutral-200 ${className}`}
    >
      <div className="size-24 rounded-full bg-neutral-100"></div>
    </div>
  );
};

export default CreatePost;
