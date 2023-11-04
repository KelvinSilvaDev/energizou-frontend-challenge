// import { useNavigate } from "react-router-dom";
import { Company } from "../types/Company";
import { useState } from "react";
import api from "../services/api";
import { Feedback } from "./Feedback";

interface CompanyData {
    customerName: string;
    corporateName: string;
    cep: string;
    cnpj: number;
    address: string;
    number: number;
    phone: number;
    email: string;
    password: string;
    confirmPassword?: string;
    passwordError?: string;
}

export function EditCompany({ company }: { company: Company }) {

    const [formData, setFormData] = useState<CompanyData>({
        customerName: company.customerName,
        corporateName: company.corporateName,
        cep: company.cep,
        cnpj: company.cnpj,
        address: company.address,
        number: company.number,
        phone: company.phone,
        email: company.email,
        password: company.password

    });

    const [feedback, setFeedback] = useState({
        message: "",
        type: ""
    });

    // const navigate = useNavigate();

    const validatePassword = () => {
        if (formData.password !== formData.confirmPassword) {
            setFormData({
                ...formData,
                passwordError: "As senhas não coincidem",
            });
            return false;
        } else {
            setFormData({
                ...formData,
                passwordError: "",
            });
            return true;
        }
    };

    const handleEditCompany = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (!validatePassword()) {
            return;
        }

        const companyData: CompanyData = {
            customerName: formData.customerName,
            corporateName: formData.corporateName,
            cep: formData.cep,
            cnpj: formData.cnpj,
            address: formData.address,
            number: formData.number,
            phone: formData.phone,
            email: formData.email,
            password: formData.password,
        };

        // Envia os dados para o backend
        api.put(`/companies/${company.cnpj}`, companyData).then((response) => {
            console.log(response);
            // navigate("/companies");
            if (response.status === 204) {
                setFeedback({
                    message: "Empresa atualizada com sucesso!",
                    type: "success"
                });
            } else {
                setFeedback({
                    message: "Erro ao atualizar empresa!",
                    type: "error"
                });
            }
        });



    }


    const handleInputChange = (event: { target: { name: string | number; value: string | number; }; }) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const fieldClass = "field flex flex-col gap-2 border";





    return (
        <form onSubmit={handleEditCompany} className="w-full flex flex-col justify-center bg-white">
            <label htmlFor="customerName">Nome do Cliente</label>
            <div className={`${fieldClass}`}>
                <input
                    type="text"
                    name="customerName"
                    id="customerName"
                    onChange={handleInputChange}
                    value={formData.customerName}
                />
            </div>
            <label htmlFor="corporateName">Razão Social</label>
            <div className={`${fieldClass}`}>
                <input
                    type="text"
                    name="corporateName"
                    id="corporateName"
                    onChange={handleInputChange}
                    value={formData.corporateName}
                />
            </div>
            <label htmlFor="cep">CEP</label>
            <div className={`${fieldClass}`}>
                <input
                    type="text"
                    name="cep"
                    id="cep"
                    onChange={handleInputChange}
                    value={formData.cep}
                />
            </div>
            <label htmlFor="cnpj">CNPJ</label>
            <div className={`${fieldClass}`}>
                <input
                    type="text"
                    name="cnpj"
                    id="cnpj"
                    onChange={handleInputChange}
                    value={formData.cnpj}
                />
            </div>
            <label htmlFor="address">Endereço</label>
            <div className={`${fieldClass}`}>
                <input
                    type="text"
                    name="address"
                    id="address"
                    onChange={handleInputChange}
                    value={formData.address}
                />
            </div>
            <label htmlFor="number">Número</label>
            <div className={`${fieldClass}`}>
                <input
                    type="text"
                    name="number"
                    id="number"
                    onChange={handleInputChange}
                    value={formData.number}
                />
            </div>
            <label htmlFor="phone">Telefone</label>
            <div className={`${fieldClass}`}>
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    onChange={handleInputChange}
                    value={formData.phone}
                />
            </div>
            <label htmlFor="email">E-mail</label>
            <div className={`${fieldClass}`}>
                <input
                    type="text"
                    name="email"
                    id="email"
                    onChange={handleInputChange}
                    value={formData.email}
                />
            </div>
            <label htmlFor="password">Senha</label>
            <div className={`${fieldClass}`}>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleInputChange}
                    value={formData.password}
                />
            </div>
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <div className={`${fieldClass}`}>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={handleInputChange}
                />
                {formData.passwordError && (
                    <div className="text-red-500 text-sm">{formData.passwordError}</div>
                )}
            </div>

            <button type="submit">Salvar</button>
            <Feedback message={feedback.message} type={feedback.type} />
        </form>
    )
}