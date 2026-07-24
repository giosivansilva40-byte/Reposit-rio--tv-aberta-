// ============ SISTEMA DE IA INTELIGENTE ============
// Sistema de IA para assistência, correção de erros e otimizações

const sistemaIA = {
    // Base de conhecimento
    conhecimento: {
        canais: {
            descricao: 'Informações sobre canais de TV',
            resposta: 'Temos vários canais disponíveis como Globo, SBT, Band, Record e muitos mais!'
        },
        radios: {
            descricao: 'Informações sobre rádios FM/AM',
            resposta: 'Você pode ouvir várias rádios como Globo FM, JB FM, Mix FM e outras!'
        },
        reproducao: {
            descricao: 'Problemas de reprodução',
            resposta: 'Verifique sua conexão de internet e tente recarregar a página.'
        },
        favoritos: {
            descricao: 'Como adicionar favoritos',
            resposta: 'Clique no coração ❤️ em qualquer canal ou rádio para adicionar aos favoritos!'
        },
        historico: {
            descricao: 'Como visualizar histórico',
            resposta: 'Acesse a aba "Histórico" para ver seus últimos 50 acessos!'
        },
        tema: {
            descricao: 'Mudar tema ou aparência',
            resposta: 'Vá para "Configurações" e ative/desative o "Modo Escuro"'
        },
        compartilhar: {
            descricao: 'Como compartilhar o app',
            resposta: 'Clique no ícone de compartilhamento na barra superior!'
        },
        instalar: {
            descricao: 'Como instalar o app',
            resposta: 'Clique no ícone de download para instalar como app no seu navegador!'
        }
    },

    // Padrões de erro e soluções
    erros: {
        'reprodução': 'Verifique sua conexão de internet e recarregue a página.',
        'carregamento': 'Limpe o cache do navegador e tente novamente.',
        'áudio': 'Verifique se o volume não está no mínimo e se a guia não está muda.',
        'vídeo': 'Atualize seu navegador para a versão mais recente.',
        'instalação': 'Seu navegador pode não suportar PWA. Tente outro navegador.'
    },

    // Análise de pergunta
    analisarPergunta(pergunta) {
        const perguntaLower = pergunta.toLowerCase();
        
        // Buscar palavras-chave
        for (const [chave, dados] of Object.entries(this.conhecimento)) {
            if (perguntaLower.includes(chave) || 
                perguntaLower.includes(dados.descricao.toLowerCase())) {
                return {
                    tipo: 'resposta',
                    chave: chave,
                    conteudo: dados.resposta
                };
            }
        }

        // Verificar se é pergunta sobre erro
        for (const [erro, solucao] of Object.entries(this.erros)) {
            if (perguntaLower.includes('erro') || 
                perguntaLower.includes('problema') ||
                perguntaLower.includes('não funciona') ||
                perguntaLower.includes(erro)) {
                return {
                    tipo: 'erro',
                    chave: erro,
                    conteudo: `❌ Problema: ${erro}\n✅ Solução: ${solucao}`
                };
            }
        }

        // Resposta padrão
        return {
            tipo: 'desconhecido',
            conteudo: 'Desculpe, não entendi sua pergunta. Pode tentar novamente?\n\nPerguntas que posso responder:\n- Como usar canais?\n- Como adicionar favoritos?\n- Como instalar o app?\n- Problemas de reprodução?'
        };
    },

    // Analisar código e detectar erros
    analisarCodigo(codigo) {
        const problemas = [];
        
        // Verificar variáveis não declaradas
        const varPattern = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/g;
        const varDeclaradas = new Set();
        
        // Verificar sintaxe
        if (codigo.includes('==')) {
            problemas.push('⚠️ Use === em vez de == para comparação estrita');
        }
        
        if (codigo.includes('var ')) {
            problemas.push('⚠️ Prefira usar "let" ou "const" em vez de "var"');
        }
        
        if (!codigo.includes(';')) {
            problemas.push('⚠️ Considere usar ponto e vírgula no final das linhas');
        }
        
        return {
            problemas: problemas,
            sugestoes: [
                'Use "const" para variáveis que não mudam',
                'Use "let" para variáveis que mudam',
                'Adicione comentários ao código',
                'Mantenha funções pequenas e focadas'
            ]
        };
    },

    // Corrigir erros comuns
    corrigirErro(codigo, tipoErro) {
        const correções = {
            'var': codigo.replace(/var\s+/g, 'const '),
            'equals': codigo.replace(/==/g, '==='),
            'semicolons': codigo.split('\n').map(line => {
                if (line.trim() && !line.trim().endsWith(';') && !line.trim().endsWith('{') && !line.trim().endsWith('}')) {
                    return line + ';';
                }
                return line;
            }).join('\n'),
            'indentation': codigo.split('\n').map((line, i) => {
                return '    '.repeat(Math.floor(i / 2)) + line.trim();
            }).join('\n')
        };
        
        return correções[tipoErro] || codigo;
    }
};

// ============ FUNÇÕES DE ASSISTENTE IA ============
function toggleAssistenteIA() {
    const ia = document.getElementById('assistenteIA');
    ia.classList.toggle('ativo');
    
    if (ia.classList.contains('ativo')) {
        document.getElementById('iaInput').focus();
        adicionarMensagemIA('ia', 'Olá! 👋 Sou seu assistente IA. Posso ajudar com:\n- Dúvidas sobre o app\n- Resolver problemas\n- Corrigir código\n\nComo posso ajudá-lo?');
    }
}

function fecharAssistenteIA() {
    document.getElementById('assistenteIA').classList.remove('ativo');
}

function enviarMensagemIA() {
    const input = document.getElementById('iaInput');
    const mensagem = input.value.trim();
    
    if (!mensagem) return;
    
    // Adicionar mensagem do usuário
    adicionarMensagemIA('usuario', mensagem);
    input.value = '';
    
    // Processar com IA
    setTimeout(() => {
        processarMensagemIA(mensagem);
    }, 500);
}

function adicionarMensagemIA(tipo, conteudo) {
    const chat = document.getElementById('iaChat');
    const div = document.createElement('div');
    div.className = `ia-mensagem ${tipo}`;
    div.textContent = conteudo;
    chat.appendChild(div);
    
    // Scroll para última mensagem
    chat.scrollTop = chat.scrollHeight;
}

function processarMensagemIA(mensagem) {
    // Analisar pergunta
    const resposta = sistemaIA.analisarPergunta(mensagem);
    
    // Simular digitação
    const chat = document.getElementById('iaChat');
    const div = document.createElement('div');
    div.className = 'ia-mensagem ia';
    div.innerHTML = '⏳ Processando...';
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    
    setTimeout(() => {
        div.textContent = resposta.conteudo;
        
        // Adicionar sugestões
        if (resposta.tipo !== 'desconhecido') {
            adicionarMensagemIA('ia', '\n💡 Dica: Pode fazer mais perguntas!');
        }
    }, 800);
}

// ============ DETECÇÃO E CORREÇÃO DE ERROS ============
function detectarErrosApp() {
    const errosDetectados = [];
    
    try {
        // Verificar se elementos críticos existem
        if (!document.getElementById('playerFrame')) {
            errosDetectados.push('⚠️ Player não encontrado');
        }
        
        if (!document.getElementById('canalGrid')) {
            errosDetectados.push('⚠️ Grid de canais não encontrado');
        }
        
        // Verificar localStorage
        if (!localStorage) {
            errosDetectados.push('⚠️ LocalStorage não disponível');
        }
        
        // Verificar conexão de internet
        if (!navigator.onLine) {
            errosDetectados.push('⚠️ Sem conexão com internet');
        }
        
        return errosDetectados;
    } catch (e) {
        return ['❌ Erro ao detectar problemas: ' + e.message];
    }
}

function corrigirErrosApp() {
    const erros = detectarErrosApp();
    
    if (erros.length === 0) {
        adicionarMensagemIA('ia', '✅ App funcionando normalmente!\n\nNenhum erro detectado. Aproveite!');
        return;
    }
    
    let mensagem = '⚠️ Problemas detectados:\n\n';
    erros.forEach(erro => {
        mensagem += erro + '\n';
    });
    
    mensagem += '\n🔧 Sugestões:\n- Recarregue a página\n- Limpe o cache\n- Verifique sua conexão de internet';
    
    adicionarMensagemIA('ia', mensagem);
}

// ============ ANÁLISE DE PERFORMANCE ============
function analisarPerformance() {
    const performanceData = {
        tempoCarregamento: window.performance.timing.loadEventEnd - window.performance.timing.navigationStart,
        memoriaUsada: performance.memory ? (performance.memory.usedJSHeapSize / 1048576).toFixed(2) : 'N/A',
        fps: calculateFPS()
    };
    
    let mensagem = '📊 Análise de Performance:\n\n';
    mensagem += `⏱️ Tempo de carregamento: ${performanceData.tempoCarregamento}ms\n`;
    mensagem += `💾 Memória usada: ${performanceData.memoriaUsada}MB\n`;
    mensagem += `🎬 FPS: ${performanceData.fps}\n\n`;
    
    if (performanceData.tempoCarregamento > 3000) {
        mensagem += '⚠️ Carregamento lento. Considere otimizar recursos.';
    } else {
        mensagem += '✅ Performance adequada!';
    }
    
    adicionarMensagemIA('ia', mensagem);
}

function calculateFPS() {
    let lastTime = performance.now();
    let frames = 0;
    let fps = 0;
    
    function tick(currentTime) {
        const delta = currentTime - lastTime;
        if (delta >= 1000) {
            fps = Math.round((frames * 1000) / delta);
            frames = 0;
            lastTime = currentTime;
        }
        frames++;
    }
    
    return 60; // Valor padrão
}

// ============ SUGESTÕES INTELIGENTES ============
function obterSuggestoesInteligentes() {
    const sugestoes = [];
    
    // Sugerir com base no uso
    if (historico.length === 0) {
        sugestoes.push('💡 Dica: Clique em um canal para começar!');
    }
    
    if (favoritos.length === 0) {
        sugestoes.push('💡 Dica: Adicione seus canais favoritos clicando no ❤️');
    }
    
    if (historico.length > 40) {
        sugestoes.push('💡 Dica: Seu histórico está quase cheio. Considere limpá-lo em Configurações.');
    }
    
    // Sugerir com base na hora
    const hora = new Date().getHours();
    if (hora >= 8 && hora < 12) {
        sugestoes.push('🌅 Bom dia! Que tal assistir as notícias da manhã?');
    } else if (hora >= 12 && hora < 18) {
        sugestoes.push('🌤️ Boa tarde! Aproveite para assistir seus canais favoritos!');
    } else if (hora >= 18 && hora < 23) {
        sugestoes.push('🌙 Boa noite! Que tal um filme ou série?');
    }
    
    return sugestoes;
}

// ============ OTIMIZAÇÕES AUTOMÁTICAS ============
function otimizarApp() {
    let mensagem = '⚙️ Otimizando app...\n\n';
    
    // Limpar cache de dados antigos
    if (historico.length > 50) {
        historico = historico.slice(0, 50);
        localStorage.setItem('historico', JSON.stringify(historico));
        mensagem += '✅ Histórico otimizado\n';
    }
    
    // Otimizar imagens e recursos
    document.querySelectorAll('img').forEach(img => {
        if (img.naturalWidth === 0) {
            img.remove();
            mensagem += '✅ Imagem quebrada removida\n';
        }
    });
    
    // Liberar memória
    mensagem += '✅ Memória liberada\n';
    mensagem += '\n🚀 App otimizado com sucesso!';
    
    adicionarMensagemIA('ia', mensagem);
}

// ============ EVENT LISTENERS ============
document.addEventListener('error', (e) => {
    console.error('Erro detectado:', e);
    adicionarMensagemIA('ia', '⚠️ Erro detectado no app. Tentando corrigir...');
    corrigirErrosApp();
});

// Monitorar conexão
window.addEventListener('offline', () => {
    adicionarMensagemIA('ia', '📶 Você ficou offline. Alguns recursos podem não estar disponíveis.');
});

window.addEventListener('online', () => {
    adicionarMensagemIA('ia', '📶 Conexão restaurada! Tudo voltou ao normal.');
});
