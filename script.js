// Criação da Classe Item e inicialização de atributos via constructor
class Item {
    constructor(id, nome, preco, categoria, quantidade, imagem) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.quantidade = quantidade;
        this.imagem = imagem; // Aceita caminhos locais textuais ou strings Base64 de uploads
    }

    // Método interno para cálculo de subtotal
    calcularSubtotal() {
        return this.preco * this.quantidade;
    }
}

// Inventário Inicial Imutável (Links mockados para prevenção de quebras visuais)
const inventarioOriginal = [
    new Item(1, "Espada de Aço Valiriano", 500, "Armas", 1, "https://m.media-amazon.com/images/I/61O2JvUD8ML._AC_SL1500_.jpg"),
    new Item(2, "Escudo de Carvalho", 180, "Defesas", 4, "https://tse3.mm.bing.net/th/id/OIP.c4MQxdmUv8Vhc66Q1CmpgAAAAA?cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3"),
    new Item(3, "Poção de Cura Maior", 50, "Poções", 10, "https://tse2.mm.bing.net/th/id/OIP.itlS51f3uiG4j356LUs00wHaHa?cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3"),
    new Item(4, "Elixir de Mana Azul", 75, "Poções", 2, "https://tse4.mm.bing.net/th/id/OIP.PzXaIf882LcbMjo9H1Y9MQAAAA?cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3")
];

// Array mutável que controlará o estado em tempo real da mochila de Valdrik
let mochilaAtiva = [...inventarioOriginal];

// Exibição por Esteira Mágica utilizando .forEach()
function desenharMochilaNaTela(listaDeItens) {
    const containerEsteira = document.getElementById("esteira-itens");
    containerEsteira.innerHTML = ""; // Limpa renderizações antigas

    listaDeItens.forEach(item => {
        // Geração dinâmica do elemento de bloco do DOM
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card-item");

        // Sentido de Escassez - Injeta classe .critico se quantidade < 3
        if (item.quantidade < 3) {
            cardDiv.classList.add("critico");
        }

        // Tag de Perigo resolvida em uma única linha com Operador Ternário
        const tagAlertaHtml = item.quantidade < 3 ? `<span class="badge-perigo">ACABANDO!</span>` : "";

        // Estruturação visual da carta aplicando tratamento numérico para floats derivados do .map()
        cardDiv.innerHTML = `
            ${tagAlertaHtml}
            <div class="container-img">
                <img src="${item.imagem}" alt="${item.nome}" onerror="this.src='https://placehold.co/150x150/26262b/e1e1e6?text=${item.categoria}'">
            </div>
            <h3>${item.nome}</h3>
            <p class="detalhe-item"><strong>Categoria:</strong> ${item.categoria}</p>
            <p class="detalhe-item"><strong>Preço:</strong> ${Number(item.preco).toFixed(2)} Ouros</p>
            <p class="detalhe-item"><strong>Qtd:</strong> ${item.quantidade}</p>
            <p class="subtotal-item">Subtotal: ${Number(item.calcularSubtotal()).toFixed(2)} Ouros</p>
        `;

        containerEsteira.appendChild(cardDiv);
    });
}

// Pechincha Arcana (.map()) - Cria novo array reduzindo preços sem afetar o escopo global
function aplicarPechinchaArcana() {
    mochilaAtiva = mochilaAtiva.map(item => {
        return new Item(
            item.id,
            item.nome,
            item.preco * 0.90, // Desconto de 10%
            item.categoria,
            item.quantidade,
            item.imagem
        );
    });
    
    desenharMochilaNaTela(mochilaAtiva);
    exibirFeedbackOuro("Feitiço aplicado! Mercadores enganados com sucesso (-10%).", "sucesso");
}

// Visão Alquímica (.filter()) - Filtragem estrita por strings idênticas
function filtrarApenasPocoes() {
    const inventarioFiltrado = mochilaAtiva.filter(item => item.categoria === "Poções");
    desenharMochilaNaTela(inventarioFiltrado);
    exibirFeedbackOuro("Filtro Alquímico Ativo: Exibindo exclusivamente poções.", "sucesso");
}

// Contagem de Ouro com Loop Clássico e Trava Lógica de Viewport
function calcularContagemOuro() {
    const larguraJanelaAtual = window.innerWidth;

    // Trava de proteção lógica composta utilizando o operador &&
    if (mochilaAtiva.length > 0 && larguraJanelaAtual > 480) {
        let totalPatrimonial = 0;

        // Estrutura de repetição clássica for com acumulação incremental
        for (let i = 0; i < mochilaAtiva.length; i++) {
            totalPatrimonial += mochilaAtiva[i].calcularSubtotal();
        }

        exibirFeedbackOuro(`Patrimônio Total do Herói: ${totalPatrimonial.toFixed(2)} Ouros transportados.`, "sucesso");
    } else {
        // Desvio de fluxo condicional para tratamento de erro visual
        exibirFeedbackOuro("Erro: Tela muito pequena para abrir o baú!", "erro");
    }
}

// EventListener para adição de itens e conversão com Number()
document.getElementById("form-compra").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o reload nativo do submit

    const nome = document.getElementById("item-nome").value;
    
    // Conversão explícita com a função construtora Number()
    const preco = Number(document.getElementById("item-preco").value);
    const quantidade = Number(document.getElementById("item-quantidade").value);
    const categoria = document.getElementById("item-categoria").value;
    
    // Captura o arquivo físico selecionado no computador do usuário
    const arquivoImagem = document.getElementById("item-imagem").files[0];

    if (arquivoImagem) {
        const leitor = new FileReader();

        // Processamento assíncrono disparado quando o navegador termina de ler o arquivo local
        leitor.onload = function(e) {
            const imagemUrlUrlBase64 = e.target.result; // Transforma o arquivo em string utilizável

            const novoId = mochilaAtiva.length + 1;

            // Instanciação da classe Item
            const novoItemParaOBau = new Item(novoId, nome, preco, categoria, quantidade, imagemUrlUrlBase64);

            mochilaAtiva.push(novoItemParaOBau);
            desenharMochilaNaTela(mochilaAtiva);
            
            // Reseta os campos do formulário após a inserção
            document.getElementById("form-compra").reset();
            exibirFeedbackOuro(`Sucesso: ${nome} foi forjado e guardado no baú!`, "sucesso");
        };

        // Inicia a leitura do arquivo vindo do computador
        leitor.readAsDataURL(arquivoImagem);
    }
});

// Sensor de Janela (onresize) monitorando dimensões em tempo real
window.onresize = function() {
    document.getElementById("largura-janela").textContent = window.innerWidth;
    document.getElementById("altura-janela").textContent = window.innerHeight;
};

// Funções de Controle Auxiliar da Interface
function exibirFeedbackOuro(mensagem, status) {
    const painelOuro = document.getElementById("resultado-ouro");
    painelOuro.textContent = mensagem;
    
    if (status === "sucesso") {
        painelOuro.className = "painel-feedback feedback-sucesso";
    } else {
        painelOuro.className = "painel-feedback feedback-erro";
    }
}

function restaurarInventarioCompleto() {
    mochilaAtiva = [...inventarioOriginal];
    desenharMochilaNaTela(mochilaAtiva);
    document.getElementById("resultado-ouro").className = "painel-feedback";
    document.getElementById("resultado-ouro").textContent = "";
}

// Associação de ouvintes de clique isolados (Garantindo ausência total de JS Inline no HTML)
document.getElementById("btn-desconto").addEventListener("click", aplicarPechinchaArcana);
document.getElementById("btn-filtrar-pocoes").addEventListener("click", filtrarApenasPocoes);
document.getElementById("btn-restaurar").addEventListener("click", restaurarInventarioCompleto);
document.getElementById("btn-contar-ouro").addEventListener("click", calcularContagemOuro);

// Inicialização imediata de estados de tela e dados ao ler o script
(function inicializarSistema() {
    document.getElementById("largura-janela").textContent = window.innerWidth;
    document.getElementById("altura-janela").textContent = window.innerHeight;
    desenharMochilaNaTela(mochilaAtiva);
})();
