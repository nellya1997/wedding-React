import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Timer = ({ date }) => {
  const { t } = useTranslation();
  const [finishTime] = useState(date.getTime());
  const [[diffDays, diffH, diffM], setDiff] = useState([0, 0, 0]);
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const diff = (finishTime - new Date()) / 1000;
    if (diff < 0) return;
    setDiff([
      Math.floor(diff / 86400),
      Math.floor((diff / 3600) % 24),
      Math.floor((diff / 60) % 60),
    ]);
  }, [tick, finishTime]);

  useEffect(() => {
    const timerID = setInterval(() => setTick(!tick), 1000);
    return () => clearInterval(timerID);
  }, [tick]);

  return (
    <p className="second__timer">
      {/*
      {`дней: ${diffDays}, часов: ${diffH
        .toString()
        .padStart(2, '0')}, минут: ${diffM.toString().padStart(2, '0')}`}
      */}
      {t('timer.count_days', { count: diffDays })}
      {t('timer.count_hours', { count: diffH })}
      {t('timer.count_minutes', { count: diffM })}
    </p>
  );
};

export default Timer;
