import { FormEvent, useState } from "react";
import "./styles.scss";
import closeImg from "../../assets/close.svg";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../services/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function EditCardModal({
  setIsEditCardModalOpen,
  title,
  image,
  id,
}) {
  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState(File[0]);
  const [isLoading, setIsLoading] = useState(false);

  const updateCard = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const imageRef = ref(storage, `images/${Date.now()}`);
    uploadBytes(imageRef, newImage).then(() => {
      getDownloadURL(imageRef).then((url) => {
        let updatedTitle = newTitle != "" ? newTitle : title;
        let updatedImage = newImage ? url : image;

        updateDoc(doc(db, "cards", `${id}`), {
          titulo: updatedTitle,
          image: updatedImage,
        });
        setIsEditCardModalOpen(false);
      });
      setIsLoading(false);
    });
  };

  return (
    <div className="edit-overlay">
      <div className="edit-container">
        <button
          onClick={() => setIsEditCardModalOpen(false)}
          className="edit-close-button"
        >
          <img src={closeImg} alt="Fechar modal" />
        </button>

        <form onSubmit={updateCard}>
          <label htmlFor="title">DIGITE O NOVO NOME PARA O CARD</label>
          <input
            type="text"
            placeholder={title}
            name="title"
            maxLength={50}
            onChange={(text) => setNewTitle(text.target.value)}
          />

          <label htmlFor="image">INCLUA UMA NOVA IMAGEM </label>

          <label htmlFor="image">
            <span>{newImage ? "Imagem escolhida" : "Escolher arquivo"}</span>
          </label>
          <input
            type="file"
            id="image"
            placeholder="Nenhum arquivo selecionado"
            onChange={(image) => setNewImage(image.target.files[0])}
          />
          <div className="edit-buttons">
            {isLoading ? (
              <button disabled className="edit-button">
                Carregando...
              </button>
            ) : (
              <button className="edit-button">Salvar</button>
            )}
            <button
              className="cancel-edit-button"
              onClick={() => setIsEditCardModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
