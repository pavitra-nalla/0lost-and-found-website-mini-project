const SkeletonCard = () => {
  return (
    <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
      <div className="aspect-video bg-gradient-to-r from-card via-background to-card animate-shimmer bg-[length:200%_100%]" />
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-2/3 bg-gradient-to-r from-card via-background to-card animate-shimmer bg-[length:200%_100%] rounded-lg" />
          <div className="h-6 w-14 bg-gradient-to-r from-card via-background to-card animate-shimmer bg-[length:200%_100%] rounded-xl" />
        </div>
        <div className="flex gap-3">
          <div className="h-4 w-24 bg-gradient-to-r from-card via-background to-card animate-shimmer bg-[length:200%_100%] rounded-lg" />
          <div className="h-4 w-16 bg-gradient-to-r from-card via-background to-card animate-shimmer bg-[length:200%_100%] rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
