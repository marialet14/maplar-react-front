const API = "http://localhost:3001/imoveis";

function getToken() {
    return localStorage.getItem('token');
}

export const imovelService = {
    async buscarPorId(id) {
        const res = await fetch(`${API}/${id}`, {
            headers: { 'Authorization': 'Bearer ' + getToken() }
        });
        return await res.json();
    },

    async buscarParaListagem() {
        const res = await fetch(API, {
            headers: { 'Authorization': 'Bearer ' + getToken() }
        });
        const imoveis = await res.json();
        return imoveis.reverse();
    },

    async excluir(id) {
        await fetch(`${API}/${id}`, {
            method: "DELETE",
            headers: { 'Authorization': 'Bearer ' + getToken() }
        });
    },

    async salvar(imovel) {
        if (!imovel.titulo || imovel.titulo.trim() === "") {
            alert("O título é obrigatório.");
            return false;
        }
        if (isNaN(imovel.valor) || imovel.valor <= 0) {
            alert("O valor deve ser superior a zero.");
            return false;
        }
        if (!imovel.tipo) {
            alert("Selecione se o anúncio é para Aluguel ou Venda.");
            return false;
        }

        if (imovel.id) {
            await fetch(`${API}/${imovel.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + getToken()
                },
                body: JSON.stringify(imovel)
            });
        } else {
            await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + getToken()
                },
                body: JSON.stringify(imovel)
            });
        }
        return true;
    }
};
