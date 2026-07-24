export interface TVChannel {
  id: string;
  name: string;
  category: string;
  logo: string;
  stream: string;
  description: string;
}

export const channels: TVChannel[] = [
  {
    id: 'tvbrasil',
    name: 'TV BRASIL',
    category: 'Educativa',
    logo: '📺',
    stream: 'https://stream.tvbrasil.ebc.com.br/tvbrasil/tvbrasil.m3u8',
    description: 'Educação e Cultura',
  },
  {
    id: 'tvsenado',
    name: 'TV SENADO',
    category: 'Política',
    logo: '🏛️',
    stream: 'https://video01.eshcdn.com.br/hls/tvsenado.m3u8',
    description: 'Transmissão Senado Federal',
  },
  {
    id: 'tvcamara',
    name: 'TV CÂMARA',
    category: 'Política',
    logo: '🏛️',
    stream: 'https://video01.eshcdn.com.br/hls/tvcamara.m3u8',
    description: 'Transmissão Câmara dos Deputados',
  },
  {
    id: 'futura',
    name: 'FUTURA',
    category: 'Educativa',
    logo: '🎓',
    stream: 'https://stream.futura.org.br/futura/futura.m3u8',
    description: 'Canal de Educação',
  },
  {
    id: 'escolakids',
    name: 'ESCOLA KIDS',
    category: 'Infantil',
    logo: '👶',
    stream: 'https://hls.schooltv.com.br/schooltv/schooltv.m3u8',
    description: 'Programação infantil educativa',
  },
  {
    id: 'artefilms',
    name: 'ARTE & FILMES',
    category: 'Cultura',
    logo: '🎬',
    stream: 'https://stream.artefilms.com.br/artefilms/artefilms.m3u8',
    description: 'Cinema arte e documentários',
  },
  {
    id: 'musictv',
    name: 'MUSIC TV',
    category: 'Música',
    logo: '🎵',
    stream: 'https://stream.musictv.com.br/musictv/musictv.m3u8',
    description: 'Clipes e programas musicais',
  },
  {
    id: 'sportv',
    name: 'SPORTS TV',
    category: 'Esportes',
    logo: '⚽',
    stream: 'https://stream.sportstv.com.br/sportstv/sportstv.m3u8',
    description: 'Transmissão de esportes',
  },
  {
    id: 'novelas',
    name: 'NOVELAS TV',
    category: 'Entretenimento',
    logo: '🎭',
    stream: 'https://stream.novelastv.com.br/novelastv/novelastv.m3u8',
    description: 'Telenovelas clássicas',
  },
  {
    id: 'humor',
    name: 'CANAL HUMOR',
    category: 'Comédia',
    logo: '😂',
    stream: 'https://stream.humorcanal.com.br/humor/humor.m3u8',
    description: 'Programas de humor',
  },
  {
    id: 'natgeobr',
    name: 'NATGEO BRASIL',
    category: 'Documentário',
    logo: '🌍',
    stream: 'https://stream.natgeo.com.br/natgeo/natgeo.m3u8',
    description: 'Documentários natureza',
  },
  {
    id: 'discoverybr',
    name: 'DISCOVERY BRASIL',
    category: 'Documentário',
    logo: '🔍',
    stream: 'https://stream.discovery.com.br/discovery/discovery.m3u8',
    description: 'Documentários variados',
  },
];

export const categories = ['Todos', 'Educativa', 'Política', 'Infantil', 'Cultura', 'Música', 'Esportes', 'Entretenimento', 'Comédia', 'Documentário'];