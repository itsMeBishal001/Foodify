const logo = (
    <img
      className="image"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjLki7JKI12Q_QEUwR0qtnPoi3oboOMI4xCA&usqp=CAU"
    />
  );
  
  // component -> functional component && classbased compontnt
  //functional component
  
  const Heading = () => {
    return (
      <div className="heading">
        {
          // writing comments on jsx =>i can make comments within {} .. as here is js section
        }
        {logo}
        <div className="nav-items">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Cart</li>
          </ul>
        </div>
      </div>
    );
  };

  export default Heading;