const Header = () => {
  const headerSpiner = (text) => text.split('').map((letter, i) => (<span key={letter} style={{ transform: `rotate(${i * 15}deg)` }}>{letter}</span>));
  return (
    <header className="header">
      <picture>
        <source type="image/webp" srcSet="./img/content1.webp" alt="" />
        <source type="image/jpg" srcSet="./img/content1.jpg" alt="" />
        <img src="./img/content1.jpg" alt="" />
      </picture>
      <p className="header__content">
        У нас&ensp;
        <span>
          хорошая
          <br />
          новость!
        </span>
      </p>
      <a href="#form" className="header__twister">
        <img srcSet="./img/heart.png" alt="" />
        <p className="spin__text">{headerSpiner(' подтвердите присутствие')}</p>
      </a>
    </header>
  );
};

export default Header;
