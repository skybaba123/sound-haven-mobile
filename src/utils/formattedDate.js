import Intl from "intl";
import "intl/locale-data/jsonp/en";

export const formattedTime = (timeInMillis) => {
  const totalSeconds = Math.floor(timeInMillis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const formattedDate = (date) => {
  try {
    const parsedDate = Date.parse(date);

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formatted = new Intl.DateTimeFormat("en-US", options).format(
      parsedDate
    );
    return formatted;
  } catch (error) {
    return error.message;
  }
};

export default formattedDate;
