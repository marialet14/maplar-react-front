import { Usuario } from '../models/User.js';
import { cadastrar, login, salvarToken } from '../services/UserService.js';

export async function fazerCadastro(nome, email, senha) {
    try {
        const usuario = new Usuario(nome, email, senha);
        const res = await cadastrar(usuario);
        const data = await res.json();

        if (res.ok) {
            return { ok: true, mensagem: 'Conta criada! Faça login para continuar.' };
        }
        return { ok: false, mensagem: data.erro || 'Erro ao criar conta.' };
    } catch (err) {
        return { ok: false, mensagem: 'Erro ao conectar com o servidor.' };
    }
}

export async function fazerLogin(email, senha) {
    try {
        const res = await login(email, senha);
        const data = await res.json();

        if (res.ok) {
            salvarToken(data.token);
            return { ok: true, mensagem: 'Login feito! Redirecionando...' };
        }
        return { ok: false, mensagem: data.erro || 'Credenciais inválidas.' };
    } catch (err) {
        return { ok: false, mensagem: 'Erro ao conectar com o servidor.' };
    }
}
