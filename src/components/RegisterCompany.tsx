/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";
import getCep from "../services/viaCep";
import api from "../services/api";
import { Company } from "../types/Company";
import { Feedback } from "./Feedback";


interface CompanyData {
    customerName: string;
    corporateName: string;
    cep: string;
    cnpj: string;
    address: string;
    number: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    passwordError: string;
}


export function RegisterCompany() {



    const [formData, setFormData] = useState<CompanyData>({
        customerName: "",
        corporateName: "",
        cep: "",
        cnpj: "",
        address: "",
        number: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        passwordError: ""
    });

    const [feedback, setFeedback] = useState({
        message: "",
        type: ""
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };




    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (!validatePassword()) {
            return;
        }

        const cleanedCep = formData.cep.replace(/\D/g, '');
        

        const companyData: Company = {
            customerName: formData.customerName,
            corporateName: formData.corporateName,
            cep: cleanedCep,
            cnpj: parseInt(formData.cnpj),
            address: formData.address,
            number: parseInt(formData.number),
            phone: parseInt(formData.phone),
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await api.post('/companies', companyData);
            if (response.status === 201) {
                setFeedback({
                    message: "Empresa cadastrada com sucesso!",
                    type: "success"
                });
            } else {
                setFeedback({
                    message: "Erro ao cadastrar empresa!",
                    type: "error"
                });
                console.log(response.data);
            }
        } catch (error:any) {
            setFeedback({
                message: error.response.data.error,
                type: "error"
            });
            console.error(error);
        }
    };



    const handleCep = async (value: string) => {
        const cep = await getCep(value);
        console.log(cep)
        setFormData({ ...formData, address: cep.logradouro, cep: cep.cep });
    };

    const handleCepChange = (event: { target: { value: string; }; }) => {
        const { value } = event.target;
        setFormData({ ...formData, cep: value });


        if (value.length === 8) {
            setTimeout(() => {
                handleCep(value);
            }, 1500);
        }

    };

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

    const formatCep = (cep: string) => {
        cep = cep.substring(0, 9);
        cep = cep.replace(/(\d{5})(\d{3})/, '$1-$2');
        return cep;
    }

    const formatCnpj = (cnpj: string) => {
        cnpj = cnpj.replace(/\D/g, '');
        cnpj = cnpj.substring(0, 14);
        cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'); // Formato padrão
        return cnpj;
    }

    const formatPhone = (phone: string) => {
        phone = phone.replace(/\D/g, '');
        phone = phone.substring(0, 11);
        phone = phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');


        return phone.length > 0 ? phone : '';
    }

    return (
        <form className="flex flex-col bg-white w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center gap-2 mx-4">
                <label className="flex flex-col text-sm" htmlFor="customerName">
                    Nome do Cliente
                    <input className="border p-2" type="text" name="customerName" id="customerName" value={formData.customerName} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)} />
                </label>
                <label className="flex flex-col text-sm" htmlFor="corporateName">
                    Razão Social
                    <input className="border p-2" type="text" name="corporateName" id="corporateName" value={formData.corporateName} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)} />
                </label>
                <label className="flex flex-col text-sm" htmlFor="cep">
                    CEP
                    <input className="border p-2" type="text" name="cep" id="cep" value={formatCep(formData.cep)} onChange={(e: ChangeEvent<HTMLInputElement>) => handleCepChange(e)} />
                </label>
                <label className="flex flex-col text-sm" htmlFor="cnpj">
                    CNPJ
                    <input className="border p-2" type="text" name="cnpj" id="cnpj" value={formatCnpj(formData.cnpj)} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        e.target.value = formatCnpj(e.target.value);
                        handleInputChange(e);
                    }} />
                </label>
                <label className="flex flex-col text-sm" htmlFor="address">
                    Endereço
                    <input className="border p-2" type="text" name="address" id="address" value={formData.address} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)} />
                </label>
                <label className="flex flex-col text-sm" htmlFor="number">
                    Número
                    <input className="border p-2" type="number" name="number" id="number" value={formData.number} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)} />
                </label>
                <label className="flex flex-col text-sm" htmlFor="phone">
                    Telefone
                    <input className="border p-2" type="text" name="phone" id="phone" value={formatPhone(formData.phone)} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)} />
                </label>
                <label className="flex flex-col text-sm" htmlFor="email">
                    Email
                    <input className="border p-2" type="email" name="email" id="email" value={formData.email} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)} />
                </label>
                <label className="flex flex-col text-sm" htmlFor="password">
                    Senha
                    <input className="border p-2" type="password" name="password" id="password" value={formData.password} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)} />
                </label>
                <label className="flex flex-col text-sm" htmlFor="confirmPassword">
                    Confirmar Senha
                    <input className="border p-2" type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)} />
                    {formData.passwordError && (
                        <div className="text-red-500 text-sm">{formData.passwordError}</div>
                    )}
                </label>
            </div>
            <button type="submit" className="bg-blue-500 text-white mt-4 rounded-sm w-1/2 mx-auto">Cadastrar</button>
            <Feedback message={feedback.message} type={feedback.type} />
        </form>
    )
}