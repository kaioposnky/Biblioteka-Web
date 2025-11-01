import { getUserEmprestimos } from "@/services/emprestimo";
import Profile from "@/components/profile/Profile";
import {checkSession} from "@/lib/session";
import EmprestimoLista from "@/components/emprestimo/EmprestimoLista";

export default async function ProfileScreen() {
  await checkSession();
  const emprestimos = await getUserEmprestimos() ?? [];

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 py-12">
      <Profile/>
      <EmprestimoLista emprestimos={emprestimos} title={"Histórico de Empréstimos"}/>
    </div>
  )
}
