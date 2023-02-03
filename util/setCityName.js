export function setCityName({ from, to }) {
  let fromCityName = "";
  let toCityName = "";
  switch (from) {
    case "MHD":
      fromCityName = "مشهد";
      break;
    case "THR":
      fromCityName = "تهران";
      break;
    case "AWZ":
      fromCityName = "اهواز";
      break;
    case "SYZ":
      fromCityName = "شیراز";
      break;
    case "BND":
      fromCityName = "بندرعباس";
      break;
    case "KIH":
      fromCityName = "کیش";
      break;
  }
  switch (to) {
    case "MHD":
      toCityName = "مشهد";
      break;
    case "THR":
      toCityName = "تهران";
      break;
    case "AWZ":
      toCityName = "اهواز";
      break;
    case "SYZ":
      toCityName = "شیراز";
      break;
    case "BND":
      toCityName = "بندرعباس";
      break;
    case "KIH":
      toCityName = "کیش";
      break;
  }
  return { fromCityName, toCityName };
}
