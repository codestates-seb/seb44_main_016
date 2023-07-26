import SVGs from './svg';

export const PLAN = [
  {
    title: '함께하다',
    engTitle: 'Together',
    desc: '친구, 가족 연인과 함께 우리만의 가계부를 작성하면서 함께 모으고 지출한 비용을 기록 할 수 있어요.',
  },
  {
    title: '절약하다',
    engTitle: 'Saving',
    desc: '과시를 조장하는 SNS가 아닌 절약을 유도하는 SNS를 기획했어요. 적은 돈으로도 가치있는 시간을 보낼 수 있다는 것을 서로 증명해요.',
  },
  {
    title: '기록하다',
    engTitle: 'Receord',
    desc: '가계부와 일기장이 함께하여 하루 하루 소중한 소비가 모여 타임라인에 추억을 쌓을 수 있어요.',
  },
];

export const SLOGAN = '당신의 과소비가 0에 수렴할 때 까지, 제로힙.';

export const TEAM_COUNT = [
  { title: 'Hour', count: 456, desc: '456 시간', icon: SVGs.aboutIcon0 },
  { title: 'Commit', count: 817, desc: '817개의 Commit', icon: SVGs.aboutIcon1 },
  { title: 'PR', count: 149, desc: '149개의 PR', icon: SVGs.aboutIcon2 },
];

export const MEMBERS = [
  //img 변경 예정
  {
    name: '이선아',
    team: 'FE',
    img: 'images/image/aboutProfile/sunbbang0.jpg',
    githubUrl: 'https://github.com/Doyu-Lee',
    githubNick: '@Doyu_Lee',
    introduce: '저는 대왕망고입니다.',
    impression: '저는 이번에.. 킹왕짱이었습니다..',
    worklog: ['로그인 및 로그아웃', '회원 CRUD', '네이버, 카카오, 구글 OAuth', 'SEO 최적화'],
  },
  {
    name: '오은비',
    team: 'FE',
    img: 'images/image/aboutProfile/sunbbang1.jpg',
    githubUrl: 'https://github.com/dreamogu',
    githubNick: '@dreamogu',
    introduce:
      '안녕하세요. 저는 프론트앤드 개발을 맡은 오은비입니다. 비전공자로 이전에는 퍼블리싱 업무를 맡은 적이 있어 개발자와 협업을 여러 번 진행하며 개발자에 대한 꿈을 키워왔습니다. 저의 목표는 사용자를 생각하는 개발자이며, 개발을 할 때 웹 접근성을 늘 고려하며 개발하고 있습니다. 어제보다 오늘, 오늘보다 내일 더 나은 개발자가 되기 위해 계속해서 공부 중이며 현재 React, TS, Next.js를 사용하고 있습니다.',
    impression: '',
    worklog: [
      '가계부 CRUD',
      '가계부 게시글 R',
      '이미지 줌인,아웃 기능',
      '이미지 크롭 기능',
      '공통 디자인 컴포넌트',
    ],
  },
  {
    name: '오현석',
    team: 'FE',
    img: 'images/image/aboutProfile/sunbbang2.jpg',
    githubUrl: 'https://github.com/waypil',
    githubNick: '@WAYPIL',
    introduce:
      '안녕하세요! 저는 현재 웹 프론트엔드 개발자 취업을 목표로 달리고 있습니다. 현재 방송통신대 컴퓨터과학과 졸업 예정이며, 웹과 관련된 저의 기술은 React, TypeScript, Flask/Python, SQL, MongoDB 정도가 있겠습니다. 그리고 이번 프로젝트를 통해 Next.js, Redux, Tanstack-Query도 다룰 수 있게 되었고, 백엔드 관련 지식도 높아졌습니다.',
    impression:
      '이번 프로젝트를 통해서 많이 겸손해지고, 저의 부족함에 대해서도 많이 깨달았습니다. 제가 이 자리까지 올 수 있었던 건 팀장님, 그리고 저희 팀원 분들 덕분입니다. 저를 믿고 함께해주신 여러분 덕분에 Main-Project를 완주할 수 있었습니다. 감사합니다!',
    worklog: ['헤더/사이드바 제작', 'SNS 게시글 UI', '글쓰기 페이지', '반응형 웹 구현', '영상 제작 & CS '],
  },
  {
    name: '서재곤',
    team: 'BE',
    img: 'images/image/aboutProfile/sunbbang3.jpg',
    githubUrl: 'https://github.com/Jgone2',
    githubNick: '@Jgone2',
    introduce: '저는 바지사장입니다.',
    impression: '저는 이번에.. 킹왕짱이었습니다..',
    worklog: ['가계부 CRUD', '가계부 게시글 CRUD', '이미지 업로드(S3)', '댓글', '인터페이스화'],
  },
  {
    name: '김윤희',
    team: 'BE',
    img: 'images/image/aboutProfile/sunbbang4.jpeg',
    githubUrl: 'https://github.com/YOONHEE-KIM',
    githubNick: '@YOONHEE-KIM',
    introduce:
      '팀 이름은 선빵, 좋아하는 요일은 일주일의 시작인 월요일, 안녕하세요 스폰지밥입니다. 언제나 시작하는 마음으로 개발을 하고 있습니다.',
    impression:
      '프로젝트 기간동안 무조건 빠르게 진행하는 것만이 정답은 아니라는 걸 느꼈습니다. 서두르느라 만들어낸 휴먼에러, 정교하지 못한 코드는 결국 그 이상의 시간을 들여 찾는 과정을 거쳐야했습니다. 코드 한 줄도 한 번 더 보는 습관을 가지게 되었습니다. 좋은 기획안을 가지고 있던 이번 프로젝트를 완전히 구현해내지 못한 것이 아쉽지만, 팀원분들과 함께하면서 많이 배울 수 있었습니다.',
    worklog: ['피드 게시글 CRUD', '투표, 좋아요 기능', '회원별 피드 페이지'],
  },
  {
    name: '최한별',
    team: 'BE',
    img: 'images/image/aboutProfile/sunbbang5.jpg',
    githubUrl: 'https://github.com/tapdancedorong',
    githubNick: '@onestar',
    introduce: '저는 태양입니다.',
    impression: '저는 이번에.. 킹왕짱이었습니다..',
    worklog: [
      '회원 CRUD',
      'Spring Security',
      'OAuth2.0 로그인 인증',
      'JWT 생성 및 발급을 통한 사용자 인증',
      '비즈니스 로직 예외처리 추상화 및 공통화',
    ],
  },
];
