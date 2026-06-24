import { imovelService } from '../services/imovelService.js';

export async function listarAnuncios() {
    return await imovelService.buscarParaListagem();
}

export async function excluirAnuncio(id) {
    await imovelService.excluir(id);
}
