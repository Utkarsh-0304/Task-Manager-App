export const SkeletonBoard = () => {
  return Array.from({ length: 2 }).map((_, idx) => (
    <div
      key={idx}
      className="animate-pulse h-[10rem]  bg-blue-400/40 flex flex-row justify-center items-center rounded-md shadow-2xl"
    >
      <div className="h-[20%] w-[60%] bg-blue-400/40"></div>
    </div>
  ));
};
