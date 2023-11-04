/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import api from "../services/api";
import { CompaniesTable } from "../components/CompaniesTable";
import useMediaQuery from "../hooks/useMediaQuery";
import { MOBILE_WIDTH } from "../utils/constants";
import { CompaniesList } from "../components/CompaniesList";
import { Company } from "../types/Company";

export default function CompaniesPage() {
    const isMobile = useMediaQuery(MOBILE_WIDTH);

    const [companies, setCompanies] = useState<Company[]>([]);

    useEffect(() => {
        api.get('/companies').then(response => {
            setCompanies(response.data);
        })
    }, []);

    return (
        <div className="h-full flex flex-col justify-evenly min-h-[80vh]">
            {companies.length > 0 ? (
                <>
                    <h1 className="text-center text-6xl">Empresas</h1>
                    {isMobile ? (
                        <div className="mx-auto w-full overflow-y-auto flex flex-col justify-center items-center">
                            <CompaniesList companies={companies} />
                        </div>
                    ) : (
                        <div className="max-w-6xl mx-auto overflow-auto max-h-[400px]">
                            <CompaniesTable companies={companies} />
                        </div>
                    )}
                </>
            ) : (
                <h1 className="text-center text-6xl flex flex-col justify-center items-center">Nenhuma Empresa Cadastrada</h1>
            )}
        </div>

    )
}