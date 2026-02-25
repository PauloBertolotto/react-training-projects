import React, { useState } from "react";

import GestaoDados from "../BodyCrud/GestaoDados";
import CorpoComponents from "../BodyCrud/CorpoComponents";
import AreaComponents from "../BodyCrud/AreaComponents";

import SubTitle from "../../Core/SubTitle";
import Modal from "../../Core/Modal";

import AddUsuario from "./AddUsuario";
import ListarUsuarios from "./ListarUsuarios";
import AlterarUsuario from "./AlterarUsuario";

const Usuarios = () => {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalAlterar, setModalAlterar] = useState(false);

  return (
    <GestaoDados>
      <CorpoComponents>
        <AreaComponents>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setModalAdd(true)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 "
            >
              Novo Usuário
            </button>
          </div>

          <ListarUsuarios
            onSelecionarUsuario={(usuario) => {
              setUsuarioSelecionado(usuario);
              setModalAlterar(true);
            }}
          />

          {/* Modal para adicionar */}
          <Modal
            isOpen={modalAdd}
            onClose={() => setModalAdd(false)}
            title="Adicionar Usuário"
          >
            <AddUsuario
              onVoltar={() => setModalAdd(false)}
              onUsuarioAdicionado={() => setModalAdd(false)}
            />
          </Modal>

          {/* Modal para alterar */}
          <Modal
            isOpen={modalAlterar}
            onClose={() => setModalAlterar(false)}
            title="Alterar Usuário"
          >
            <AlterarUsuario
              usuario={usuarioSelecionado}
              onVoltar={() => {
                setUsuarioSelecionado(null);
                setModalAlterar(false);
              }}
              onUsuarioAlterado={() => {
                setUsuarioSelecionado(null);
                setModalAlterar(false);
              }}
            />
          </Modal>
        </AreaComponents>
      </CorpoComponents>
    </GestaoDados>
  );
};

export default Usuarios;
