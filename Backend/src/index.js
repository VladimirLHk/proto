// const arr = [1, 2, 3, 4, 5];
// const result = arr.map(value => value * 2);
// console.log(result);


import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
// import PostModel from './Model/Post';
import PostController from './Controllers/PostController';
const PostOperator = new PostController();
import FileController from './Controllers/FileController';
const TextController = new FileController();
import cors from 'cors';
import fs from 'fs';
import https from 'https';

// let options = {
//   key: fs.readFileSync('server-key.pem'),
//   cert: fs.readFileSync('server-cert.pem'),
//   requestCert: true
// };
// let server = https.createServer(options, app);
// server.listen(3333, () =>
//   console.log(`Listening on port 3333`)
// );


const app = express();
// mongoose.connect('mongodb://localhost/blog');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/file', TextController.update);
app.get('/file', TextController.getLexicon);
app.get('/posts', PostOperator.index);
app.post('/posts', PostOperator.create);
app.get('/posts/:id', PostOperator.read);
app.delete('/posts/:id', PostOperator.delete);
app.put('/posts/:id', PostOperator.update);

app.listen(3333, () =>
  console.log(`Listening on port 3333`));





//
// const Cat = mongoose.model('Cat', {name:String});
//
// const kitty = new Cat({name:'Bob'});
// kitty.save().then(()=>console.log('Hi'));

// const express = require('express');
// const bodyParser = require('body-parser');
//
// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
//
// const posts = [
//   {
//     title:"Hello world",
//     text: "kjldklajsh adlfjka fla sfasdfhpruh fqrqpquh qwefhqdjqh qqoefqhp"
//   },
//   {
//     title:"Hello world1",
//     text: "kjldklasdf a adfl a; dfajsh adlfjka fla sfasdfhpruh fqrqpquh qwefhqdjqh qqoefqhp"
//   },
//   {
//     title:"Hello world2",
//     text: "kasdf a  sdf asdpf sd jldklajsh adlfjka fla sfasdfhpruh fqrqpquh qwefhqdjqh qqoefqhp"
//   },
//   {
//     title:"Hello world3",
//     text: "aldif  ad;f asd fpier[rj a;f hprfh aosdn fq98hf9in ;aid kjldklajsh adlfjka fla sfasdfhpruh fqrqpquh qwefhqdjqh qqoefqhp"
//   },
// ];
//
// app.get('/posts', function(req, res) {
//   return res.send(posts);
// });
//
// app.get('/posts/:id', function(req, res) {
//   const id = req.params.id;
//   return res.send(posts[id]);
// });
//
// app.post('/posts', function(req, res) {
//   const data = req.body;
//   console.log("data:", data);
//   posts.push(data);
//   return res.send(posts);
// });
//
// app.listen(3333, () => console.log(`Listening on port 3333`));
