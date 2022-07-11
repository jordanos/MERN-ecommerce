export type Time = {
  date: Date;
  hour: string;
  minute: string;
  second: string;
  session: string;
};

const getTime = (): Time => {
  const date = new Date();
  let hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();
  let session = 'AM';

  if (hh === 0) {
    hh = 12;
  }
  if (hh > 12) {
    hh -= 12;
    session = 'PM';
  }

  const hour = hh < 10 ? `0${hh}` : `${hh}`;
  const minute = mm < 10 ? `0${mm}` : `${mm}`;
  const second = ss < 10 ? `0${ss}` : `${ss}`;

  return { date, hour, minute, second, session };
};

export default getTime;
