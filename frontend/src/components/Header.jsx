const Header = () => (
  <header className="header">
    <picture>
      <source type="image/webp" srcSet="./img/content1.webp" alt="" />
      <source type="image/jpg" srcSet="./img/content1.jpg" alt="" />
      <img src="./img/content1.jpg" alt="" />
    </picture>
    <p className="header__content">
      У нас
      <span>
        хорошая
        <br />
        новость!
      </span>
    </p>
    <a href="#form" className="header__twister">
      <img src="./img/heart.png" alt="" />
      <p className="spin__text">&#173;подтвердите&#173;присутствие</p>
    </a>
  </header>
);

export default Header;
