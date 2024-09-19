const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Post = require('./post');

const LikeComment = sequelize.define('LikeComment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    isLiked: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'likes_comments',
    timestamps: false
});




Post.hasMany(LikeComment, { foreignKey: 'postId' });
LikeComment.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(LikeComment, { foreignKey: 'userId' });
LikeComment.belongsTo(User, { foreignKey: 'userId' });


module.exports = LikeComment;
