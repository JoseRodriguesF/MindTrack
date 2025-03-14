import banco from '../config/database.js';

export async function register(req, res) {
    const { nome, email, senha, confirmarSenha } = req.body;

    if (senha !== confirmarSenha) {
        return res.status(400).json({ success: false, message: 'As senhas não coincidem' });
    }

    try {

        const { rows } = await banco.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (rows.length > 0) return res.status(400).json({ success: false, message: 'Email já registrado' });

        await banco.query('INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)', [nome, email, senha]);
        
        return res.status(200).json({ success: true, message: 'Registro bem-sucedido' });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao registrar o usuário', error: error.message });
    }
}

export async function login(req, res) {
    const { email, senha } = req.body;

    try {
        
        const { rows } = await banco.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (rows.length === 0) return res.status(400).json({ success: false, message: 'Email não encontrado' });

        const user = rows[0];

        if (senha !== user.senha) return res.status(400).json({ success: false, message: 'Senha incorreta' });

        return res.status(200).json({ success: true, message: 'Login bem-sucedido', user });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao buscar o usuário', error: error.message });
    }
}