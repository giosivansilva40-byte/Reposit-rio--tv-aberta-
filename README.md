# 🎬 RIO TV ABERTA - Aplicativo Profissional de TV e Rádio com IA

## 📺 Sobre

**Rio TV Aberta** é um aplicativo web moderno e profissional que oferece transmissão ao vivo de canais de TV aberta brasileiros e rádios gratuitas, integrado com um assistente de IA avançado.

### ✨ Recursos Principais

✅ **48+ Canais de TV Aberta** (sem HBO ou conteúdo pago)  
✅ **15+ Rádios Abertas Gratuitas** de todo Brasil  
✅ **Assistente de IA com Reconhecimento de Voz** em Português  
✅ **Reprodução HLS** via hls.js com recuperação de erros  
✅ **Design 4D Profissional** - Paleta Branco, Preto e Verde  
✅ **Botão de Compartilhamento** com link HTTP://RIOTVABERTA.COM.BR  
✅ **Busca Dinâmica e Filtros** por categoria/estado  
✅ **Player com Controle de Volume e Mute**  
✅ **Totalmente Responsivo** para Mobile, Tablet e Desktop  
✅ **Sem Erros de Reprodução** com tratamento robusto

---

## 🚀 Iniciando

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/giosivansilva40-byte/Reposit-rio--tv-aberta-.git
cd Reposit-rio--tv-aberta-

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O app abrirá automaticamente em `http://localhost:3000`

---

## 🏗️ Build para Produção

```bash
# Build otimizado
npm run build

# Preview do build
npm run preview

# Typecheck
npm run typecheck
```

---

## 📁 Estrutura do Projeto

```
Rio-TV-Aberta/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Cabeçalho com modo TV/Rádio
│   │   ├── ChannelCard.tsx     # Card individual de canal/rádio
│   │   ├── PlayerOverlay.tsx   # Controles do player
│   │   └── AIAssistant.tsx     # Painel flutuante do assistente IA
│   ├── data/
│   │   ├── channels.ts         # Lista de canais de TV
│   │   └── radios.ts           # Lista de rádios
│   ├── hooks/
│   │   ├── usePlayer.ts        # Hook para reprodução HLS
│   │   └── useAIAssistant.ts   # Hook para assistente de IA
│   ├── App.tsx                 # Componente principal
│   ├── main.tsx                # Entry point
│   └── index.css               # Estilos globais
├── index.html                  # HTML principal
├── vite.config.ts              # Configuração Vite
├── tsconfig.json               # Configuração TypeScript
├── tailwind.config.js          # Configuração Tailwind CSS
├── package.json                # Dependências
└── README.md                   # Este arquivo
```

---

## 🎙️ Usando o Assistente de IA

### Botão Flutuante
Clique no botão verde pulsante no canto inferior direito para abrir o painel do assistente.

### Comandos de Voz (Português)

```
# Navegação
"Próximo canal"
"Canal anterior"
"Parar reprodução"

# Modo
"Modo rádio"
"Modo TV"

# Volume
"Aumentar volume"
"Diminuir volume"
"Volume 70"
"Silenciar"
"Ativar som"

# Busca
"Buscar notícias"
"Tocar esportes"
"Procurar música"
"Ver filmes"
"Abrir rádio Kiss FM"
```

---

## 🎨 Design 4D

- **Paleta de Cores**: Branco, Preto e Verde (#22c55e)
- **Tipografia**: Letras maiúsculas em negrito
- **Efeitos**: Levitação nas cards, glow neon, animações fluidas
- **Responsividade**: Grid adaptável para qualquer tamanho de tela
- **Scrollbar Estilizada**: Verde customizado com hover effects

---

## 📱 Compatibilidade

- ✅ Chrome/Chromium 60+
- ✅ Firefox 55+
- ✅ Safari 11+ (iOS 11+)
- ✅ Edge 79+
- ✅ Qualquer navegador com suporte a HLS

---

## 🔗 Link de Compartilhamento

O botão de compartilhamento copia automaticamente:
```
🎬 Assista RIO TV ABERTA - TV e Rádios abertas com IA! 📺📻

🔗 HTTP://RIOTVABERTA.COM.BR
```

---

## 🛠️ Tecnologias Utilizadas

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **hls.js** - Reprodução HLS
- **Lucide Icons** - Ícones SVG
- **Web Speech API** - Reconhecimento de voz

---

## 📝 Canais de TV Disponíveis

1. **TV BRASIL** - Educação e Cultura
2. **TV SENADO** - Transmissão Senado Federal
3. **TV CÂMARA** - Transmissão Câmara dos Deputados
4. **FUTURA** - Canal de Educação
5. **ESCOLA KIDS** - Programação infantil
6. **ARTE & FILMES** - Cinema e documentários
7. **MUSIC TV** - Clipes e programas musicais
8. **SPORTS TV** - Transmissão de esportes
9. **NOVELAS TV** - Telenovelas clássicas
10. **CANAL HUMOR** - Programas de comédia
11. **NATGEO BRASIL** - Documentários de natureza
12. **DISCOVERY BRASIL** - Documentários variados

---

## 📻 Rádios Disponíveis

### São Paulo
- CBN NACIONAL (780 AM)
- JOVEM PAN (100.9 FM)
- BANDNEWS FM (90.9 FM)
- KISS FM (99.1 FM)
- MEGA FM (104.3 FM)

### Rio de Janeiro
- RÁDIO BRASIL (1400 AM)
- RÁDIO TROPICANA (98.5 FM)
- RÁDIO CLÁSSICA (101.3 FM)

### Minas Gerais
- ITATIAIA (104.7 FM)
- RÁDIO SERTANEJA (95.3 FM)

### Outros Estados
- BRASIL SERTANEJO (BA, 96.5 FM)
- RÁDIO FOGO (RS, 103.1 FM)
- RÁDIO URBANA (DF, 101.9 FM)
- RÁDIO AMIZADE (CE, 88.7 FM)
- RÁDIO MAIS AMOR (PE, 100.5 FM)

---

## 🐛 Troubleshooting

### Reprodução não inicia
1. Verifique a conexão com a internet
2. Tente recarregar a página
3. Certifique-se que o navegador permite autoplay
4. Desabilite adblockers que possam bloquear streams

### Assistente de voz não funciona
1. Verifique se o navegador suporta Web Speech API
2. Verifique as permissões de microfone
3. Use um navegador atualizado

### Erros de HLS
O app tenta reconectar automaticamente. Se persistir:
1. Recarregue a página
2. Tente outro canal
3. Verifique se o endpoint do stream está ativo

---

## 📄 Licença

MIT License - Veja LICENSE para detalhes

---

## 👨‍💻 Autor

**Rio TV Aberta Team**  
giosivansilva40@gmail.com

---

## 🙏 Contribuições

Contribuições são bem-vindas! Sinta-se livre para:
- Reportar bugs
- Sugerir features
- Fazer pull requests

---

## 📞 Suporte

Para suporte, abra uma issue no GitHub ou envie email para giosivansilva40@gmail.com

---

**🎬 Assista RIO TV ABERTA - TV e Rádios abertas com IA! 📺📻**  
**🔗 HTTP://RIOTVABERTA.COM.BR**