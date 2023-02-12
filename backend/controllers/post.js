const Post = require("../models/post");
const FeaturedPost = require("../models/featuredPost");
const cloudinary = require("../cloud");
const { isValidObjectId } = require("mongoose");
const post = require("../models/post");

// add post to featured post
const addToFeaturedPost = async (postId) => {
  const isAlreadyExists = await FeaturedPost.findOne({ post: postId });
  if (isAlreadyExists) return;
  const featuredPost = new FeaturedPost({ post: postId });
  await featuredPost.save();
  const FEATURED_POST_COUNT = 6;
  const featuredPosts = await FeaturedPost.find({}).sort({ createdAt: -1 });
  featuredPosts.forEach(async (post, index) => {
    if (index >= FEATURED_POST_COUNT)
      await featuredPost.findByIdAndDelete(post._id);
  });
};
//delete post from featured post
const removeFromFeaturedPost = async (postId) => {
  await FeaturedPost.findOneAndDelete({ post: postId });
};
//check is the post is featured or not
const isFeaturedPost = async (postId) => {
  const post = await FeaturedPost.findOne({ post: postId });
  return post ? true : false;
};
exports.createPost = async (req, res) => {
  const { title, meta, content, slug, tags, author, featured } = req.body;
  const isAlreadyExists = await Post.findOne({ slug });
  if (isAlreadyExists)
    return res.status(401).json({ error: "Please use unique slug" });
  const { file } = req;
  const newPost = new Post({ title, meta, content, slug, tags, author });
  if (file) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      file.path
    );

    newPost.thumbnail = { url, public_id };
  }

  await newPost.save();
  if (featured) await addToFeaturedPost(newPost._id);
  res.json({
    post: {
      id: newPost._id,
      title,
      content,
      thumbnail: newPost?.thumbnail?.url,
      meta,
      author: newPost.author,
      slug,
      tags,
    },
  });
};

exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  if (!isValidObjectId(postId)) {
    return res.status(401).json({ error: "Invalid request" });
  }
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  const public_id = post?.thumbnail?.public_id;
  if (public_id) {
    const { result, error } = await cloudinary.uploader.destroy(public_id);
    if (result !== "ok") {
      return res.status(404).json({ error: "Could not remove thumbnail" });
    }
  }
  await Post.findByIdAndDelete(postId);
  await removeFromFeaturedPost(postId);
  res.json({ message: "Post removed successfully" });
};

exports.updatePost = async (req, res) => {
  const { title, meta, content, slug, tags, author, featured } = req.body;
  const { file } = req;
  const { postId } = req.params;
  if (!isValidObjectId(postId)) {
    return res.status(401).json({ error: "Invalid request" });
  }
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const public_id = post?.thumbnail?.public_id;
  if (public_id && file) {
    const { result, error } = await cloudinary.uploader.destroy(public_id);
    if (result !== "ok") {
      return res.status(404).json({ error: "Could not remove thumbnail" });
    }
  }

  if (file) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      file.path
    );

    post.thumbnail = { url, public_id };
  }
  post.title = title;
  post.meta = meta;
  post.content = content;
  post.slug = slug;
  post.tags = tags;
  post.author = author;
  if (featured) await addToFeaturedPost(post._id);
  else await removeFromFeaturedPost(post._id);
  await post.save();
  res.json({
    post: {
      id: post._id,
      title,
      content,
      thumbnail: post?.thumbnail?.url,
      meta,
      author: post.author,
      slug,
      tags,
      featured,
    },
  });
};

exports.getPost = async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    return res.status(401).json({ error: "Invalid request" });
  }
  const post = await Post.findOne({ slug });
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  const { title, meta, content, tags, author, createdAt } = post;
  const featured = await isFeaturedPost(post._id);
  res.json({
    post: {
      id: post._id,
      title,
      content,
      thumbnail: post?.thumbnail?.url,
      meta,
      author,
      slug,
      tags,
      featured,
      createdAt,
    },
  });
};

exports.getFeaturedPosts = async (req, res) => {
  const featuredPosts = await FeaturedPost.find({})
    .sort({ createdAt: -1 })
    .populate("post");
  res.json({
    posts: featuredPosts.map(({ post }) => {
      return {
        id: post._id,
        title: post.title,
        content: post.content,
        thumbnail: post?.thumbnail?.url,
        meta: post.meta,
        author: post.author,
        slug: post.slug,
      };
    }),
  });
};

exports.getPosts = async (req, res) => {
  const { pageNo = 0, limit = 9 } = req.query;
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .skip(parseInt(pageNo) * parseInt(limit))
    .limit(parseInt(limit));

    const postCount = await Post.countDocuments()
    .sort({ createdAt: -1 })
  res.json({
    posts: posts.map((post) => {
      return {
        id: post._id,
        title: post.title,
        content: post.content,
        thumbnail: post?.thumbnail?.url,
        meta: post.meta,
        author: post.author,
        slug: post.slug,
        tags: post.tags,
        createdAt: post.createdAt,
      };
    }),
    postCount
  });
};

exports.searchPost = async (req, res) => {
  const { title } = req.query;
  if (!title.trim()) {
    return res.status(401).json({ error: "Search query is missing" });
  }
  const posts = await Post.find({ title: { $regex: title, $options: "i" } });
  res.json({
    posts: posts.map((post) => {
      return {
        id: post._id,
        title: post.title,
        content: post.content,
        thumbnail: post?.thumbnail?.url,
        meta: post.meta,
        author: post.author,
        slug: post.slug,
        tags: post.tags,
        createdAt: post.createdAt,
      };
    }),
  });
};

exports.getRelatedPosts = async (req, res) => {
  const { postId } = req.params;
  if (!isValidObjectId(postId))
    return res.status(401).json({ error: "invalid request" });

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: "Post not found" });

  const relatedPosts = await Post.find({
    tags: { $in: [...post.tags] },
    _id: { $ne: post._id },
  })
    .sort({ createdAt: -1 })
    .limit(5);

  res.json({
    posts: relatedPosts.map((post) => {
      return {
        id: post._id,
        title: post.title,
        content: post.content,
        thumbnail: post?.thumbnail?.url,
        meta: post.meta,
        author: post.author,
        slug: post.slug,
        tags: post.tags,
      };
    }),
  });
};

exports.uploadImage = async (req, res) => {
  const { file } = req;
  if (!file) return res.status(401).json({ error: "Image file is missing!" });

  const { secure_url: url } = await cloudinary.uploader.upload(file.path);

  res.status(201).json({ image: url });
};
