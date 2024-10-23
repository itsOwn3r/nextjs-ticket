export const getDate = (date:number) => {
    let correctDate;
    const nowDate = Date.now() / 1000;
    let exactDate = Math.ceil((nowDate - date) / 60);
    let unit = "";
    if (exactDate < 6) {
      unit = "";
    } else if (exactDate < 59) {
      unit = "minutes";
    } else if (exactDate > 60 && exactDate < 1440) {
          exactDate = Math.round(exactDate / 60);
          if (exactDate === 1) {
            unit = "hour";
          } else {
            unit = "hours";
          }
    } else if (exactDate > 1440 && exactDate < 43200) {
      exactDate = Math.round(exactDate / 1440);
      if (exactDate === 1) {
        unit = "day";
      } else {
        unit = "days";
      }
    } else if (exactDate > 1440 && exactDate < 518000) {
      exactDate = Math.round(exactDate / 43200);
      if (exactDate === 1) {
        unit = "month";
      } else {
        unit = "months";
      }
    } else if (exactDate > 43200) {
      exactDate = Math.round(exactDate / 518000);
      if (exactDate === 1) {
        unit = "year";
      } else {
        unit = "years";
      }
    }
  
    correctDate =
      unit === "" ?  "moments ago" : exactDate + " " + unit + " ago";
    return correctDate;
  };