import { ToastContainer } from 'react-toastify';

export default function Toast() {
  return (
    <ToastContainer
      position='bottom-right' // 알람 위치 지정
      autoClose={3000} // 자동 off 시간
      hideProgressBar={false} // 진행시간바 숨김
      newestOnTop={false}
      closeOnClick // 클릭으로 알람 닫기
      rtl={false} // 알림 좌우 반전
      draggable // 드래그 가능
      pauseOnHover // 마우스를 올리면 알람 정지
      theme='light'
      limit={7} // 알람 개수 제한
    />
  );
}
