const customExpress = require('./config/customExpress');
const conexao = require('./infra/conexao');
const Tabelas = require('./infra/tabelas');

// Conecta no banco de dados
conexao.connect(erro => {
    if(erro) {
        console.log(erro);
    } else {
        console.log('Conectado ao mysql com sucesso');
        Tabelas.init(conexao);

        const app = customExpress();
        app.listen(3000, () => {
            console.log('Servidor NodeJS rodando na porta 3000');
        });
    }
});