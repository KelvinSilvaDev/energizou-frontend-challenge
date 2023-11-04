import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Company } from "../types/Company";
import api from "../services/api";
import { EditCompany } from "../components/EditCompany";

export function EditCompanyPage() {
    const { cnpj } = useParams();
    const [company, setCompany] = useState<Company | null>(null);

    useEffect(() => {
        console.log(cnpj);
        api.get(`/companies/${cnpj}`).then(response => {
            console.log(response.data);
            setCompany(response.data);
        })
    }, [cnpj])

    return (
        <div className="flex flex-col flex-grow h-full justify-evenly items-center gap-8">
            <h1 className=" text-4xl md:text-6xl my-4 md:my-12">Editar Empresa</h1>
            <div className="container shadow-2xl p-4 border rounded-md bg-white">
                {!company && <p>Carregando...</p>}
                {company && <EditCompany company={company} />}
            </div>
        </div>
    )
}