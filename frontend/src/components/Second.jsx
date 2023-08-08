import Timer from './Timer';

const Second = () => (
  <section className="second">
    <p className="second__subtitle">
      <span>Дорогие </span>
      друзья и&nbsp;родные!!
    </p>
    <h1>Наша свадьба</h1>
    <p className="second__text">
      Один день в&nbsp;этом году будет для нас особенным и&nbsp;мы&nbsp;хотим
      провести его в&nbsp;кругу близких и&nbsp;друзей.
    </p>
    <img className="rings" srcSet="./img/rings.png" alt="кольца" />
    <h3 className="second__h3">30&nbsp;сентября 2023 года</h3>
    <p className="second__sub-text">
      Уделите несколько минут, чтобы узнать все тонкости мероприятия.
    </p>
    <h3 className="second__h3">Осталось:</h3>
    <Timer date={new Date('September 30 2023 11:00:00 GMT+04:00')} />
  </section>
);

export default Second;
