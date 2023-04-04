import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Web3 from "web3";

// interface propsType {
//   fundId?: number;
//   pageName: string;
//   pageLink: string;
// }

const MMLoading: React.FC = () => {
// const MMLoading: React.FC<propsType> = (props) => {
  
  const props = {
    fundId: 1,
    pageName: '모금 시작',
    pageLink: '/fundregi'
  }

  const navigate = useNavigate();

  // const [fundId, setFundId] = useState(0);
  // if (props.fundId) {
  //   setFundId(props.fundId);
  // };

  // 현재 접속한 유저의 metamask address 가져오기
  const [web3, setWeb3] = useState<Web3 | null>(null);
  // const [address, setAddress] = useState<string | null>(null);
  // const [contract, setContract] = useState<any | null>(null);

  // 계정 주소 불러오고, 펀딩 컨트랙트 연결
  useEffect(() => {
    const detectWeb3 = async () => {
      // If MetaMask is installed
      if (typeof window.ethereum !== "undefined") {
        // create an web3 instance
        const provider = window.ethereum;
        console.log(provider);
        await provider.request({ method: "eth_requestAccounts" });
        const web3Instance = new Web3(provider);
        setWeb3(web3Instance);
  
        // Get the user's address
        // const accounts = await web3Instance.eth.getAccounts();
        // setAddress(accounts[0]);
        
        // Load the contract
        // const contractInstance = new web3Instance.eth.Contract(FUND_ABI as AbiItem[], TEST_PUB_FUND_CA);
        // setContract(contractInstance); 
      }
    };
    detectWeb3();
  }, []);

  useEffect(() => {
    if (web3) {
      console.log(web3)
      navigate(props.pageLink, { state: props.fundId });
    };
  }, [])
  // 연결되어있는 상태라면 페이지 이동

  return (
    <>
      <div>
        {props.pageName} 페이지를 이용하기 위해선 Metamask와 연결이 필요합니다.
      </div>
      <div>
        Chrome플러그인에서 Metamask를 활성화 시켜주세요.
      </div>
    </>
  )
}

export default MMLoading;