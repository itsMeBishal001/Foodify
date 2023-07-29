const Card = () => {
  return (
      <div className="card flex flex-col justify-between w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 h-96 animate-pulse">
          <div className="h-48 rounded-t bg-gray-300"></div>
          <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
              <div className="w-full h-6 rounded bg-gray-300"></div>
              <div className="w-full h-6 rounded bg-gray-300"></div>
              <div className="w-3/4 h-6 rounded bg-gray-300"></div>
          </div>
      </div>
  )
}

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



