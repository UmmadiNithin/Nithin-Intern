const Post = require('../models/post');
const LikeComment=require('../models/LikeComment');
const Categories=require('../models/category');
const  User= require('../models/user');
const { post } = require('../routes/authRoutes');
const { Op } = require('sequelize'); 
const { createPostSchema, updatePostSchema,searchPostSchema } = require('../validations/postvalidations'); 



const createPost = async (req, res) => {
    try {
        const { title, description, categoryId } = req.body; 

        const { error } = createPostSchema.validate({
            title,
            description,
            categoryId,
            image: req.files ? req.files.image : null  
        });

        if (error) {
            return res.status(400).json({
                result: {},
                message: error.details[0].message,
                status: 'error',
                responseCode: 400
            });
        }

        if (!req.files || !req.files.image) {
            return res.status(400).json({
                result: {},
                message: 'No file uploaded',
                status: 'error',
                responseCode: 400
            });
        }

        const file = req.files.image; 
        const base64Image = file.data.toString('base64');
        const imageBuffer = Buffer.from(base64Image, 'base64');

        const post = await Post.create({
            userId: req.user.id,
            title: title,
            description: description,
            image: imageBuffer,
            categoryId: categoryId
        });

        return res.status(201).json({
            result: post,
            message: 'Post created successfully',
            status: 'success',
            responseCode: 201
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({
            result: {},
            message: 'Error uploading file',
            status: 'error',
            responseCode: 500
        });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: Categories,
                as: 'category', 
                attributes: ['categoryName']
            }
        });

        const postsWithBase64Images = posts.map(post => ({
            ...post.toJSON(),
            image: post.image ? post.image.toString('base64') : null
        }));

        return res.status(200).json({
            result: postsWithBase64Images,
            message: 'Posts fetched successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({
            result: {},
            message: 'Error fetching posts',
            status: 'error',
            responseCode: 500
        });
    }
};


const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findByPk(postId, {
            include: {
                model: Categories,
                as: 'category', 
                attributes: ['categoryName'] 
            }
        });

        if (!post) {
            return res.status(404).json({
                result: {},
                message: 'Post not found',
                status: 'error',
                responseCode: 404
            });
        }

        const postWithBase64Image = {
            ...post.toJSON(),
            image: post.image ? post.image.toString('base64') : null
        };

        return res.status(200).json({
            result: postWithBase64Image,
            message: 'Post fetched successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (error) {
        console.error('Error fetching post:', error);
        return res.status(500).json({
            result: {},
            message: 'Error fetching post',
            status: 'error',
            responseCode: 500
        });
    }
};


const editPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const { id: userId } = req.user;
        const { title, description, categoryId } = req.body;
        const imageFile = req.files?.image;

        const { error } = updatePostSchema.validate({
            title,
            description,
            categoryId,
            image: imageFile
        });

        if (error) {
            return res.status(400).json({
                result: {},
                message: error.details[0].message,
                status: 'error',
                responseCode: 400
            });
        }

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({
                result: {},
                message: 'Post not found',
                status: 'error',
                responseCode: 404
            });
        }

        if (post.userId !== userId) {
            return res.status(403).json({
                result: {},
                message: 'Sorry, you do not have permission to update this post',
                status: 'error',
                responseCode: 403
            });
        }

        if (title) post.title = title;
        if (description) post.description = description;
        if (categoryId) post.categoryId = categoryId;
        if (imageFile) {
            const base64Image = imageFile.data.toString('base64');
            post.image = Buffer.from(base64Image, 'base64');
        }

        await post.save();

        return res.status(200).json({
            result: post,
            message: 'Post updated successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({
            result: {},
            message: 'Error updating post',
            status: 'error',
            responseCode: 500
        });
    }
};
const deletePostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const { id: userId } = req.user; 

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({
                result: {},
                message: 'Post not found',
                status: 'error',
                responseCode: 404
            });
        }

        if (post.userId !== userId) {
            return res.status(403).json({
                result: {},
                message: 'You do not have permission to delete this post',
                status: 'error',
                responseCode: 403
            });
        }

        await post.destroy();

        return res.status(200).json({
            result: {},
            message: 'Post deleted successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({
            result: {},
            message: 'Error deleting post',
            status: 'error',
            responseCode: 500
        });
    }
};



const Likes_and_Comment = async (req, res) => {
    try {
        const { postId, isLiked, comment } = req.body;

        if (!postId || typeof isLiked === 'undefined') {
            return res.status(400).json({
                result: {},
                message: 'Post ID and isLiked status are required',
                status: 'error',
                responseCode: 400
            });
        }

        const existingLikeComment = await LikeComment.findOne({
            where: {
                userId: req.user.id,  
                postId               
            }
        });

        if (existingLikeComment) {
            existingLikeComment.isLiked = isLiked; 
            existingLikeComment.comment = comment;  
            await existingLikeComment.save();  

            return res.status(200).json({
                result: existingLikeComment,
                message: 'Like/comment updated successfully',
                status: 'success',
                responseCode: 200
            });
        } else {
            const newLikeCommentEntry = await LikeComment.create({
                userId: req.user.id,  
                postId,              
                isLiked,              
                comment               
            });

            return res.status(201).json({
                result: newLikeCommentEntry,
                message: 'Like/comment added successfully',
                status: 'success',
                responseCode: 201
            });
        }
    } catch (error) {
        console.error('Error adding/updating like/comment:', error);
        return res.status(500).json({
            result: {},
            message: 'Error adding/updating like/comment',
            status: 'error',
            responseCode: 500
        });
    }
};

const searchposts = async (req, res) => {
    const { title } = req.query;

    const { error } = searchPostSchema.validate({ title });

    if (error) {
        return res.status(400).json({
            result: {},
            message: error.details[0].message,
            status: 'error',
            responseCode: 400
        });
    }

    try {
      
        const exactMatchPost = await Post.findOne({ 
            where: {
                title: {
                    [Op.iLike]: title  
                }
            }
        });

        const relatedPosts = await Post.findAll({ 
            where: {
                title: {
                    [Op.iLike]: `%${title}%`  
                }
            }
        });

        const formatPost = (post) => ({
            ...post.toJSON(),
            image: post.image ? post.image.toString('base64') : null
        });

        const formattedExactMatchPost = exactMatchPost ? formatPost(exactMatchPost) : null;
        const formattedRelatedPosts = relatedPosts.map(formatPost);

        return res.status(200).json({
            result: {
                exactMatch: formattedExactMatchPost,
                relatedPosts: formattedRelatedPosts.filter(post => !formattedExactMatchPost || post.id !== formattedExactMatchPost.id)
            },
            message: 'Posts fetched successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (err) {
        console.error('Error fetching posts:', err);
        return res.status(500).json({
            result: {},
            message: 'Server error',
            status: 'error',
            responseCode: 500
        });
    }
};
const getLikesAndCommentsCounts = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({
                result: {},
                message: 'Post not found',
                status: 'error',
                responseCode: 404
            });
        }

        const likesCount = await LikeComment.count({
            where: { postId, isLiked: true }
        });

        const comments = await LikeComment.findAll({
            where: { postId, comment: { [Op.ne]: null } }, 
            attributes: ['userId', 'comment'], 
            include: [{
                model: User,
                attributes: ['email']
            }]
        });

        const commentsCount = comments.length;

        return res.status(200).json({
            result: {
                postId,
                likesCount,
                commentsCount,
                comments
            },
            message: 'Likes and comments fetched successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (error) {
        console.error('Error fetching likes and comments:', error);
        return res.status(500).json({
            result: {},
            message: 'Error fetching likes and comments',
            status: 'error',
            responseCode: 500
        });
    }
};


const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;

        if (!categoryName) {
            return res.status(400).json({
                result: {},
                message: 'Category name is required',
                status: 'error',
                responseCode: 400
            });
        }

        const existingCategory = await Categories.findOne({
            where: { categoryName }
        });

        if (existingCategory) {
            return res.status(400).json({
                result: {},
                message: 'Category already exists',
                status: 'error',
                responseCode: 400
            });
        }

        const category = await Categories.create({ categoryName });

        return res.status(201).json({
            result: category,
            message: 'Category created successfully',
            status: 'success',
            responseCode: 201
        });
    } catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({
            result: {},
            message: 'Error creating category',
            status: 'error',
            responseCode: 500
        });
    }
};


const getPostsByUser = async (req, res) => {
    const userId = req.user?.id;
    console.log('====================================');
    console.log(userId);
    console.log('====================================');

    if (!userId) {
        return res.status(400).json({
            result: {},
            message: 'User ID is required from the token',
            status: 'error',
            responseCode: 400
        });
    }

    try {
        const posts = await Post.findAll({
            where: { userId },
            include: {
                model: Categories,
                as: 'category', 
                attributes: ['categoryName']
            }
        });

        if (posts.length === 0) {
            return res.status(404).json({
                result: {},
                message: 'No posts found for the given user ID',
                status: 'error',
                responseCode: 404
            });
        }

        const postsWithBase64Images = posts.map(post => ({
            ...post.toJSON(),
            image: post.image ? post.image.toString('base64') : null
        }));

        return res.status(200).json({
            result: postsWithBase64Images,
            message: 'Posts retrieved successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (err) {
        console.error('Error retrieving posts by user:', err);
        return res.status(500).json({
            result: {},
            message: 'Server error',
            status: 'error',
            responseCode: 500
        });
    }
};


module.exports = {
    createPost,
    getAllPosts,
    editPostById,
    deletePostById,
    getPostById,
    searchposts,
    Likes_and_Comment,
    getLikesAndCommentsCounts,
    createCategory ,
    getPostsByUser 
    
};
