export const SkelatonList = () => {
  return Array.from({ length: 3 }).map((_, idx) => (
    <div className="flex flex-col gap-[1rem] p-[1rem] min-w-[300px] shadow-2xl rounded-[5px] bg-white/50 h-fit animate-pulse">
      <div className="animate-pulse bg-white/50 h-[20px] w-[80%]"></div>
      <div className="animate-pulse bg-white/50 h-[20px] w-[60%]"></div>
      <div className="animate-pulse bg-white/50 h-[20px] w-[40%]"></div>
    </div>
  ));
};
