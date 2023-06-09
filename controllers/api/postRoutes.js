const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  console.log("making a post")
  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  console.log("hit delete endpoint")
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  console.log("post route hit", req.body)
  try {
      const postData = await Post.update(req.body, {
        where:{id:req.params.id}

      } )
      // });
  
      // const posts = postData.put({ plain: true });
      // res.render('editpost', {
      //   posts,
      // });
    } catch (err) {
      console.log("error", err)
      res.status(500).json(err);
    }
});

module.exports = router;
