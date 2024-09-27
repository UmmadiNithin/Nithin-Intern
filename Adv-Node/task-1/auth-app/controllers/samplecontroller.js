const Post = require('../models/post');

const createPost = async (req, res) => {
    const userId = req.user?.id;
    const { title, description } = req.body;
    const imageFile = req.files?.image;

    console.log('Processing POST request...');
    console.log('User ID:', userId);
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Image File:", imageFile);

    try {
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        if (!imageFile) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const post = await Post.create({
            userId: userId,
            title: title,
            description: description || '',
            image: imageFile.data 
        });

        console.log('Post created:', post);
        res.status(201).json({
            message: 'Post created successfully',
            post
        });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

module.exports = {
    createPost
};
