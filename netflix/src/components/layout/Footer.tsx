import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <h3 className='footer-title'>Netflix 대한민국</h3>
        <div className='footer-links'>
          <a href='#' className='footer-link'>
            자주 묻는 질문
          </a>
          <a href='#' className='footer-link'>
            고객센터
          </a>
          <a href='#' className='footer-link'>
            계정
          </a>
          <a href='#' className='footer-link'>
            미디어 센터
          </a>
          <a href='#' className='footer-link'>
            투자 정보(IR)
          </a>
          <a href='#' className='footer-link'>
            입사 정보
          </a>
          <a href='#' className='footer-link'>
            Netflix 지원 디바이스
          </a>
          <a href='#' className='footer-link'>
            이용 약관
          </a>
          <a href='#' className='footer-link'>
            개인정보
          </a>
          <a href='#' className='footer-link'>
            쿠키 설정
          </a>
          <a href='#' className='footer-link'>
            회사 정보
          </a>
          <a href='#' className='footer-link'>
            문의하기
          </a>
          <a href='#' className='footer-link'>
            속도 테스트
          </a>
          <a href='#' className='footer-link'>
            법적 고지
          </a>
          <a href='#' className='footer-link'>
            오직 Netflix에서
          </a>
        </div>
        <div className='footer-country'>Netflix 대한민국</div>
        <div className='footer-copyright'>
          &copy; 1997-{new Date().getFullYear()} Netflix, Inc.
        </div>
      </div>
    </footer>
  )
}

export default Footer
