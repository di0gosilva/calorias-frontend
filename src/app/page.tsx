import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center p-6">
      <div className="flex space-x-3">
        <Image
          src="logo.svg"
          alt="Logo da empresa"
          width={38}
          height={38}
        />
        <h1 className="text-4xl font-bold">DailyDiet</h1>
      </div>
      <p>Registre suas refeições e controle suas calorias diárias de forma simples.</p>
      <Button className="mt-6" variant="default" size="lg">
        Entrar / Cadastrar
      </Button>
    </main>
  );
}
