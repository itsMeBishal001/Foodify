
const Shimmer = () => {
  return (
    <div className="restrudentList flex flex-wrap">
      {Array(15)
        .fill("")
        .map((e, index) => (
          <div key={index} className="Shimmer flex-grow pt-20 bg-white rounded-lg p-4 mb-4 w-64 mx-2">
            <div className="ShimmerImg w-50 h-40 bg-gray-300 rounded"></div>
            <div className="ShimmerContainer">
              <div className="ShimmerRestrudent bg-gray-300 h-4 rounded mt-2"></div>
              <div className="ShimmerRestrudent bg-gray-300 h-4 rounded mt-2"></div>
              <div className="ShimmerRestrudent bg-gray-300 h-4 rounded mt-2"></div>
              <div className="ShimmerRestrudent bg-gray-300 h-4 rounded mt-2"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;



