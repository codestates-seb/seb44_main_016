import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent, FocusEvent } from 'react';
import CommonStyles from '../styles/CommonStyles';
import styled from '@emotion/styled';
import DropDown from '../../public/image/dropdown.svg';

interface SelectBoxProps {
  id?: string;
  placeholder: string;
  totalItem: string[];
  searchItem: string;
  setSearchItem: (value: string) => void;
  ariaLabel?: string;
}
export default function SelectBox({
  id,
  placeholder,
  totalItem,
  searchItem,
  setSearchItem,
  ariaLabel,
}: SelectBoxProps) {
  const [previousFilteredItem, setPreviousFilteredItem] = useState<string[]>([]);
  const [isDropDownClicked, setIsDropDownClicked] = useState(false);
  const [isLayoutClicked, setIsLayoutClicked] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [isOnce, setIsOnce] = useState(true);
  const [isOnceKeyboard, setIsOnceKeyboard] = useState(true);

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
    if (isOnceKeyboard) {
      setPreviousFilteredItem(filteredItems);
    }
    if (!isOnceKeyboard && !searchItem) {
      setIsDropDownClicked(false);
      setIsLayoutClicked(false);
      setSelectedOptionIndex(-1);
      setIsOnceKeyboard(true);
    }
  }, [searchItem, isOnce, isOnceKeyboard]);

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
    setSelectedOptionIndex(-1);
  };

  let filteredItems = totalItem.filter((el) => {
    return el.startsWith(searchItem);
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === 'ArrowUp' && searchItem) ||
      (e.key === 'ArrowDown' && searchItem) ||
      (e.key === 'Enter' && searchItem)
    ) {
      setIsOnceKeyboard(false);
    }

    if (e.key === 'ArrowUp' && selectedOptionIndex > 0) {
      e.preventDefault();
      const previousIndex = selectedOptionIndex - 1;
      setSelectedOptionIndex(previousIndex);
      const selectedItem = previousFilteredItem[previousIndex];
      setSearchItem(selectedItem);
    } else if (e.key === 'ArrowDown' && selectedOptionIndex < previousFilteredItem.length - 1) {
      e.preventDefault();
      const nextIndex = selectedOptionIndex + 1;
      setSelectedOptionIndex(nextIndex);
      const selectedItem = previousFilteredItem[nextIndex];
      setSearchItem(selectedItem);
    } else if (e.key === 'ArrowDown' && isOnceKeyboard && fixedOptionElements.length === 0) {
      e.preventDefault();
      setIsDropDownClicked(false);
      setIsLayoutClicked(false);
      setIsOnceKeyboard(true);
      setSelectedOptionIndex(-1);
    } else if (e.key === 'Enter' && searchItem !== '') {
      e.preventDefault();
      setIsDropDownClicked(false);
      setIsLayoutClicked(false);
      setIsOnceKeyboard(true);
      setSelectedOptionIndex(-1);
    }

    if (e.key === 'Backspace' && searchItem == '') {
      e.preventDefault();
      setIsOnceKeyboard(true);
    } else if (e.key === 'Backspace' && searchItem) {
      setSelectedOptionIndex(-1);
    } else if (e.key === 'Tab') {
      setIsOnceKeyboard(true);
      setIsDropDownClicked(false);
      setIsLayoutClicked(false);
    }
  };

  const handleDropBoxClick = () => {
    setIsDropDownClicked((prev) => !prev);
    setIsLayoutClicked((prev) => !prev);

    if (!searchItem && isOnce) {
      setIsDropDownClicked((prev) => !prev);
      setIsLayoutClicked((prev) => !prev);
      setIsOnce(false);
    }
    setSelectedOptionIndex(0);
    filteredItems = totalItem;
  };

  useEffect(() => {
    handleDropBoxClick();
  }, []);

  const optionElements = filteredItems.map((el) => (
    <S.Li key={el} onClick={() => handleOptionClick(el)} className={searchItem === el ? 'selected' : ''}>
      {el}
    </S.Li>
  ));

  const fixedOptionElements = previousFilteredItem.map((el) => (
    <S.Li key={el} onClick={() => handleOptionClick(el)} className={searchItem === el ? 'selected' : ''}>
      {el}
    </S.Li>
  ));

  return (
    <S.SelectContainer>
      <S.InputBox>
        {id ? (
          <S.InputText
            ref={inputRef}
            placeholder={placeholder}
            id={id}
            value={searchItem}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            aria-label={ariaLabel}
          />
        ) : (
          <S.InputText
            ref={inputRef}
            placeholder={placeholder}
            value={searchItem}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            aria-label={ariaLabel}
          />
        )}
        <S.DropDownBtn
          type='button'
          className={isDropDownClicked ? 'dropDownClicked' : ''}
          onClick={handleDropBoxClick}
        >
          <DropDown aria-hidden={true} />{' '}
        </S.DropDownBtn>
        {isDropDownClicked && isLayoutClicked && (
          <>
            <S.Ul>
              {!isOnceKeyboard ? (
                fixedOptionElements
              ) : optionElements.length > 0 ? (
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
    margin-top: 0.5rem;
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
  `,
  Result: styled.div`
    font-size: 0.9rem;
    color: #a4a7b5;
  `,
};
