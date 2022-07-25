import "./styles.scss";

import closeImg from "../../assets/close.svg";
import TrashImg from "../../assets/Icon-trash.svg";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase";

export default function DeleteCardModal({ setIsDeleteModalOpen, id }) {
  const handleDeleteCard = async () => {
    const cardDoc = doc(db, "cards", id);
    await deleteDoc(cardDoc);
  };
  return (
    <div className="delete-overlay">
      <div className="delete-container">
        <button
          onClick={() => setIsDeleteModalOpen(false)}
          className="close-button"
        >
          <img src={closeImg} alt="Fechar modal" />
        </button>

        <div className="delete-icon-background">
          <img src={TrashImg} alt="Ícone Lixeira" />
        </div>

        <h1>Excluir</h1>
        <span>CERTEZA QUE DESEJA EXCLUIR?</span>

        <div className="delete-buttons">
          <button className="delete-button" onClick={handleDeleteCard}>
            Excluir
          </button>
          <button
            className="cancel-button"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
