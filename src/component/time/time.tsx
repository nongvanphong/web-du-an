import { useEffect, useState } from "react";
import { format } from "date-fns";
import viLocale from "date-fns/locale/vi";
export default function Time() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formattedDateTime = format(
    currentDateTime,
    "eeee, d MMMM yyyy HH:mm:ss",
    { locale: viLocale }
  );

  return (
    <div>
      <h1>
        <b>{formattedDateTime}</b>
      </h1>
    </div>
  );
}
