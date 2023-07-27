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
  { title: 'Hour', count: 528, desc: '528 시간', icon: SVGs.aboutIcon0 },
  { title: 'Commit', count: 1129, desc: '1129개의 Commit', icon: SVGs.aboutIcon1 },
  { title: 'PR', count: 192, desc: '192개의 PR', icon: SVGs.aboutIcon2 },
];

export const MEMBERS = [
  //img 변경 예정
  {
    name: '이선아',
    team: 'FE',
    img: 'images/image/aboutProfile/sunbbang0.jpg',
    githubUrl: 'https://github.com/Doyu-Lee',
    githubNick: '@Doyu_Lee',
    introduce:
      '안녕하세요! 전 초등교사 현 망고 집사이자 프론트엔드 개발자 지망생 이선아입니다. 그림, 글을 창작하는 것과 새로운 무언가를 경험해보는 것을 좋아합니다. 개발을 하면서 느끼게 되는 성취감이 좋습니다.어제보다 오늘, 오늘보다 내일 늘 한 발짝씩 나아가는 개발자가 되려고 합니다.',
    impression:
      '쑻... 한 마디로 산 너머 산이었습니다. 브랜치, 로컬테스트, 배포, CORS... 그 무엇하나 쉬운 것이 없었습니다. 하지만 함께였기에 이겨낼 수 있었고, 그 과정에서 많은 것을 배울 수 있었습니다. 그렇기에 우리 모두는 서로에게 최선의 선빵이었습니다. 당신의 과소비가 0에 수렴할 때까지, 제로힙은 멈추지 않습니다!',
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
    impression:
      '데모데이 당일 3시 반에서야 드디어 CORS 이슈를 해결하였습니다. 분명 백엔드에서도 전역으로 설정하였으나 CORS 이슈가 몇몇 페이지에서만 발생하여 팀원들이 심적으로 많은 고생을 하였습니다. 테스트 진행이 안 되기도 하였고요... 처음에는 과제 제출 전 까지 무조건 해내야 하는데 진도가 안 나가 답답하기도 했습니다. 하지만 팀원들이 함께 데모데이 전 까지 이슈를 해결하지 못 하더라도, 계속해서 고쳐 나가자고 얘기 나누며 더욱 돈독해지었고, 결국은 데모데이 당일엔 CORS 이슈를 해결하였네요. 아직은 완벽하게 작동하지 않고, 해결해야할 점도 있지만 그래도 팀원 분들과 함께라면 끝까지 해낼 수 있을 거라 믿습니다! 저도 한 발자국씩 걸어나가 더욱 성장할 수 있는 좋은 기회였던 것 같습니다. 감사합니다.',
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
    introduce:
      '안녕하세요 저는 백엔드 개발자를 목표로 공부를 진행중에 있습니다. 모바일공학과 복수전공을 시작으로 코드스테이츠에 참여하면서 목표를 향해서 한걸음씩 나아가고있습니다.  최근 금융권 도메인관련 커리어에 관심이 생겨 조금더 구체화된 목표를 향에 나아가려하고있습니다.',
    impression:
      '메인 프로젝트를 진행하면서, 한번도 해보지 못한 배포 관련 경험을 할 수 있었습니다. 부족한 점도 많았지만 서로 함께 고민해주고 적극적으로 같이 해결할 수 있도록 도와주신 팀원분들 덕분에 많이 배우고 성장할 수 있는 시간이었습니다 🙂',
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
    introduce:
      '안녕하세요 ! 팀 선빵에서 "zerohip" 백엔드 개발을 진행한 최한별 입니다. 제가 사용해 본 기술 스택은 Java 와 Spring Boot, Spring Securtiy, JWT, 그리고 Oauth2.0 입니다.이 기술 스택들을 활용해 이번 프로젝트에서는, 사용자가 웹의 기능을 이용할 때, 발생할 수 있는 문제에 대한 빠른 파악과 해결을 도울 수 있도록 예외처리에 대한 커스텀 인터페이스와 구현체를 작성하고, 클라이언트 단에 효율적으로 전달하기 위해 가공하는 부분에 중점을 두어 구현했습니다. 또한,  Spring Securtiy 와 JWT 를 이용해 보안 부분, 인증과 인가를 신경썼으며, Oauth2.0 인증을 통해 사용자가 편리하게 로그인 후 사용할 수 있도록 구현했습니다.',

    impression:
      '프로젝트를 진행하면서 수많은 에러를 만났습니다. 그리고, 개발을 진행한 3주 동안에러들을 마주할 때마다 맞서 싸워 이겨내겠다는 생각을 가장 많이 했던 것 같습니다. 처음 개발을 시작하기 전에는, 다양한 기술 스택을 최대한 많이 사용해 적용해보고, 또 경험해보고 싶은 마음이었습니다. 하지만 개발을 시작하고 많은 에러들을 만날수록, 제가 사용하는 기술스택에 대한 지식이 아직은 얕다는 생각이 들었습니다. 더 확실하고 깊은 공부를 통해 사용해본 기술 스택을 제 것으로 만들고 싶습니다. 그리고, 이후엔 조금 더 다양한 기술 스택을 적용하여 프로젝트를 진행하고 싶습니다.',
    worklog: [
      '회원 CRUD',
      'Spring Security',
      'OAuth2.0 로그인 인증',
      'JWT 생성 및 발급을 통한 사용자 인증',
      '비즈니스 로직 예외처리 추상화 및 공통화',
    ],
  },
];
