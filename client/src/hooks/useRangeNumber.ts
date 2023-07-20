import { useState } from 'react';

/** startNum~endNum 사이 자연수 Range ±1 증감 함수.
const [ isStart, isEnd, currentNum, setCurrentNum] = useRangeNumber(startNum, endNum); 식으로 사용한다. 숫자의 증감이 필요한 경우, setCurrnetNum(currentNum + 1); 식으로 사용하는 것을 권장한다.
 */
export default function useRangeNumber(
  startNum: number,
  endNum: number
): [boolean, boolean, number, React.Dispatch<React.SetStateAction<number>>] {
  const [currentNum, setCurrentNumInner] = useState(startNum);

  const isStart = currentNum === startNum;
  const isEnd = currentNum === endNum;

  const SetCurrentNum = (value: number) => {
    setCurrentNumInner((prevNum) => {
      if (value < startNum || value > endNum) {
        return prevNum;
      }
      return value;
    });
  };

  return [isStart, isEnd, currentNum, SetCurrentNum];
}
