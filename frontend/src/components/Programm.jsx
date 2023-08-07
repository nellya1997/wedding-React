const Programm = () => (
  <section className="programm">
    <h2 className="h2">Программа</h2>

    <div className="eleven">
      <h3 className="programm__h3">11:00</h3>
      <h4 className="programm__subtitle">Сбор гостей</h4>
      <div className="programm__text">
        <p>Просим взять с&nbsp;собой хорошее настроение и&nbsp;свои улыбки</p>
        <p>
          Просьба&nbsp;&mdash; не&nbsp;опаздывайте , чтобы мы&nbsp;успели
          сделать общее фото
        </p>
      </div>
      <picture>
        <source
          type="image/webp"
          srcSet="./img/programm1.webp"
          alt="Сбор гостей"
        />
        <source
          type="image/jpg"
          srcSet="./img/programm1.jpg"
          alt="Сбор гостей"
        />
        <img src="./img/programm1.jpg" alt="Сбор гостей" />
      </picture>
      <a
        className="where-to"
        href="https://goo.gl/maps/jbn3BHX9XRQpQD3i7"
        target="_blank"
        rel="noreferrer"
      >
        <img srcSet="./img/map.png" alt="найти нас" />
        <p>г. Ульяновск, улица Гимова 4</p>
      </a>
    </div>

    <div className="eleven-thirty">
      <h3 className="programm__h3">11:30</h3>
      <h4 className="programm__subtitle">Церемония</h4>
      <p className="programm__text">
        На&nbsp;всякий случай, приготовьте носовые платочки для трогательного
        момента
      </p>
      <picture>
        <source
          type="image/webp"
          srcSet="./img/programm2.webp"
          alt="Церемония"
        />
        <source type="image/jpg" srcSet="./img/programm2.jpg" alt="Церемония" />
        <img src="./img/programm2.jpg" alt="Церемония" />
      </picture>
      <a
        className="where-to"
        href="https://goo.gl/maps/jbn3BHX9XRQpQD3i7"
        target="_blank"
        rel="noreferrer"
      >
        <img srcSet="./img/map.png" alt="найти нас" />
        <p>г. Ульяновск, улица Гимова 4</p>
      </a>
    </div>

    <div className="twelve">
      <h3 className="programm__h3">12:00</h3>
      <h4 className="programm__subtitle">Фуршет</h4>
      <p className="programm__text">Небольшой перерыв перед самым весельем</p>
      <picture>
        <source type="image/webp" srcSet="./img/programm3.webp" alt="Фуршет" />
        <source type="image/jpg" srcSet="./img/programm3.jpg" alt="Фуршет" />
        <img src="./img/programm3.jpg" alt="Фуршет" />
      </picture>
      <a
        className="where-to"
        href="https://goo.gl/maps/jbn3BHX9XRQpQD3i7"
        target="_blank"
        rel="noreferrer"
      >
        <img srcSet="./img/map.png" alt="найти нас" />
        <p>г. Ульяновск, улица Гимова 4</p>
      </a>
    </div>

    <div className="twelve-thirty">
      <h3 className="programm__h3">12:30</h3>
      <h4 className="programm__subtitle">Прогулка</h4>
      <p className="programm__text">
        Насладимся природой и&nbsp;времяпровождением с&nbsp;близкими
      </p>
      <picture>
        <source
          type="image/webp"
          srcSet="./img/programm4.webp"
          alt="Прогулка"
        />
        <source type="image/jpg" srcSet="./img/programm4.jpg" alt="Прогулка" />
        <img srcSet="./img/programm4.jpg" alt="Прогулка" />
      </picture>
      <a
        className="where-to"
        href="https://goo.gl/maps/jbn3BHX9XRQpQD3i7"
        target="_blank"
        rel="noreferrer"
      >
        <img srcSet="./img/map.png" alt="найти нас" />
        <p>г. Ульяновск, улица Гимова 4</p>
      </a>
    </div>

    <div className="one-thirty">
      <h3 className="programm__h3">13:30</h3>
      <h4 className="programm__subtitle">Фотосессия</h4>
      <p className="programm__text">
        Сохраним самые трогательные моменты в&nbsp;красивом месте&nbsp;&mdash;
        дендрарий
      </p>
      <picture>
        <source
          type="image/webp"
          srcSet="./img/programm5.webp"
          alt="Фотосессия"
        />
        <source
          type="image/jpg"
          srcSet="./img/programm5.jpg"
          alt="Фотосессия"
        />
        <img src="./img/programm5.jpg" alt="Фотосессия" />
      </picture>
      <a
        className="where-to"
        href="https://goo.gl/maps/jbn3BHX9XRQpQD3i7"
        target="_blank"
        rel="noreferrer"
      >
        <img srcSet="./img/map.png" alt="найти нас" />
        <p>г. Ульяновск, улица Гимова 4</p>
      </a>
    </div>

    <div className="four">
      <h3 className="programm__h3">16:00</h3>
      <h4 className="programm__subtitle">Праздничный банкет</h4>
      <p>Время вкусной еды, танцев и&nbsp;веселья</p>
      <picture>
        <source type="image/webp" srcSet="./img/programm6.webp" alt="Банкет" />
        <source type="image/jpg" srcSet="./img/programm6.jpg" alt="Банкет" />
        <img srcSet="./img/programm6.jpg" alt="Банкет" />
      </picture>
      <a
        className="where-to"
        href="https://goo.gl/maps/jbn3BHX9XRQpQD3i7"
        target="_blank"
        rel="noreferrer"
      >
        <img src="./img/map.png" alt="найти нас" />
        <p>г. Ульяновск, улица Гимова 4</p>
      </a>
    </div>
  </section>
);

export default Programm;
