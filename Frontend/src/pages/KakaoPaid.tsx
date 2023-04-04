import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const KakaoPaid: React.FC = () => {

  const navigate = useNavigate();
  // 모금 완료 메시지까지 띄우기
  const [isDone, setIsDone] = useState(false);

  // 페이지 방문 후 2초뒤에 완료 페이지 띄우기 
  useEffect(() => {
    setTimeout(() => { setIsDone(true) }, (2000));

    // 3초후에 페이지 이동시키기 (일단 홈으로)
    setTimeout(() => { navigate('/') }, (3000));
  }, [])
  

  return (
    <>
      {isDone ? (
        <div>
          기부가 완료되었습니다!
        </div>
      ) : (
        <div>
          입금된 금액을 토큰으로 바꾸는 중입니다...
        </div>
      )}
    </>
  )
}

export default KakaoPaid;