const express = require("express");
const peronJsonData = require("./mock/personJsonData");
const xml2js = require("xml2js");
const cors = require("cors");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

function getXmlData() {
  const file = fs.readFileSync("./mock/personXmlData.xml");
  return Buffer.from(file).toString();
}

function getFormattedJsonDataFromXml() {
  let json = {};
  xml2js.parseString(
    getXmlData(),
    {
      mergeAttrs: true,
      explicitArray: false,
    },
    (err, result) => {
      json = result;
    }
  );
  return json;
}

const getParsedXmlToJsonPersons = async () => {
  let dataFromXml = await getFormattedJsonDataFromXml().persons;
  dataFromXml = dataFromXml.person.map((i) => ({ ...i, id: parseInt(i.id) }));
  console.log("dataFromXml", dataFromXml);
  return dataFromXml;
};

app.get("/getJsonPersons", (req, res) => {
  console.log("peronJsonData.person", peronJsonData.person);
  res.json(peronJsonData.person);
});

app.get("/getXmlPersons", async (req, res) => {
  const data = await getParsedXmlToJsonPersons();
  res.json(data);
});

app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);
});
