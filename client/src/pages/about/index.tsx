import { AboutStyles } from '../../styles/AboutStyles';
import { MEMBERS, PLAN, SLOGAN } from '../../constants/about';
import { useEffect, useState } from 'react';
import Tab from '../../components/Tab';

export default function About() {
  const [memberIndex, setMemberIndex] = useState(0);
  const tabs = ['소개', '소감', '작업 내역'];
  const [activeTab, setActiveTab] = useState<string>('소개');
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const [typedText, setTypedText] = useState('');
  const speed = 150;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTypedText(SLOGAN.slice(0, typedText.length + 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [typedText]);
  return (
    <S.Container>
      <h1 className='blind'>팀 선빵 소개페이지</h1>
      <S.Section>
        <S.Title># Team. 선빵</S.Title>
        <p>
          안녕하세요. 팀 <S.Mark>선빵</S.Mark>입니다.
          <br /> 저희는 SNS와 가계부를 합친 SNS형 가계부 <S.Mark>'제로힙'</S.Mark> 프로젝트를 진행하고
          있습니다. 소통의 공간이 소비로 통하는 요즘, 제로의 힙, 소통의 힘을 믿으며 서비스를 개발 중입니다. 수
          백의 '있어빌리티'보다 당신의 <S.Mark>'제로빌리티'</S.Mark>를 응원합니다! <br />
        </p>
        <S.BackgroundBox>
          <p>{typedText}</p>
        </S.BackgroundBox>
      </S.Section>
      <S.Section>
        <S.Title># 기획 의도</S.Title>
        <S.PlanContainer>
          {PLAN.map((el, i) => {
            return (
              <div className='item' key={i}>
                <div className='inner'>
                  <div className='top'>
                    <h3>{el.title}</h3>
                    <div>{el.engTitle}</div>
                  </div>
                  <div className='bottom'>{el.desc}</div>
                </div>
              </div>
            );
          })}
        </S.PlanContainer>
      </S.Section>
      <S.Section>
        <S.Title># 팀원 소개</S.Title>
        <S.Members>
          <div className='top'>
            {MEMBERS.map((member, i) => (
              <button key={i} onClick={() => setMemberIndex(i)}>
                <div>
                  <img src={member.img} alt={member.name} />{' '}
                </div>
                <div className='name'>
                  <span>[{member.team}]</span>
                  {` `}
                  {member.name}
                </div>
              </button>
            ))}
          </div>
          <div className='bottom'>
            <S.ContentWrap>
              <S.ContentImg>
                <img src={MEMBERS[memberIndex].img} alt={MEMBERS[memberIndex].name} />
              </S.ContentImg>
              <S.ContentInfo>
                <div>
                  <S.MemberTitle>
                    <S.Team>{MEMBERS[memberIndex].team}</S.Team>
                    <div>
                      {MEMBERS[memberIndex].name}
                      <S.Github>
                        <a href={MEMBERS[memberIndex].githubUrl} target='_blank' rel='noreferrer'>
                          {MEMBERS[memberIndex].githubNick}
                        </a>
                      </S.Github>
                    </div>
                  </S.MemberTitle>
                  <Tab tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
                  <div>
                    {activeTab === '소개' ? (
                      <div>{MEMBERS[memberIndex].introduce}</div>
                    ) : activeTab === '소감' ? (
                      <div>{MEMBERS[memberIndex].impression}</div>
                    ) : (
                      <S.Ul>
                        {MEMBERS[memberIndex].worklog.map((el, i) => (
                          <li key={i}>{el}</li>
                        ))}
                      </S.Ul>
                    )}
                  </div>
                </div>
              </S.ContentInfo>
            </S.ContentWrap>
          </div>
        </S.Members>
      </S.Section>
    </S.Container>
  );
}

const S = {
  ...AboutStyles,
};
