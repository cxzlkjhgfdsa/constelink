import styles from "./SideStickyCard.module.css";
interface Props {
  imageUrl: string;
}

const SideStickyCard: React.FC<Props> = ({ imageUrl }) => {
  return (
    <div className={`${styles.sticky_box} `}>
      <img className={styles.ad_image} src={imageUrl} alt="광고 이미지" />
    </div>
  );
};

export default SideStickyCard;
