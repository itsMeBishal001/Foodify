const Shimmer = () => {
  return (
    <>
      <div className="restrudentList">
        {Array(15)
          .fill("")
          .map((e, index) => (
            <div key={index} className="Shimmer">
              <div className="ShimmerImg"></div>
              <div className="ShimmerContainer">
                <div className="ShimmerRestrudent"></div>
                <div className="ShimmerRestrudent"></div>
                <div className="ShimmerRestrudent"></div>
                <div className="ShimmerRestrudent"></div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Shimmer;
