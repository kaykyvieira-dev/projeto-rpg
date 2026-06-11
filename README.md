## 📖 Contexto e Lore do Projeto
Na pacata Vila de Valirian, o lendário guerreiro Valdrik Ironforge descobriu um antigo artefato mágico conhecido como a **Mochila Infinita de JavaScript**. Diferente dos baús de madeira tradicionais, este artefato consegue armazenar uma quantidade ilimitada de equipamentos e organizá-los instantaneamente através de comandos lógicos arcanos. 

Como ajudante de campo de Valdrik, este sistema foi programado para gerenciar a interface desta mochila eterna, permitindo forjar novos itens através de uploads de arquivos locais, aplicar magias de desconto em lote e calcular o valor total em ouro transportado com travas de segurança responsivas.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica e limpa, totalmente livre de atributos nativos de eventos (`onclick`, `onsubmit`, etc.).
* **CSS3 (Dark Mode):** Interface imersiva inspirada no universo de RPG com gerenciamento de estados visuais dinâmicos (como a borda pulsante de alerta `.critico`).
* **JavaScript (ES6+):** Inteligência do ecossistema, utilizando Orientação a Objetos, manipulação assíncrona do DOM e métodos avançados de Array.

---

## 🔮 Requisitos Técnicos Implementados (Critérios de Avaliação)

### 1. A Forja dos Itens (Classes e Orientação a Objetos)
* **Molde Estruturado (`Classe Item`):** Criação da classe com construtor inicializando `id`, `nome`, `preco`, `categoria`, `quantidade` e `imagem`.
* **Encapsulamento de Lógica (`calcularSubtotal()`):** Método interno na classe que retorna o valor financeiro do item multiplicado pela sua quantidade.
* **Inventário Inicial:** Array imutável carregando os 4 equipamentos iniciais do herói instanciados dinamicamente a partir da classe.

### 2. Ações de Valdrik (Eventos e Manipulação Avançada do DOM)
* **Habilidade "Comprar e Guardar":** Interceptação do evento `submit` do formulário controlando o fluxo com `preventDefault()`.
* **Sanitização de Dados:** Uso explícito da função construtora `Number()` para garantir a tipagem estrita de valores monetários e quantitativos vindos da interface.
* **Upload de Arquivos do Computador (API FileReader):** Implementação de processamento assíncrono para ler e converter arquivos físicos de imagem da máquina local em URLs utilizáveis (Base64) em tempo real.
* **Sensor de Janela (`onresize`):** Monitoramento dinâmico da *viewport* (`window.innerWidth` e `window.innerHeight`), alimentando o painel rúnico no topo do ecrã.

### 3. Feitiços Avançados (Métodos Modernos de Array)
* **Esteira Mágica (`.forEach()`):** Varredura completa do array para gerar e renderizar de forma isolada os blocos estruturais de cada card na tela.
* **Pechincha Arcana (`.map()`):** Mapeamento do inventário para gerar um novo array com redução de 10% nos preços, sem corromper a integridade dos dados originais.
* **Visão Alquímica (`.filter()`):** Filtragem estrita baseada em circuitos lógicos booleanos para exibir exclusivamente itens da categoria `"Poções"`.

### 4. Leis do Reino e Controlo de Fluxo
* **Sentido de Escassez:** Verificação condicional (`if`) injetando a classe CSS `.critico` (alerta visual vermelho) caso as unidades em estoque caiam abaixo de 3.
* **Tag de Perigo (Operador Ternário):** Decisão limpa e de linha única para exibir a insígnia `"ACABANDO!"` baseada no estado da quantidade.
* **Contagem de Ouro (Loop Clássico):** Varredura patrimonial executada estritamente através do laço `for (let i = 0; i < array.length; i++)` com acumuladores incrementais `+=`.
* **Trava de Proteção Lógica (`&&`):** Algoritmo de segurança composto. O baú só exibe as contagens físicas se contiver itens **E** se a largura da janela for maior do que 480 pixels. Caso contrário, o fluxo é desviado para um painel visual de erro.

---

## 📂 Estrutura de Arquivos Obrigatória

```bash
├── index.html   # O Baú (Marcação e Esqueleto)
├── style.css    # A Aparência (Estilização em Dark Mode e Regras Visuais)
└── script.js    # As Magias (Cérebro, POO e Regras de Negócio do Sistema)
