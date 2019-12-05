import PostModel from "../Model/Post";

class PostController {
  index(req, res) {
    const data = req.body;
    const dataParams = req.params;

    console.log(data, dataParams);
    PostModel.find().then((err, posts) => {
      if (err) {
        res.send(err);
        return
      }
      res.json(posts);
    })
  }

  create(req, res) {
    const data = req.body;
    const dataParams = req.params;

    console.log(data, dataParams);

    const post = new PostModel ({
      title: data.title,
      text: data.text,
    });

    post.save().then(() => {
      res.send({ status:'OK'});
    });

  }

  read(req, res) {
    PostModel.findOne({_id: req.params.id})
      .then(post => {
        if (!post) {
          res.send({error: 'not found'})
        } else {
          res.json(post)
        }
    })
  }

  update(req, res) {
    const data = req.body;
    const dataParams = req.params;

    console.log(data, dataParams);
    PostModel.findByIdAndUpdate(req.params.id, {$set: req.body}, err => {
      if (err) {
        res.send(err);
        return
      }

      res.json({status: "updated"})

    });
  }

  delete(req, res) {
    const data = req.body;
    const dataParams = req.params;

    console.log(data, dataParams);
    PostModel.remove({
      _id: req.params.id
    }).then(post => {
      if (post) {
        res.json({status: "deleted"})
      } else {
        res.json({status: "error"})
      }
    })
  }
}

export default PostController;