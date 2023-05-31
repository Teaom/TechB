const router = require('express').Router();
const { Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
    try {
      const comments = await Comment.findAll({
        postId:req.params.id,
      });
 
      console.log(comments, "Test")
     const cleanComments = comments.map((comment) => comment.get({ plain: true }));
     
     console.log('comments testing', cleanComments)
      res.render('singlePost', { 
        cleanComments,
      });
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  });

  module.exports = router;