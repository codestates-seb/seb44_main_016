import styled from '@emotion/styled';
import Link from 'next/link';

interface Props {
  small?: boolean;
  large?: boolean;
  color?: string;
}

const CommonStyles = {
  SubmitBtn: styled.button<Props>`
    position: relative;
    display: inline-block;
    color: ${(props) =>
      props.color === '--color-point-lilac'
        ? `var(--color-black)`
        : `var(--color-white)`};
    padding: 1rem;
    border-radius: 100px;
    font-weight: 400;
    border: 2px solid
      ${(props) =>
        props.color ? `var(${props.color})` : `var(--color-primary)`};
    overflow: hidden;
    background-color: white;
    z-index: 1;

    &:hover {
      color: ${(props) =>
        props.color === '--color-point-lilac'
          ? `var(--color-black)`
          : props.color
          ? `var(${props.color})`
          : `var(--color-primary)`};
      background-color: white;
      transition-duration: 0.7s;
      font-weight: 700;
    }
    &::before {
      content: '';
      position: absolute;
      width: 20rem;
      height: 20rem;
      top: -4rem;
      left: -4rem;
      z-index: -1;
      border-radius: 100%;
      background: ${(props) =>
        props.color ? `var(${props.color})` : `var(--color-primary)`};
      transition: 0.7s;
    }

    &:hover::before {
      top: 2.5rem;
      left: 2.5rem;
    }
    ${({ small }) =>
      small &&
      `
    width: auto;
    padding: 0.68rem 1.125rem;
    &::before {
        width: 8rem;
        height: 8rem;
        top:-1.6rem;
        left:-1.6rem;
      }
    &:hover::before{
      top: 4rem;
      left: 4rem;
    }
  `}

    ${({ large }) =>
      large &&
      `
    width: 100%;
    max-width: 40rem;
    &::before {
        width: 80rem;
        height: 80rem;
        top:-16rem;
        left:-16rem;
      }

      &:hover::before{
        top: 10rem;
        left: 10rem;
      }
  `}
  
  ${({ small, large }) =>
      !small &&
      !large &&
      `
    width: 10rem;
  `}
  `,
  LinkBtn: styled(Link)<Props>`
    position: relative;
    display: inline-block;
    color: ${(props) =>
      props.color === '--color-point-lilac'
        ? `var(--color-black)`
        : `var(--color-white)`};
    padding: 1rem;
    border-radius: 100px;
    font-weight: 400;
    border: 2px solid
      ${(props) =>
        props.color ? `var(${props.color})` : `var(--color-primary)`};
    overflow: hidden;
    background-color: white;
    z-index: 1;
    text-align: center;

    &:hover {
      color: ${(props) =>
        props.color === '--color-point-lilac'
          ? `var(--color-black)`
          : props.color
          ? `var(${props.color})`
          : `var(--color-primary)`};
      background-color: white;
      transition-duration: 0.7s;
      font-weight: 700;
    }
    &::before {
      content: '';
      position: absolute;
      width: 20rem;
      height: 20rem;
      top: -4rem;
      left: -4rem;
      z-index: -1;
      border-radius: 100%;
      background: ${(props) =>
        props.color ? `var(${props.color})` : `var(--color-primary)`};
      transition: 0.7s;
    }

    &:hover::before {
      top: 2.5rem;
      left: 2.5rem;
    }
    ${({ small }) =>
      small &&
      `
    width: auto;
    padding: 0.68rem 1.125rem;
    &::before {
        width: 8rem;
        height: 8rem;
        top:-1.6rem;
        left:-1.6rem;
      }
    &:hover::before{
      top: 4rem;
      left: 4rem;
    }
  `}

    ${({ large }) =>
      large &&
      `
    width: 100%;
    max-width: 40rem;
    &::before {
        width: 80rem;
        height: 80rem;
        top:-16rem;
        left:-16rem;
      }

      &:hover::before{
        top: 10rem;
        left: 10rem;
      }
  `}
  
  ${({ small, large }) =>
      !small &&
      !large &&
      `
    width: 10rem;
  `}
  `,
  InputText: styled.input`
    background-color: white;
    border-radius: 100px;
    width: 100%;
    padding: 1rem;
    color: var(--color-gray01);
    border: 1px solid var(--color-border-gray);
    &:placeholder {
      color: var(--color-gray07);
    }
    &:focus {
      outline: 1px solid var(--color-primary);
    }
  `,
  Textarea: styled.textarea`
    background-color: white;
    border-radius: 6px;
    width: 100%;
    padding: 1rem;
    color: var(--color-gray01);
    border: 1px solid var(--color-border-gray);
    resize: none;
    min-height: 120px;

    &:placeholder {
      color: var(--color-gray07);
    }
    &:focus {
      outline: 1px solid var(--color-primary);
    }
  `,
  RadioBtnLabel: styled.label`
    display: flex;
    align-items: center;
    font-weight: 400;
  `,
  RadioBtn: styled.input`
    appearance: none;
    position: relative;
    width: 18px;
    height: 18px;
    border: 1px solid var(--color-border-gray);
    border-radius: 100%;
    background-color: var(--color-white);
    cursor: pointer;
    margin-right: 10px;

    &:checked {
      border: 4px solid var(--color-primary);
    }
  `,
};

export default CommonStyles;
