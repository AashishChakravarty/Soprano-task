//NOTE SUB-ROUTING ROUTES
var router = require('express').Router();

module.exports = function () {
  const post = require('../controllers/post');

  router.post('/', post.create);

  router.get('/', post.posts);

  router.get('/:id', post.postById);

  router.delete('/:id', post.deletePost);

  router.put('/:id', post.updatePost);

  router.put('/like/:id', post.likePost);

  router.delete('/like/:id', post.deletelikePost);

  router.put('/comment/:id', post.commentPost);

  router.delete('/comment/:id', post.deleteCommentPost);

  return router;
};
