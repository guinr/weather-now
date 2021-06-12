import "./Header.css";
import logo from '../../imgs/logo.svg';

function Header() {
    return (
      <header>
        <figure>
            <img id="logo" src={logo} alt="Logo Weather Now" />
        </figure>
      </header>
    );
}

export default Header;
