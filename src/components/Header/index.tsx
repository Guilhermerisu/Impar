import LogoImg from "../../assets/logo-teste.png";

import "./styles.scss";

export default function Header() {
  return (
    <header>
      <img src={LogoImg} alt="Logo" />
    </header>
  );
}
