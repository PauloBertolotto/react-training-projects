import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const Localizacao = () => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    navigate(e.target.value);
  };

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Localizacao;
