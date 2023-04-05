import styles from "./Footer.module.css";
const Footer: React.FC = () => {
   
    
    return (

        <footer className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/services">Our Services</a>
            <a href="/contact">Contact Us</a>
          </div>
          <div className={styles.footerContact}>
            <p>123 Main St.</p>
            <p>Anytown, USA 12345</p>
            <p>Phone: 555-555-5555</p>
            <p>Email: info@example.com</p>
          </div>
        </div>
        <p className={styles.footerText}>&copy; 2023 Example Company</p>
      </footer>


    )
}


export default Footer;
