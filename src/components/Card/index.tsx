import { useState } from "react";
import "./styles.scss";

import EditImg from "../../assets/Icon-edit.png";
import TrashImg from "../../assets/Icon-trash.svg";

import DeleteCardModal from "../DeleteCardModal";
import EditCardModal from "../EditCardModal";

export default function Card({ title, image, id }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditCardModalOpen, setIsEditCardModalOpen] = useState(false);

  return (
    <div className="card-container">
      <div className="icon-background">
        <img src={image} alt="Icone do Card" />
      </div>

      <div className="card-title-container">
        <span className="card-title">{title}</span>
      </div>
      <div className="card-button-container">
        <div className="card-button-wrapper">
          <img src={TrashImg} alt="Excluir Card" />
          <button
            className="card-delete"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Excluir
          </button>
        </div>
        <div className="card-button-wrapper">
          <img src={EditImg} alt="Editar Card" />
          <button
            className="card-edit"
            onClick={() => setIsEditCardModalOpen(true)}
          >
            Editar
          </button>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteCardModal setIsDeleteModalOpen={setIsDeleteModalOpen} id={id} />
      )}
      {isEditCardModalOpen && (
        <EditCardModal
          setIsEditCardModalOpen={setIsEditCardModalOpen}
          title={title}
          image={image}
          id={id}
        />
      )}
    </div>
  );
}
