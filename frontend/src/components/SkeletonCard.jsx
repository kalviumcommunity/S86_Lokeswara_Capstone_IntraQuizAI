// components/dashboard/SkeletonCard.jsx
const SkeletonCard = ({ height = "200px" }) => {
  return (
    <div
      className={`bg-[#1c2541] rounded-2xl animate-pulse`}
      style={{ height }}
    >
      <div className="h-6 w-1/3 bg-blue-300/20 rounded mt-5 mx-5 mb-3" />
      <div className="h-full bg-blue-300/10 mx-5 rounded-lg" />
    </div>
  );
};

export default SkeletonCard;
