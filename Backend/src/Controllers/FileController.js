const fs = require('fs');

export default (req, res) => {
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

