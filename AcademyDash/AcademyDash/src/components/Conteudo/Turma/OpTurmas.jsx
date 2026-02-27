import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { FaChevronDown } from "react-icons/fa";

const OpTurmas = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const isProfessor = user?.acesso === "professor";
  const isAdmin = user?.acesso === "admin";

  const handleChange = (e) => {
    if (e.target.value !== "default") {
      navigate(e.target.value);
    }
  };

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default OpTurmas;
