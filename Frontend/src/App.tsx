import { Route, Routes } from "react-router-dom"
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import MainLayout from "./components/MainLayout";
// import Header from './components/header/Header';
// import Login from './pages/Login';

// 병원 페이지
import HospitalPage from "./pages/HospitalPage";
import BenRegister from "./pages/BenRegister";
import FundRegister from "./pages/FundRegister";
import HosBenList from "./pages/HosBenList";
import HosFundList from "./pages/HosFundList";
import NoticePage from './pages/NoticePage';
import CustomerMyHome from './pages/CustomerMyHome';

import RecoveryDiary from './pages/RecoveryDiary';
import RecoveryDiaryDetail from './pages/RecoveryDiaryDetail';
import FundMain from "./pages/FundMain";
import FundDetail from "./pages/FundDetail";
import FundPayment from "./pages/FundPayment";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const authInfo = useSelector((state:RootState)=> state.auth);
  return (
    <div className="App">

      <Routes>
        <Route element={<MainLayout />}>
          {/* 홈 페이지 */}
          <Route path='/' element={<HomePage />} />
          {/* 공지사항 페이지 */}
          <Route path="/notice/*" element={<NoticePage />} />
          

          
          {/* 모금 페이지 */}
          <Route path='/fundmain' element={<FundMain />} />
          <Route path='/fundmain/funddetail/:id' element={<FundDetail />} />
          <Route path='/fundpayment/kakao/:id' element={<FundPayment />} />
          
          <Route path='/hospage' element={<HospitalPage />} />
          <Route path='/benregi' element={<BenRegister />} />
          <Route path='/fundregi' element={<FundRegister />} />
          <Route path='/hosbenlist' element={<HosBenList />} />
          <Route path='/hosfundlist' element={<HosFundList />} />
          
         
          <Route path='/diary' element={<RecoveryDiary />} />
          <Route path='/diarydetail/:id' element={<RecoveryDiaryDetail />} />
          
          {/* 역할별 마이페이지 설정 */}
          {
            authInfo.isAuthenticated && (authInfo.role==="USER"||authInfo.role==="ADMIN")?
            <Route path="/mypage/*" element={<CustomerMyHome />} />:
            authInfo.isAuthenticated && authInfo.role==="HOSPITAL"?
            <Route path="/mypage/*" element={<HospitalPage />} />:""
          }
         




        </Route >
        <Route path='/login' element={<Login />} />
      
      </Routes>
    </div>
  )
}
export default App;

