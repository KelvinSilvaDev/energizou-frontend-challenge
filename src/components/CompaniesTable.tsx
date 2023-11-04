import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { Company } from "../types/Company";
import { Feedback } from "./Feedback";
import { useState } from "react";


interface CompanyProps {
    companies: Company[];
}

export function CompaniesTable({ companies }: CompanyProps) {
    const [feedback, setFeedback] = useState({
        message: "",
        type: ""
    });
    const handleRemove = (cnpj: number) => {
        api.delete(`/companies/${cnpj}`).then(response => {
            if (response.status === 204) {
                setFeedback({
                    message: "Empresa removida com sucesso!",
                    type: "success"
                });
            }
        });
    }
    return (
        <>
            <table className="border border-collapse">
                <thead className="bg-blue-500 text-white hidden md:table-header-group">
                    <tr>
                        <th className="hidden sm:table-cell lg:font-bold">Nome do Cliente</th>
                        <th className="hidden sm:table-cell lg:font-bold">Razão Social</th>
                        <th className="hidden sm:table-cell lg:font-bold">CNPJ</th>
                        <th className="hidden sm:table-cell lg:font-bold">Endereço</th>
                        <th className="hidden sm:table-cell lg:font-bold">Número</th>
                        <th className="hidden sm:table-cell lg:font-bold">Telefone</th>
                        <th className="hidden sm:table-cell lg:font-bold">E-mail</th>
                        <th className="hidden sm:table-cell lg:font-bold">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company: Company, index: number) => (
                        <tr key={company.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} h-full`}>
                            <td className="p-2 lg:table-cell md:table-cell sm:table-row text-sm md:text-base sm:text-xs h-full">{company.customerName}</td>
                            <td className="p-2 lg:table-cell md:table-cell sm:table-row text-sm md:text-base sm:text-xs h-full">{company.corporateName}</td>
                            <td className="p-2 lg:table-cell md:table-cell sm:table-row text-sm md:text-base sm:text-xs h-full">{company.cnpj}</td>
                            <td className="p-2 lg:table-cell md:table-cell sm:table-row text-sm md:text-base sm:text-xs h-full">{company.address}</td>
                            <td className="p-2 lg:table-cell md:table-cell sm:table-row text-sm md:text-base sm:text-xs h-full">{company.number}</td>
                            <td className="p-2 lg:table-cell md:table-cell sm:table-row text-sm md:text-base sm:text-xs h-full">{company.phone}</td>
                            <td className="p-2 lg:table-cell md:table-cell sm:table-row text-sm md:text-base sm:text-xs h-full">{company.email}</td>
                            <td className="p-6 text-sm md:text-base sm:text-xs h-full flex flex-grow gap-4">
                                <Link to={`/companies/${company.cnpj}`} className="text-blue-500 hover:underline">
                                    <Pencil size={16} />
                                </Link>
                                <button onClick={() => handleRemove(company.cnpj)}>
                                    <Trash className="text-red-500" size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
            <Feedback message={feedback.message} type={feedback.type} redirectTo="/" />
        </>
    );
}
