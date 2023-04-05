import styles from "./SideStickyCard.module.css";
interface Props {
  imageUrl: string;
}

const SideStickyCard: React.FC = () => {
  return (
    <div className={`${styles.sticky_box} `}>
      <div className={styles.ad_image}>
          
        
      </div>
    </div>
  );
};

export default SideStickyCard;
