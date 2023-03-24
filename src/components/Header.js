import logoI from "../components/images/logo.png";
const logo = (
    <img
      className="image"
      href=""
      src={logoI}
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