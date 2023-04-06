import { useSelector } from "react-redux";
import styles from "./Footer.module.css";
import { RootState } from "../../store";
const Footer: React.FC = () => {
  // 현재 접속한 유저의 metamask address 가져오기
  const walletInfo = useSelector((state: RootState) => state.wallet);
  console.log(walletInfo.web3);
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          지갑 주소 :{" "}
          {walletInfo.address
            ? walletInfo.address.toString()
            : "메타마스크를 깔아주세요"}
          {walletInfo.gasFee
            ? " , 가스비: " + walletInfo.gasFee.toString() + "wei"
            : ""}
        </div>
      </div>
      <div className={styles.footer_bottom}>
        &copy; Constelink by SSAFY a206 srp
      </div>
    </div>
  );
};

export default Footer;
