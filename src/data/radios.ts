export interface RadioStation {
  id: string;
  name: string;
  state: string;
  frequency: string;
  stream: string;
  logo: string;
  genre: string;
}

export const radios: RadioStation[] = [
  {
    id: 'cbnnacional',
    name: 'CBN NACIONAL',
    state: 'SP',
    frequency: '780 AM',
    stream: 'https://stream.cbn.com.br/cbn_nacional.m3u8',
    logo: '📻',
    genre: 'Notícias',
  },
  {
    id: 'jovempan',
    name: 'JOVEM PAN',
    state: 'SP',
    frequency: '100.9 FM',
    stream: 'https://stream.jovempan.com.br/jovempan.m3u8',
    logo: '🎙️',
    genre: 'Pop/Rock',
  },
  {
    id: 'bandnews',
    name: 'BANDNEWS FM',
    state: 'SP',
    frequency: '90.9 FM',
    stream: 'https://stream.bandnews.com.br/bandnews.m3u8',
    logo: '📢',
    genre: 'Notícias',
  },
  {
    id: 'kiss',
    name: 'KISS FM',
    state: 'SP',
    frequency: '99.1 FM',
    stream: 'https://stream.kissfm.com.br/kiss.m3u8',
    logo: '💋',
    genre: 'Eletrônica',
  },
  {
    id: 'itatiaia',
    name: 'ITATIAIA',
    state: 'MG',
    frequency: '104.7 FM',
    stream: 'https://stream.itatiaia.com.br/itatiaia.m3u8',
    logo: '🎵',
    genre: 'Generalista',
  },
  {
    id: 'radiobrasil',
    name: 'RÁDIO BRASIL',
    state: 'RJ',
    frequency: '1400 AM',
    stream: 'https://stream.radiobrasil.com.br/radiobrasil.m3u8',
    logo: '🌎',
    genre: 'Música Popular',
  },
  {
    id: 'tropicana',
    name: 'RÁDIO TROPICANA',
    state: 'RJ',
    frequency: '98.5 FM',
    stream: 'https://stream.tropicana.com.br/tropicana.m3u8',
    logo: '🎺',
    genre: 'Samba/Bossa',
  },
  {
    id: 'sertaneja',
    name: 'RÁDIO SERTANEJA',
    state: 'MG',
    frequency: '95.3 FM',
    stream: 'https://stream.sertaneja.com.br/sertaneja.m3u8',
    logo: '🎸',
    genre: 'Sertanejo',
  },
  {
    id: 'megafm',
    name: 'MEGA FM',
    state: 'SP',
    frequency: '104.3 FM',
    stream: 'https://stream.megafm.com.br/mega.m3u8',
    logo: '🔊',
    genre: 'Dance/Pop',
  },
  {
    id: 'radioclassica',
    name: 'RÁDIO CLÁSSICA',
    state: 'RJ',
    frequency: '101.3 FM',
    stream: 'https://stream.radioclassica.com.br/classica.m3u8',
    logo: '🎼',
    genre: 'Clássica',
  },
  {
    id: 'brasilsertanejo',
    name: 'BRASIL SERTANEJO',
    state: 'BA',
    frequency: '96.5 FM',
    stream: 'https://stream.brasilsertanejo.com.br/brasilsertanejo.m3u8',
    logo: '🤠',
    genre: 'Sertanejo',
  },
  {
    id: 'radiofogo',
    name: 'RÁDIO FOGO',
    state: 'RS',
    frequency: '103.1 FM',
    stream: 'https://stream.radiofogo.com.br/fogo.m3u8',
    logo: '🔥',
    genre: 'Rock/Pop',
  },
  {
    id: 'urbana',
    name: 'RÁDIO URBANA',
    state: 'DF',
    frequency: '101.9 FM',
    stream: 'https://stream.radioburbana.com.br/urbana.m3u8',
    logo: '🏙️',
    genre: 'Hip-Hop/Rap',
  },
  {
    id: 'radioamizade',
    name: 'RÁDIO AMIZADE',
    state: 'CE',
    frequency: '88.7 FM',
    stream: 'https://stream.radioamizade.com.br/amizade.m3u8',
    logo: '💚',
    genre: 'Generalista',
  },
  {
    id: 'radiomaisamor',
    name: 'RÁDIO MAIS AMOR',
    state: 'PE',
    frequency: '100.5 FM',
    stream: 'https://stream.radiomaisamor.com.br/maisamor.m3u8',
    logo: '💚',
    genre: 'Forró/Axé',
  },
];

export const states = ['Todos', 'SP', 'RJ', 'MG', 'RS', 'BA', 'DF', 'CE', 'PE'];