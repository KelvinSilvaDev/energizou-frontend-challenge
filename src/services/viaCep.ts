import axios from "axios";

const viaCep = axios.create({
    baseURL: "https://viacep.com.br/ws/",
});

const getCep = async (cep: string) => {
    const response = await viaCep.get(`${cep}/json/`);
    return response.data;
};

export default getCep;