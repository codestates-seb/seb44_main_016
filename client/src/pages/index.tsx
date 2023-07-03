import tw from 'twin.macro';
import { FlexPage } from '../components/common/PageTemplate';

const HomePageContainer = tw(FlexPage)`
flex flex-col justify-center bg-[#F0F3F8]
`;

export default function HomePage() {
  return (
    <HomePageContainer>
      <button>Submit</button>
      <button>Submit</button>
      <button>Submit</button>
    </HomePageContainer>
  );
}
