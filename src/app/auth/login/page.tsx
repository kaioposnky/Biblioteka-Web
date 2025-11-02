"use client"

import LoginForm from "@/components/auth/login-form";
import Button from "@/components/ui/button/button";
import RedirectButton from "@/components/ui/button/redirect-button";
import { SimpleModal } from "@/components/ui/SimpleModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toaster from "react-hot-toast";

export default function LoginPage() {
  const [showModal, setShowModal] = useState(false);
  const navigation = useRouter();

  const onLogin = ( )=> {
    setShowModal(true);
  }

  const goToEmprestimos = () => {
    setShowModal(false);
    navigation.replace("/emprestimo");
  }

  return (
      <div className="flex flex-col items-center justify-center h-screen gap-y-5">
          <LoginForm
          onLogin={onLogin}
          />

          <RedirectButton href={"/auth/register"} size={"lg"}>
              Criar conta
          </RedirectButton>

          <SimpleModal
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                  title="Empréstimos pendentes"
          >
            <div>
              <p className="text-lg text-gray-600">
                Olá, você tem alguns empréstimos pendentes ou com multa!
              </p>
              <div className="flex justify-center mt-6 gap-x-8">
                <Button
                  onClick={goToEmprestimos}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Clique aqui para verificar
                </Button>
                <Button
                  onClick={() => setShowModal(false)}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Ignorar
                </Button>
              </div>
            </div>
          </SimpleModal>
      </div>
  )
}
