export const getCurrentTimestamp = () => {
  const dt = new Date();

  let year = dt.getFullYear();
  let month = ("0" + (dt.getMonth() + 1)).slice(-2);
  let day = ("0" + dt.getDate()).slice(-2);
  let hour = dt.getHours();
  let minute = dt.getMinutes();
  let seconds = dt.getSeconds();

  return year + "-" + month + "-" + day + "_" + hour + "-" + minute + "-" + seconds;
}
