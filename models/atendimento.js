const moment = require('moment');

const conexao = require('../infra/conexao');

class Atendimento {
    adiciona(atendimento, res) {
        // Pega a data atual da lib "moment"
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        // Converte a data do atendimento passada por parâmetro na requisição para um formato que o MySQL aceite
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        
        // Valida a data de atendimento (depois ou igual a data atual)
        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        // Valida o nome do cliente (mais de 5 caracteres)
        const clienteValido = atendimento.cliente.length >= 5;

        //Descreve os erros das validações
        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Nome do cliente deve possuir pelo menos cinco caracteres'
            }
        ];

        // Cria um novo array de erros filtrando somente os que não passaram nas validações
        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;
        
        if(existemErros) {
            res.status(400).json(erros);
        } else {
            // Cria um novo objeto de atendimento com as novas informações de data
            const atendimentoDatado = {...atendimento, dataCriacao, data};
            // Monta a query
            const sql = 'INSERT INTO atendimentos SET ?';
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(201).json(atendimento);
                }
            });
        }        
    }

    lista(res) {
        const sql = 'SELECT * FROM atendimentos';
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`;
        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0];

            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(atendimento);
            }
        });
    }

    altera(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }

        const sql = 'UPDATE atendimentos SET ? WHERE id=?';
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({...valores, id});
            }
        });
    }

    deleta(id, res) {
        const sql = `DELETE FROM atendimentos WHERE id=${id}`;
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new Atendimento;