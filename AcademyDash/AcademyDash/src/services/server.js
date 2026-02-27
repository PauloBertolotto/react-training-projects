// src/services/server.js
const API_URL = "http://localhost:3333";

export async function getData(endpoint) {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (!response.ok) throw new Error("Erro ao buscar dados");
  return response.json();
}

export async function postData(endpoint, body) {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.message || "Erro ao enviar dados");
  }
  return response.json();
}

export async function putData(endpoint, body) {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.message || "Erro ao atualizar dados");
  }
  return response.json();
}

export async function deleteData(endpoint) {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.message || "Erro ao excluir dados");
  }
  return response.json();
}
