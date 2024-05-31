export const getDate = (date:number) => {
    let correctDate;
    const nowDate = Date.now() / 1000;
    let exactDate = Math.ceil((nowDate - date) / 60);
    let unit = "";
    if (exactDate > 4) {
      unit = "minutes";
    }
    
    if (exactDate > 60 && exactDate < 1440) {
          exactDate = Math.round(exactDate / 60);
          unit = "hours";
    }
  
    if (exactDate > 1440 && exactDate < 43200) {
      exactDate = Math.round(exactDate / 1440);
      unit = "days";
    }
  
    if (exactDate > 1440 && exactDate > 43200) {
      exactDate = Math.round(exactDate / 43200);
      unit = "month";
    }
  
    correctDate =
      unit === "" ?  "moments ago" : exactDate + " " + unit + " ago";
    return correctDate;
  };