import { RegisterCompany } from "../components/RegisterCompany";

export default function HomePage() {
    return (
        <main className="flex flex-col items-center h-full justify-evenly sm:mb-16 pt-4 md:pt-0">
            <h1 className=" text-4xl md:text-6xl my-4 md:my-12">Criar uma Nova Empresa</h1>
            <div className="w-full md:w-1/2 border rounded-lg shadow-2xl p-4 bg-white">
                <RegisterCompany />
            </div>
        </main>
    )
}