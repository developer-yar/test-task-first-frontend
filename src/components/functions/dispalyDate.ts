import moment from "moment";

export const displayDate = (date: Date): string =>
  moment(date).format("DD.MM.YYYY HH:mm:ss");
