import { useDispatch, useSelector } from "react-redux";
import styles from "./Footer.module.css";
import { RootState } from "../../store";
import { useEffect } from "react";
import Web3 from "web3";
import { walletActions } from "../../store/wallet";
const Footer: React.FC = () => {
  // 현재 접속한 유저의 metamask address 가져오기
  const walletInfo = useSelector((state: RootState) => state.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    if (walletInfo.web3 === undefined) {
      const getWallet = async () => {
        const web3 = await new Web3(window.ethereum);
        const address = await web3.eth.getAccounts().then((res) => res[0]);
        const gasFee = await web3.eth.getGasPrice();
        dispatch(walletActions.setWallet({ web3, address, gasFee }));
        return await { web3, address, gasFee };
      };
      getWallet();
    }
  }, [walletInfo.web3]);

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.footerContents1}>
          지갑 주소 :{" "}
          {walletInfo.address
            ? walletInfo.address.toString()
            : "메타마스크를 깔아주세요"}
        </div>

        <div className={styles.footerContents2}>
          {walletInfo.gasFee
            ? "가스비: " + walletInfo.gasFee.toString() + "wei"
            : ""}
        </div>
        <div className={styles.footerContents3}>
          <a
            className={styles.footer_link}
            href="https://sepolia.etherscan.io/address/0x07A8A469ca0D02049599874580a0aBA76dd34F18"
          >
            기부내역 확인
          </a>
        </div>
      </div>
      <div className={styles.footer_bottom}>
        &copy; Constelink by SSAFY a206 srp
      </div>
    </div>
  );
};

export default Footer;
