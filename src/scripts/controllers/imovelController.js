import { Imovel } from '../models/Imovel.js';
import { imovelService } from '../services/imovelService.js';

export async function buscarImovelParaEdicao(id) {
    if (!id) return null;

    const imovel = await imovelService.buscarPorId(id);
    if (imovel && !imovel.erro) {
        return imovel;
    }
    return null;
}

export async function salvarImovel(dados, idParaEditar = null) {
    const novoImovel = new Imovel(
        idParaEditar || null,
        dados.titulo,
        dados.valor,
        dados.tipo,
        dados.imagem,
        dados.quarto,
        dados.banheiro,
        dados.descricao
    );

    return await imovelService.salvar(novoImovel);
}
