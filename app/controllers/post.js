const post = require('../models/post');
const upload = require('../helpers/upload');

const create = (req, res) => {
  const images = req.files.map(file => file.filename);

  const postData = {
    title: req.body.title,
    description: req.body.description,
    images,
    likes: [],
    comments: [],
    created_by: req.userData._id,
    created_at: new Date(),
  }
  post.create(postData, (err, result) => {
    if (err) {
      res.status(400).json({
        status: false,
        message: 'Failed to create the Post',
      });
    } else {
      res.status(200).json({
        status: true,
        message: 'Post Successfully Created',
        data: result,
      });
    }
  }
  );
};

const posts = (req, res) => {
  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 20;
  post
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ created_at: -1 })
    .then((result) => {
      res.status(200).json({
        status: true,
        message: 'Successfully Fetched',
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: 'Something went to Wrong',
      });
    });
};

const postById = (req, res) => {
  const id = req.params.id;

  post
    .findById({ _id: id })
    .sort({ created_at: -1 })
    .then((result) => {
      res.status(200).json({
        status: true,
        message: 'Successfully Fetched',
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: 'Something went to Wrong',

      });
    });
};

const deletePost = (req, res) => {
  const id = req.params.id;
  const userId = req.userData._id;

  post
    .findOneAndRemove({ _id: id, created_by: userId })
    .then((result) => {
      res.status(200).json({
        status: true,
        message: 'Successfully Deleted',
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: 'Something went to Wrong',
      });
    });
};

const updatePost = (req, res) => {
  const id = req.params.id;
  const userId = req.userData._id;
  const images = req.files.map(file => file.filename);

  let postData = {
    title: req.body.title,
    description: req.body.description,
  }

  if (images.length) {
    postData.images = images
  }

  post
    .findOneAndUpdate(
      { _id: id, created_by: userId },
      postData,
      { new: true }
    )
    .then((result) => {
      res.status(200).json({
        status: true,
        message: 'Successfully Updated',
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: 'Something went to Wrong',
      });
    });
};

const likePost = (req, res) => {
  const id = req.params.id;

  const like = {
    userId: req.userData._id,
    liked_at: new Date(),
  };

  post
    .findOneAndUpdate(
      { _id: id },
      { $push: { likes: like } },
      { new: true }
    )
    .then((result) => {
      res.status(200).json({
        status: true,
        message: 'You like the post',
        data: result
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: 'Something went to Wrong',
      });
    });
};

const deletelikePost = (req, res) => {
  const id = req.params.id;

  const like = {
    userId: req.userData._id,
  };

  post
    .findOneAndUpdate(
      { _id: id },
      { $pull: { likes: like } },
      { new: true }
    )
    .then((result) => {
      res.status(200).json({
        status: true,
        message: 'Your Like is removed',
        data: result
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: 'Something went to Wrong',
      });
    });
};

const commentPost = (req, res) => {
  const id = req.params.id;

  const comment = {
    userId: req.userData._id,
    comment: req.body.comment,
    commented_at: req.body.date || new Date(),
  };

  post
    .findOneAndUpdate(
      { _id: id },
      { $push: { comments: comment } },
      { new: true }
    )
    .then((result) => {
      res.status(200).json({
        status: true,
        message: 'You commented on the post',
        data: result
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: 'Something went to Wrong',
      });
    });
};

const deleteCommentPost = (req, res) => {
  const id = req.params.id;

  const comment = {
    commented_at: req.body.date,
  };
  post
    .findOneAndUpdate(
      { _id: id },
      { $pull: { comments: comment } },
      { new: true }
    )
    .then((result) => {
      res.status(200).json({
        status: true,
        message: 'Your comment is deleted',
        data: result
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: 'Something went to Wrong',
      });
    });
};

const uploadFiles = (req, res, next) => {
  const uploadImg = upload.array('images', 3);
  uploadImg(req, res, function (err, some) {
    if (err) {
      return res.status(400).json({
        status: false,
        message: err.message,
      });
    } else {
      return next();
    }
  })
}

module.exports = {
  create,
  posts,
  postById,
  deletePost,
  updatePost,
  likePost,
  deletelikePost,
  commentPost,
  deleteCommentPost,
  uploadFiles
};
