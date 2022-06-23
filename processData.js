const fs = require("fs");

// ten skrypt był użyty żeby uporządkować i pogrupować dane według nazwy surowca

let dataProcessed = {
    data: {},
    keys: []
};
fs.readFile(
  "/Users/mati/Downloads/commodity-prices.json",
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const dane = JSON.parse(data);
    dane.forEach((element) => {
      const { date, price_index, commodity } = element.fields;
      if (dataProcessed.data[element.fields.commodity]) {
        dataProcessed.data[element.fields.commodity].push({
          date,
          priceIndex: price_index,
          commodity,
        });
      } else {
        dataProcessed.data[element.fields.commodity] = [
          { date, priceIndex: price_index, commodity },
        ];
      }
    });

    dataProcessed.keys = Object.keys(dataProcessed.data);
    dataProcessed.data = dataProcessed.keys.map((key, i) => ({name: key,id: i, records: dataProcessed.data[key]}));
    fs.writeFile("./output.json", JSON.stringify(dataProcessed), (err) =>
      console.log(err)
    );
  }
);
