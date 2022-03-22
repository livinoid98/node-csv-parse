const express = require("express");
const fs = require("fs");
const csv = require("csvtojson");
const converter = require("json-2-csv");
const app = express();

app.get("/", (req, res, next) => {
  res.send("person");
});

app.get("/:groupIdx", async (req, res) => {
  try {
    const member = await csv().fromFile("./csv/member.csv");
    member.push({
      name: "유소연",
      groupIdx: "2",
    });
    converter.json2csv(member, (err, result) => {
      if (err) throw err;
      fs.writeFileSync("./csv/result.csv", result);
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, (req, res) => {
  console.log("server start on 3000 port");
});
