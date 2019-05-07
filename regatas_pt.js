let axios = require("axios");
let cheerio = require("cheerio");
var chunk = require("chunk-text");
let fs = require("fs");

let url = "http://backoffice.fpvela.pt:8080/competitions/";

axios.get(url).then(
  response => {
    if (response.status === 200) {
      var html = response.data;
      let $ = cheerio.load(html);
      var regatas = [];
      var dataInicio = "";

      /* $('#calendar .days td div').each(...);
      <table id="calendar">
                        <tr class="header"> ... </tr>
                        <tr class="days">
                            <td><!-- schedule for Monday --></td>
                            <td><!-- schedule for Tuesday --></td>
                            <td><!-- schedule for Wednesday --></td>
                            <td><!-- schedule for Thursday --></td>
                            <td><!-- schedule for Friday --></td>
                            <td><!-- schedule for Saturday --></td>
                            <td><!-- schedule for Sunday --></td>
                        </tr>
                        <tr class="footer"> ... </tr>
                    </table> */

      $("div").each(function(i, elem) {
        regatas[i] = {
          title: $(this)
            .children()
            .text()
            .trim()
        };
        console.log("N - " + i + " T : " + regatas[i].title);
      });

      /* $("#table .choosable td div").each(function(i, elem) {
        regatas[i] = {
          title: $(this)
            .text()
            .trim(),
          cla: $(this)
            .children()
            .text()
            .trim(),
          dates: $(this)
            .children()
            .children()
            .text()
            .trim()
        };
        console.log(regatas[i].title);
      });
 */

      var pos = regatas.indexOf("");
      fs.writeFile(
        "./json/regatas_pt.json",
        JSON.stringify(regatas, null, 4),
        err => {
          console.log("Com Sucesso!");
        }
      );
    }
  },
  error => console.log(error)
);
