import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Home() {

  return (
    <>
      <main className="bg-[#F78C6B] min-h-screen flex flex-col items-center justify-center gap-10 px-5 xl:flex-row">

        <div className="flex flex-col items-center jusitfy-center text-center xl:w-[500px]">
          <div className="flex justify-center items-center space-x-4">
            <Image
              src="logo.svg"
              alt="Logo da empresa"
              width={45}
              height={45}
            />
            <h1 className="text-5xl font-semibold xl:max-w-[500px]">DailyDiet</h1>
          </div>

          <p className="font-medium my-6 xl:max-w-[600px]">Registre suas refeições e controle suas calorias diárias de forma simples.</p>

          <Link href="/">
            <Image
              src="/img-home.png"
              alt="Ilustração comida página home"
              width={200}
              height={200}
            />
          </Link>

          <div className="flex space-x-4 my-6">
            <Link href="/register">
              <Button
                variant="default"
                size="lg"
              >
                Cadastrar
              </Button>
            </Link>

            <Link href="/login">
              <Button
                variant="secondary"
                size="lg"
              >
                Entrar
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
