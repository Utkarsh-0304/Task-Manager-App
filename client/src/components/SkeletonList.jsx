export const SkeletonList = () => {
  return Array.from({ length: 3 }).map((_, idx) => (
    <div className="flex flex-col gap-[1rem] p-[1rem] min-w-[300px] shadow-2xl rounded-[5px] bg-black/10 h-fit animate-pulse">
      <div className="animate-pulse bg-black/50 h-[20px] w-[80%]"></div>
      <div className="animate-pulse bg-black/30 h-[20px] w-[60%]"></div>
      <div className="animate-pulse bg-black/20 h-[20px] w-[40%]"></div>
    </div>
  ));
};
