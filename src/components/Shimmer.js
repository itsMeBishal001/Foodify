// const Shimmer = () => {

//   return (
//     <>
//       <div className="restrudentList">
//         {Array(15)
//           .fill("")
//           .map((e, index) => (
//             <div key={index} className="Shimmer bg-white rounded-lg p-4 mb-4">
//               <div className="ShimmerImg w-32 h-32 bg-gray-300 rounded"></div>
//               <div className="ShimmerContainer">
//                 <div className="ShimmerRestrudent bg-gray-300 h-4 rounded mt-2"></div>
//                 <div className="ShimmerRestrudent bg-gray-300 h-4 rounded mt-2"></div>
//                 <div className="ShimmerRestrudent bg-gray-300 h-4 rounded mt-2"></div>
//                 <div className="ShimmerRestrudent bg-gray-300 h-4 rounded mt-2"></div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// export default Shimmer;

const Shimmer = () => {
  return (
    <div className="restrudentList flex flex-wrap">
      {Array(15)
        .fill("")
        .map((e, index) => (
          <div key={index} className="Shimmer flex-grow pt-20 bg-white rounded-lg p-4 mb-4 w-64 mx-2">
            <div className="ShimmerImg w-32 h-32 bg-gray-300 rounded"></div>
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



