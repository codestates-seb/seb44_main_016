import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  FocusEvent,
} from 'react';
import CommonStyles from '../styles/CommonStyles';
import styled from '@emotion/styled';
import DropDown from '../../public/image/dropdown.svg';

const DOMAIN = ['naver.com', 'gmail.com', 'daum.net', 'outlook.com', 'korea.kr'];
interface SelectBoxProps {
  searchItem: string;
  setSearchItem: (value: string) => void;
}
export default function SelectBox({ searchItem, setSearchItem }: SelectBoxProps) {
  const [isDropDownClicked, setIsDropDownClicked] = useState(false);
  const [isLayoutClicked, setIsLayoutClicked] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [isOnce, setIsOnce] = useState(true);
  const inputRef = useRef(null);
  const handleBlur = (event: FocusEvent) => {
    if (event.target !== inputRef.current) {
      setIsDropDownClicked(false);
      setIsLayoutClicked(false);
    }
  };
  useEffect(() => {
    if (!searchItem && !isOnce) {
      setIsDropDownClicked(false);
      setIsLayoutClicked(false);
    }
  }, [searchItem, isOnce]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setIsOnce(true);
    setSearchItem(searchValue);
    if (searchValue !== '') {
      setIsDropDownClicked(true);
      setIsLayoutClicked(true);
    } else {
      setIsDropDownClicked(false);
      setIsLayoutClicked(false);
    }
  };

  const handleOptionClick = (el: string) => {
    setSearchItem(el);
    setIsDropDownClicked(false);
    setIsLayoutClicked(false);
    setSelectedOptionIndex(0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' && selectedOptionIndex > 0) {
      e.preventDefault();
      setSelectedOptionIndex((prevIndex) => prevIndex - 1);
      setSearchItem(filteredItems[selectedOptionIndex]);
    } else if (e.key === 'ArrowDown' && selectedOptionIndex < DOMAIN.length - 1) {
      e.preventDefault();
      setSelectedOptionIndex((prevIndex) => prevIndex + 1);
      setSearchItem(filteredItems[selectedOptionIndex]);
    } else if (e.key === 'Enter' && searchItem !== '') {
      e.preventDefault();
      setIsDropDownClicked(false);
      setIsLayoutClicked(false);
      setSelectedOptionIndex(0);
    } else if (e.key === 'Tab') {
      setIsDropDownClicked(false);
      setIsLayoutClicked(false);
    }
  };
  let filteredItems = DOMAIN.filter((el) => {
    return el.startsWith(searchItem);
  });

  const handleDropBoxClick = () => {
    setIsDropDownClicked((prev) => !prev);
    setIsLayoutClicked((prev) => !prev);

    if (!searchItem && isOnce) {
      setIsDropDownClicked((prev) => !prev);
      setIsLayoutClicked((prev) => !prev);
      setIsOnce(false);
    }
    setSelectedOptionIndex(0);
    filteredItems = DOMAIN;
  };

  const optionElements = filteredItems.map((el, i) => (
    <S.Li
      key={el}
      onClick={() => handleOptionClick(el)}
      className={searchItem === el ? 'selected' : ''}
    >
      {el}
    </S.Li>
  ));

  return (
    <S.SelectContainer>
      <S.InputBox>
        <S.InputText
          className='filter'
          ref={inputRef}
          placeholder='직접 입력'
          id='domain'
          value={searchItem}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
        <S.DropDownBtn
          type='button'
          className={isDropDownClicked ? 'dropDownClicked' : ''}
          onClick={handleDropBoxClick}
          aria-label='이메일 검색하기'
        >
          <DropDown aria-hidden={true} />{' '}
        </S.DropDownBtn>
        {isDropDownClicked && isLayoutClicked && (
          <>
            <S.Ul>
              {optionElements.length > 0 ? (
                optionElements
              ) : (
                <S.Result>검색된 결과가 없습니다.</S.Result>
              )}
            </S.Ul>
            <S.Layout onClick={handleDropBoxClick}></S.Layout>
          </>
        )}
      </S.InputBox>
    </S.SelectContainer>
  );
}

const S = {
  ...CommonStyles,
  Layout: styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    cursor: auto;
  `,
  DropDownBtn: styled.button`
    z-index: 5;
    position: absolute;
    top: 50%;
    right: 1.25rem;
    transform: translateY(-50%);
    cursor: pointer;
    transition: transform 0.3s;
    &.dropDownClicked {
      transform: scaleY(-1) translateY(5px);
    }
  `,
  SelectContainer: styled.div`
    width: 100%;
  `,
  InputBox: styled.div`
    position: relative;
    width: 100%;
  `,
  Ul: styled.ul`
    z-index: 5;

    border: 1px solid var(--color-point-lilac);
    background-color: white;
    margin-top: 0.3rem;
    border-radius: 20px;
    width: 100%;
    padding: 0.7rem 1rem;
    position: absolute;
    top: 3rem;
  `,
  Li: styled.li`
    font-size: 0.9rem;
    color: #a4a7b5;
    margin: 0.3rem 0;
    cursor: pointer;
    &:hover,
    .selected {
      color: var(--color-primary);
    }
    .selected {
      color: var(--color-primary);
    }
  `,
  Result: styled.div`
    font-size: 0.9rem;
    color: #a4a7b5;
  `,
};
