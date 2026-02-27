import React, { useEffect, useState } from "react";

import Area from "../BodyCrud/area";
import DadosAchados from "../BodyCrud/DadosAchados";
import FiltrosLista from "../BodyCrud/FiltrosLista";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { getPessoas, deletePessoa } from "@/services/pessoas";

const ListarUsuarios = ({ onSelecionarUsuario }) => {
  const [filtroGeral, setFiltroGeral] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("");
  const [filtroAcesso, setFiltroAcesso] = useState(undefined);
  const [filtroCEP, setFiltroCEP] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarUsuarios = async () => {
    try {
      const data = await getPessoas();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleExcluir = async (usuario) => {
    try {
      await deletePessoa(usuario.id);
      setUsuarios((prev) => prev.filter((u) => u.id !== usuario.id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir usuário");
    }
  };

  const usuariosFiltrados = usuarios.filter((item) => {
    const termo = filtroGeral.toLowerCase();
    const match =
      item.nome?.toLowerCase().includes(termo) ||
      item.cpf?.toLowerCase().includes(termo) ||
      item.email?.toLowerCase().includes(termo) ||
      item.rg?.toLowerCase().includes(termo) ||
      item.telefone?.toLowerCase().includes(termo);
    const matchGenero =
      filtroGenero === "" ||
      (item.genero &&
        item.genero.toLowerCase().includes(filtroGenero.toLowerCase()));
    const matchAcesso =
      !filtroAcesso ||
      (item.acesso &&
        item.acesso.toLowerCase().includes(filtroAcesso.toLowerCase()));
    const matchCEP =
      filtroCEP === "" ||
      (item.Endereco?.[0]?.cep &&
        item.Endereco[0].cep.toLowerCase().includes(filtroCEP.toLowerCase()));
    return match && matchGenero && matchAcesso && matchCEP;
  });

  return (
    <Area className="listar-usuarios-area">
      <FiltrosLista className="grid grid-cols-4 gap-4 mb-4">
        <Input
          type="text"
          placeholder="Buscar por nome, CPF, email, RG ou telefone"
          value={filtroGeral}
          onChange={(e) => setFiltroGeral(e.target.value)}
          className="w-full text-gray-900 placeholder:text-gray-400 bg-white"
        />

        <Select
          value={filtroAcesso}
          onValueChange={(value) => setFiltroAcesso(value)}
        >
          <SelectTrigger className="w-full text-gray-900 bg-white">
            <SelectValue placeholder="Filtrar por acesso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="aluno">Aluno</SelectItem>
            <SelectItem value="professor">Professor</SelectItem>
          </SelectContent>
        </Select>
      </FiltrosLista>

      <DadosAchados>
        {loading ? (
          <p className="text-gray-500">Carregando Usuários...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>RG</TableHead>
                <TableHead>Gênero</TableHead>
                <TableHead>Acesso</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Nascimento</TableHead>
                <TableHead>CEP</TableHead>
                <TableHead>Número</TableHead>
                <TableHead>Complemento</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuariosFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} className="text-center text-gray-500">
                    Nenhum usuário encontrado
                  </TableCell>
                </TableRow>
              ) : (
                usuariosFiltrados.map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() =>
                      onSelecionarUsuario && onSelecionarUsuario(item)
                    }
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.cpf}</TableCell>
                    <TableCell>{item.email || "—"}</TableCell>
                    <TableCell>{item.rg || "—"}</TableCell>
                    <TableCell>{item.genero || "—"}</TableCell>
                    <TableCell>{item.acesso || "—"}</TableCell>
                    <TableCell>{item.telefone || "—"}</TableCell>
                    <TableCell>
                      {item.data_nascimento
                        ? new Date(item.data_nascimento).toLocaleDateString(
                            "pt-BR",
                          )
                        : "—"}
                    </TableCell>
                    <TableCell>{item.Endereco?.[0]?.cep || "—"}</TableCell>
                    <TableCell>{item.Endereco?.[0]?.numero || "—"}</TableCell>
                    <TableCell>
                      {item.Endereco?.[0]?.complemento || "—"}
                    </TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Excluir
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent
                          onClick={(e) => e.stopPropagation()}
                        >
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Confirmar exclusão
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir o usuário{" "}
                              <strong>{item.nome}</strong>? Esta ação não pode
                              ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              onClick={(e) => e.stopPropagation()}
                            >
                              Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={(e) => {
                                e.stopPropagation();
                                handleExcluir(item);
                              }}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Confirmar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </DadosAchados>
    </Area>
  );
};

export default ListarUsuarios;
