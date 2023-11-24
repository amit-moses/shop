import PropTypes from "prop-types";

function Header({ text, subtext }) {
  return (
    <>
      <h1 className="alert alert-primary">{text}</h1>
      Version {subtext}
      <hr />
    </>
  );
}

Header.defaultProps = {
  text: "Default Header",
  subtext: "",
};
Header.propTypes = {
  text: PropTypes.string,
  subtext: PropTypes.number,
};
export default Header;
