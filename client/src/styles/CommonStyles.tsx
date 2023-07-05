import styled from '@emotion/styled';
import { InputHTMLAttributes } from 'react';
import tw from 'twin.macro';

interface ButtonProps {
  small?: boolean;
  large?: boolean;
}

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const CommonStyles = {
  SubmitBtn: styled.button<ButtonProps>((props) => [
    tw`relative inline-block [line-height: 1] text-white p-3 rounded-full font-normal border-2 border-primary border-solid overflow-hidden bg-white z-10 hover:(text-primary bg-white duration-700 font-bold) before:(content-[''] absolute w-80 h-80 -left-16 -top-16 -z-10 rounded-full bg-primary translate-x-full translate-y-full transition-all duration-700) before:hover:( top-10 left-10 transition-all duration-700)`,
    props.small
      ? tw`w-auto px-[1.125rem] py-[0.68rem] before:(w-32 h-32 -left-1/2 -top-1/2) before:hover:(top-16 left-10)`
      : props.large
      ? tw`w-full max-w-xl before:(w-[1000px] h-[1000px] -left-1/2 -top-[1000%]) before:hover:(top-16 left-10)`
      : tw`w-40`,
  ]),

  InputText: styled.input<InputProps>`
    ${tw`bg-white text-base [line-height:1] rounded-full w-full px-7 py-3 border-line-gray border border-solid text-fontColor-gray01 placeholder:text-fontColor-gray07 focus:outline-primary `}
  `,

  Textarea: styled.textarea<React.HTMLProps<HTMLTextAreaElement>>`
    ${tw`bg-white rounded-default w-full px-7 py-4 text-fontColor-gray01 placeholder:text-fontColor-gray07 border-line-gray resize-none min-h-[120px] focus:outline-primary`}
  `,

  RadioBtnLabel: tw.label`
  flex align-middle font-normal
  `,

  RadioBtn: tw.input`
  appearance-none relative w-[18px] h-[18px] border-line-gray rounded-full border border-solid bg-white cursor-pointer mr-[10px]

  checked:( border-primary border-4)
  `,

  BlindTitle: tw.h2`
  absolute w-[1px] h-[1px] m-[-1px] overflow-hidden
  `,
};

export default CommonStyles;
