import "./styles.scss";

import BannerImg from "../../assets/fundo-busca.png";
import SearchImg from "../../assets/lupa.png";

export default function Search({ setSearchText }) {
  return (
    <div>
      <img src={BannerImg} alt="Banner" className="ImgBanner" />
      <div className="input-container">
        <input
          type="text"
          placeholder="Digite aqui sua busca..."
          maxLength={95}
          onChange={(text) => {
            setSearchText(text.target.value);
          }}
        ></input>
        <button>
          <img src={SearchImg} alt="Procurar" />
        </button>
      </div>
    </div>
  );
}
