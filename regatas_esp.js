let axios = require("axios");
let cheerio = require("cheerio");
var chunk = require("chunk-text");
let fs = require("fs");

let url = "http://www.rfev.es/default/regatas/calendario/month/06/year/2019";

axios.get(url).then(
  response => {
    if (response.status === 200) {
      var html = response.data;
      let $ = cheerio.load(html);
      var regatas = [];
      var dataInicio = "";

      $(".sixteen").each(function(i, elem) {
        regatas[i] = {
          title: $(this)
            .find("h3.title")
            .text()
            .trim(),
          dates: $(this)
            .find(".race-date")
            .text()
            .trim(),
          icon: $(this)
            .find("img")
            .attr("src"),
          cla: $(this)
            .find(".sailclass-icons ")
            .children()
            .attr("title")
        };
      });
      var pos = regatas.indexOf("");
      fs.writeFile(
        "./json/regatas_junho_esp.json",
        JSON.stringify(regatas, null, 4),
        err => {
          console.log("Com Sucesso!");
        }
      );
    }
  },
  error => console.log(error)
);
