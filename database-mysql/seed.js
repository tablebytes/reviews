const db = require('./index.js');
const Blog = require('./Blog.js');

const samplePosts = [
  {
    title: 'Chatty Cat Tells Long Yarn',
    author: 'Tae Sung Kim',
    imageUrl: 'https://source.unsplash.com/1600x900/?cat',
    createdAt: '2017-11-14T05:57:26.037Z',
    body: 'It was discovered yesterday that a stray cat found on the streets of Oakland, California by local animal shelter officials possesses the ability to talk. According to a volunteer at the animal shelter who asked to remain anonymous the cat, lovingly dubbed Chatty Catherine or Chatty Cat for short by shelter staff, remained silent at first when it was brought to the shelter. It was during a routine feeding when an overzealous volunteer engaged in baby talk prompting Chatty Cat to look up from it’s bowl of kibble and respond, “Don’t be patronizing.”',
    views: 214
  }
];

const insertSampleBlogs = function() {
  Blog.create(samplePosts)
    .then(() => db.disconnect());
};

insertSampleBlogs();