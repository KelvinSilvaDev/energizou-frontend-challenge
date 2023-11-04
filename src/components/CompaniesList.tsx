import { Pencil, Trash } from "lucide-react";
import api from "../services/api";
import { Company } from "../types/Company";
import { NavLink } from "react-router-dom";

interface CompaniesListProps {
    companies: Company[];

}

export function CompaniesList({ companies }: CompaniesListProps) {



    const handleDeleteCompany = (cnpj: number) => {
        api.delete(`/companies/${cnpj}`).then(response => {
            console.log(response.data);
        })
    }


    return (
        <div className="flex flex-col gap-4 h-full">
            {companies.map((company: Company) => (
                <div key={company.id} className="flex flex-col items-start justify-center py-4 mb-2">
                    <div className="relative bg-slate-300 px-4 py-2 z-10">
                        <NavLink to={`/companies/${company.cnpj}`} className="absolute right-6 -top-3 bg-blue-500 p-1 rounded-sm">
                            <Pencil size={16} className="text-white" />
                        </NavLink>
                        <button className="absolute -right-2 -top-3 bg-red-500 p-1 rounded-sm" onClick={() => handleDeleteCompany(company.cnpj)}>
                            <Trash size={16} className="text-white" />
                        </button>
                        <h1>Nome do Cliente: <span className=" text-amber-600">{company.customerName}</span></h1>
                        <h1>Nome Fantasia: <span className=" text-amber-600">{company.corporateName}</span></h1>
                        <h1>CNPJ: <span className=" text-amber-600">{company.cnpj}</span></h1>
                        <h1>Endereço: <span className=" text-amber-600">{company.address}</span></h1>
                        <h1>Número: <span className=" text-amber-600">{company.number}</span></h1>
                        <h1>Cep: <span className=" text-amber-600">{company.cep}</span></h1>
                        <h1>Telefone: <span className=" text-amber-600">{company.phone}</span></h1>
                        <h1>E-mail: <span className=" text-amber-600">{company.email}</span></h1>
                    </div>
                </div>
            ))}
        </div>
    )
}