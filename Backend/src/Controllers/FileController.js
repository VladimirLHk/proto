const fs = require('fs');

class TextController {
  update(req, res) {
    const data = req.body;
    console.log(data);

    fs.appendFile("file.tmp", data.test, function(err){
      if(err) {
        console.error(err);
        res.send({error: 'something wrong'})
      } else {
        res.send({ status:'OK'});
      }
    })
  }

  getLexicon(req, res) {

    // fs.readFile("file.tmp", function(err){
    //   if(err) {
    //     console.error(err);
    //     res.send({error: 'something wrong'})
    //   } else {
    //     res.send({ status:'OK'});
    //   }
    // })
    res.json({text: '1 Детство и воспитание'})
  }

}

export default TextController

