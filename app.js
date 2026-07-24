// ============ VARIÁVEIS GLOBAIS ============
let canalAtual = null;
let radioAtual = null;
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
let historico = JSON.parse(localStorage.getItem('historico')) || [];
let sidebarAberta = false;

// Base de dados de canais
const canais = [
    {
        id: 1,
        nome: 'Globo',
        categoria: 'noticias',
        url: 'https://globoplay.globo.com',
        icone: '📺',
        descricao: 'Canal de TV Globo'
    },
    {
        id: 2,
        nome: 'SBT',
        categoria: 'esportes',
        url: 'https://www.sbt.com.br',
        icone: '⚽',
        descricao: 'SBT - Sistema Brasileiro de Televisão'
    },
    {
        id: 3,
        nome: 'Band',
        categoria: 'filmes',
        url: 'https://www.bandplay.com.br',
        icone: '🎬',
        descricao: 'Band - Filmes e Séries'
    },
    {
        id: 4,
        nome: 'Record',
        categoria: 'noticias',
        url: 'https://www.recordtv.com.br',
        icone: '📰',
        descricao: 'Record TV'
    },
    {
        id: 5,
        nome: 'Cultura',
        categoria: 'infantil',
        url: 'https://culturabrasil.com.br',
        icone: '👶',
        descricao: 'TV Cultura - Conteúdo Infantil'
    },
    {
        id: 6,
        nome: 'Retrô',
        categoria: 'filmes',
        url: 'https://www.retrotv.com.br',
        icone: '🎞️',
        descricao: 'TV Retrô - Clássicos'
    },
    {
        id: 7,
        nome: 'Sportv',
        categoria: 'esportes',
        url: 'https://www.sportv.com.br',
        icone: '🏆',
        descricao: 'SporTV - Esportes'
    },
    {
        id: 8,
        nome: 'Discovery',
        categoria: 'todos',
        url: 'https://www.discoveryplus.com',
        icone: '🔍',
        descricao: 'Discovery Channel'
    }
];

// Base de dados de rádios
const radios = [
    {
        id: 1,
        nome: 'Globo FM',
        frequencia: '94.5 FM',
        url: 'https://radioglobo.globoradio.globo.com',
        categoria: 'popular'
    },
    {
        id: 2,
        nome: 'JB FM',
        frequencia: '88.1 FM',
        url: 'https://jbfm.com.br',
        categoria: 'hits'
    },
    {
        id: 3,
        nome: 'Mix FM',
        frequencia: '98.7 FM',
        url: 'https://www.mixfm.com.br',
        categoria: 'eletrônica'
    },
    {
        id: 4,
        nome: 'CBN',
        frequencia: '90.9 FM',
        url: 'https://www.cbn.com.br',
        categoria: 'notícias'
    },
    {
        id: 5,
        nome: 'Kiss FM',
        frequencia: '99.9 FM',
        url: 'https://www.kissfm.com.br',
        categoria: 'rock'
    },
    {
        id: 6,
        nome: 'Rádio Brasil',
        frequencia: '710 AM',
        url: 'https://radiobrasil.com.br',
        categoria: 'popular'
    }
];

// ============ INICIALIZAÇÃO ============
document.addEventListener('DOMContentLoaded', () => {
    carregarCanais();
    carregarRadios();
    carregarHistorico();
    carregarConfigurações();
    verificarInstalacao();
});

// ============ FUNÇÕES DE INTERFACE ============
function mostrarAbas(nomeAba) {
    // Esconder todas as abas
    document.querySelectorAll('.aba-content').forEach(aba => {
        aba.classList.remove('aba-ativa');
    });

    // Desativar todos os botões do menu
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    // Mostrar aba selecionada
    const abaElemento = document.getElementById(nomeAba);
    if (abaElemento) {
        abaElemento.classList.add('aba-ativa');
    }

    // Ativar botão do menu
    event.target.closest('.menu-item').classList.add('active');
}

function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('ativo');
    sidebarAberta = !sidebarAberta;
}

// ============ FUNÇÕES DE BUSCA ============
function buscarCanal() {
    const termoBusca = document.getElementById('searchInput').value.toLowerCase();
    
    if (termoBusca === '') {
        carregarCanais();
        return;
    }

    const canalsFiltrados = canais.filter(canal =>
        canal.nome.toLowerCase().includes(termoBusca) ||
        canal.descricao.toLowerCase().includes(termoBusca) ||
        canal.categoria.toLowerCase().includes(termoBusca)
    );

    exibirCanais(canalsFiltrados);
    mostrarToast(`${canalsFiltrados.length} canal(is) encontrado(s)`);
}

// ============ FUNÇÕES DE CARREGAMENTO ============
function carregarCanais() {
    exibirCanais(canais);
}

function exibirCanais(lista) {
    const grid = document.getElementById('canalGrid');
    grid.innerHTML = '';

    lista.forEach(canal => {
        const card = document.createElement('div');
        card.className = 'canal-card';
        card.innerHTML = `
            <div class="canal-thumbnail">${canal.icone}</div>
            <div class="canal-info">
                <div class="canal-nome">${canal.nome}</div>
                <div class="canal-categoria">${canal.categoria}</div>
                <div class="canal-acoes">
                    <button class="btn-play" onclick="reproduzirCanal(${canal.id})">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="btn-fav ${favoritos.includes(canal.id) ? 'favorito' : ''}" 
                            onclick="adicionarFavorito(${canal.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function carregarRadios() {
    const grid = document.getElementById('radioGrid');
    grid.innerHTML = '';

    radios.forEach(radio => {
        const card = document.createElement('div');
        card.className = 'radio-card';
        card.innerHTML = `
            <div class="radio-card-freq">${radio.frequencia}</div>
            <div class="radio-card-nome">${radio.nome}</div>
            <button class="btn-play" onclick="reproduzirRadio(${radio.id})" style="margin-top: 0.75rem; width: 100%;">
                <i class="fas fa-play"></i>
            </button>
        `;
        grid.appendChild(card);
    });
}

function carregarHistorico() {
    const list = document.getElementById('historicoList');
    list.innerHTML = '';

    if (historico.length === 0) {
        list.innerHTML = '<p style="color: #aaa; text-align: center; padding: 2rem;">Nenhum item no histórico</p>';
        return;
    }

    historico.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'historico-item';
        const data = new Date(item.data).toLocaleString('pt-BR');
        div.innerHTML = `
            <div class="historico-info">
                <h4>${item.nome}</h4>
                <p>${data}</p>
            </div>
            <button class="btn-play" onclick="reproduzirHistorico(${index})">
                <i class="fas fa-play"></i>
            </button>
        `;
        list.appendChild(div);
    });
}

// ============ FUNÇÕES DE REPRODUÇÃO ============
function reproduzirCanal(id) {
    const canal = canais.find(c => c.id === id);
    if (canal) {
        canalAtual = canal;
        document.getElementById('playerFrame').src = canal.url;
        document.getElementById('nomeCanal').textContent = canal.nome;
        document.getElementById('descricaoCanal').textContent = canal.descricao;
        
        adicionarAoHistorico(canal.nome, 'canal');
        mostrarToast(`Reproduzindo: ${canal.nome}`);
        
        // Fechar sidebar em dispositivos móveis
        if (sidebarAberta) toggleMenu();
    }
}

function reproduzirRadio(id) {
    const radio = radios.find(r => r.id === id);
    if (radio) {
        radioAtual = radio;
        document.getElementById('nomeRadio').textContent = radio.nome;
        document.getElementById('frequenciaRadio').textContent = radio.frequencia;
        mostrarToast(`Rádio: ${radio.nome}`);
        
        adicionarAoHistorico(radio.nome, 'radio');
    }
}

function reproduzirHistorico(index) {
    const item = historico[index];
    mostrarToast(`Reproduzindo: ${item.nome}`);
}

function playVideo() {
    const iframe = document.getElementById('playerFrame');
    mostrarToast('Iniciando reprodução...');
}

function pauseVideo() {
    mostrarToast('Vídeo pausado');
}

function toggleMute() {
    mostrarToast('Som alternado');
}

function fullscreen() {
    const playerContainer = document.querySelector('.player-video');
    if (playerContainer.requestFullscreen) {
        playerContainer.requestFullscreen();
    }
}

// ============ FUNÇÕES DE FAVORITOS ============
function adicionarFavorito(id) {
    const index = favoritos.indexOf(id);
    if (index > -1) {
        favoritos.splice(index, 1);
        mostrarToast('Removido dos favoritos');
    } else {
        favoritos.push(id);
        mostrarToast('Adicionado aos favoritos');
    }
    
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    atualizarFavoritos();
}

function atualizarFavoritos() {
    const grid = document.getElementById('favoritosGrid');
    grid.innerHTML = '';

    const canalsFavoritos = canais.filter(canal => favoritos.includes(canal.id));

    if (canalsFavoritos.length === 0) {
        grid.innerHTML = '<p style="color: #aaa; grid-column: 1/-1; text-align: center; padding: 2rem;">Nenhum favorito adicionado</p>';
        return;
    }

    exibirCanais(canalsFavoritos);
}

// ============ FUNÇÕES DE HISTÓRICO ============
function adicionarAoHistorico(nome, tipo) {
    historico.unshift({
        nome: nome,
        tipo: tipo,
        data: new Date().toISOString()
    });

    // Manter apenas os últimos 50 itens
    if (historico.length > 50) {
        historico.pop();
    }

    localStorage.setItem('historico', JSON.stringify(historico));
    carregarHistorico();
}

// ============ FILTROS ============
function filtrarCanais(categoria) {
    // Atualizar botão ativo
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('ativo');
    });
    event.target.classList.add('ativo');

    // Filtrar canais
    if (categoria === 'todos') {
        exibirCanais(canais);
    } else {
        const canalsFiltrados = canais.filter(canal => canal.categoria === categoria);
        exibirCanais(canalsFiltrados);
    }
}

// ============ CONTROLES DE RÁDIO ============
function radioPlay() {
    if (radioAtual) {
        mostrarToast(`Tocando: ${radioAtual.nome}`);
    } else {
        mostrarToast('Selecione uma rádio');
    }
}

function radioPause() {
    mostrarToast('Rádio pausada');
}

// ============ CONFIGURAÇÕES ============
function salvarConfig() {
    const configs = {
        modoDarkMode: document.getElementById('modoDarkMode').checked,
        autoPlay: document.getElementById('autoPlay').checked,
        notificacoes: document.getElementById('notificacoes').checked
    };
    localStorage.setItem('configs', JSON.stringify(configs));
    mostrarToast('Configurações salvas');
}

function carregarConfigurações() {
    const configs = JSON.parse(localStorage.getItem('configs')) || {
        modoDarkMode: true,
        autoPlay: true,
        notificacoes: true
    };

    document.getElementById('modoDarkMode').checked = configs.modoDarkMode;
    document.getElementById('autoPlay').checked = configs.autoPlay;
    document.getElementById('notificacoes').checked = configs.notificacoes;
}

function alternarTema() {
    const isDark = document.getElementById('modoDarkMode').checked;
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    salvarConfig();
}

function limparCache() {
    if (confirm('Tem certeza que deseja limpar todo o cache?')) {
        localStorage.clear();
        historico = [];
        favoritos = [];
        mostrarToast('Cache limpo com sucesso');
        carregarHistorico();
    }
}

// ============ NOTIFICAÇÕES ============
function mostrarToast(mensagem) {
    const toast = document.getElementById('toast');
    toast.textContent = mensagem;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============ APP INSTALLATION ============
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

function instalarApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                mostrarToast('App instalado com sucesso!');
            } else {
                mostrarToast('Instalação cancelada');
            }
            deferredPrompt = null;
        });
    } else {
        mostrarToast('App já está instalado ou não disponível');
    }
}

function verificarInstalacao() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('App está sendo executado como PWA');
    }
}

// ============ COMPARTILHAMENTO ============
function compartilharApp() {
    const urlCompartilhamento = 'https://riotvabertaplayer.com.br';
    
    if (navigator.share) {
        navigator.share({
            title: 'Rio TV Aberta Player',
            text: 'Assista TV Online, Rádio e muito mais!',
            url: urlCompartilhamento
        }).catch(err => console.log('Erro ao compartilhar:', err));
    } else {
        // Fallback: copiar para clipboard
        navigator.clipboard.writeText(urlCompartilhamento);
        mostrarToast('Link copiado para a área de transferência!');
    }
}

// ============ EVENT LISTENERS ============
document.addEventListener('click', (e) => {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebarAberta) {
        toggleMenu();
    }
});

// Fechar assistente IA ao clicar fora
document.addEventListener('click', (e) => {
    const ia = document.getElementById('assistenteIA');
    const btnIA = document.querySelector('.btn-ia');
    
    if (!ia.contains(e.target) && !btnIA.contains(e.target) && ia.classList.contains('ativo')) {
        fecharAssistenteIA();
    }
});
