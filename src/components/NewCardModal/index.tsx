import { FormEvent, useState } from "react";
import "./styles.scss";
import Button from "../Button";

import CreateImg from "../../assets/icone_criar.png";
import closeImg from "../../assets/close.svg";

import { db, storage } from "../../services/firebase";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export default function NewCardModal({ setIsNewCardModalOpen }) {
  const [image, setImage] = useState(File[0]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //Criar card
  const uploadCard = (e: FormEvent) => {
    if (title == "") return alert("Adicione um título");
    if (image == null) return alert("Adicione uma imagem");

    e.preventDefault();
    setIsLoading(true);
    const imageRef = ref(storage, `images/${Date.now()}`);
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef).then((url) => {
        setDoc(doc(db, "cards", `${image?.name}`), {
          titulo: title,
          image: url,
          id: image?.name,
          time: Date.now(),
        });
        setIsNewCardModalOpen(false);
      });
      setIsLoading(false);
    });
  };
  console.log(image);

  return (
    <div className="overlay">
      <div className="modal-container">
        <div className="modal-header">
          <img src={CreateImg} alt="Imagem de criação de cards" />
          <span>Criar Card</span>
          <button onClick={() => setIsNewCardModalOpen(false)}>
            <img src={closeImg} alt="Fechar modal" />
          </button>
        </div>
        <form onSubmit={uploadCard}>
          <label htmlFor="title">DIGITE UM NOME PARA O CARD</label>
          <input
            type="text"
            placeholder="Digite o título"
            name="title"
            maxLength={50}
            onChange={(text) => setTitle(text.target.value)}
          />

          <label htmlFor="image">INCLUA UMA IMAGEM PARA APARECER NO CARD</label>

          <label htmlFor="image" className="file-label">
            {image == null ? "Nenhum arquivo selecionado" : image.name}
            <span className="label-button">Escolher arquivo</span>
          </label>
          <input
            type="file"
            id="image"
            onChange={(image) => setImage(image.target.files[0])}
          />
          <div className="submit-container">
            {isLoading ? (
              <Button disabled>Carregando...</Button>
            ) : (
              <Button type="submit">Criar card</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
