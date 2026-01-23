
import { Room, Activity, Review } from './types';

export const ROOMS: Room[] = [
  {
    id: 'g1',
    name: '럭셔리 글램핑 A',
    type: 'glamping',
    isNew: true,
    isCoupleRecommended: true,
    description: '가장 최근에 신축된 프라이빗한 공간. 숲 전망과 현대적인 시설.',
    priceRange: '180,000 ~ 320,000',
    maxPeople: 2,
    features: ['신축', '프라이빗', '개별화장실', '개별바베큐'],
    imageUrl: 'https://picsum.photos/seed/glamp1/800/600'
  },
  {
    id: 'g2',
    name: '럭셔리 글램핑 B',
    type: 'glamping',
    isNew: true,
    isCoupleRecommended: true,
    description: '개방감 있는 테라스와 아늑한 침실이 조화로운 신축 객실.',
    priceRange: '180,000 ~ 320,000',
    maxPeople: 2,
    features: ['신축', '숲전망', '감성인테리어'],
    imageUrl: 'https://picsum.photos/seed/glamp2/800/600'
  },
  {
    id: 'p1',
    name: '펜션 스위트 101',
    type: 'pension',
    description: '가족 단위 여행객을 위한 넓은 거실과 분리된 침실.',
    priceRange: '220,000 ~ 450,000',
    maxPeople: 4,
    features: ['넓은거실', '개별테라스', '풀키친'],
    imageUrl: 'https://picsum.photos/seed/pen1/800/600'
  }
];

export const ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    title: '산정호수 아침 산책',
    category: 'outdoor',
    description: '물안개 피는 호수길을 따라 걷는 고요한 힐링 타임.',
    imageUrl: 'https://picsum.photos/seed/walk/400/300'
  },
  {
    id: 'a2',
    title: '불멍 & 마시멜로 구이',
    category: 'outdoor',
    description: '타오르는 장작불 소리와 함께 즐기는 감성적인 밤.',
    imageUrl: 'https://picsum.photos/seed/fire/400/300'
  },
  {
    id: 'a3',
    title: '와인 & 치즈 보드게임',
    category: 'indoor',
    description: '추운 겨울날, 따뜻한 실내에서 즐기는 소소한 즐거움.',
    imageUrl: 'https://picsum.photos/seed/wine/400/300'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: '김*현',
    rating: 5,
    content: '글램핑인데 정말 유난히 깨끗해요. 화장실 청결 상태 보고 깜짝 놀랐습니다.',
    date: '2024.03.15'
  },
  {
    id: 'r2',
    author: '이*정',
    rating: 5,
    content: '사장님이 너무 친절하세요. 바베큐 세팅부터 불멍까지 세심하게 챙겨주셔서 감동했습니다.',
    date: '2024.03.10'
  }
];
