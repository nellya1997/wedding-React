const Footer = () => (
  <footer className="footer">
    <div className="footer__text">
      <p>Мы&nbsp;ждем вас!</p>
      <p>
        С&nbsp;любовью,
        <br />
        <span>Нелля и&nbsp;Ильнур</span>
      </p>
    </div>

    <picture>
      <source type="image/webp" srcSet="./img/footer.webp" alt="Мы ждем Вас" />
      <source type="image/jpg" srcSet="./img/footer.jpg" alt="Мы ждем Вас" />
      <img srcSet="./img/footer.jpg" alt="Мы ждем Вас" />
    </picture>
  </footer>
);

export default Footer;
