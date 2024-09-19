const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes'); 
const samplepost = require('./routes/samplepost'); 
const fileUpload = require('express-fileupload');
const User = require('./models/user');  
const Post = require('./models/post'); 
const LikeComment=require('./models/LikeComment') 
const Categories=require('./models/category')

const app = express();


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(fileUpload()); 

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/sample', samplepost);


app.use((err, req, res, next) => {
    console.error('Middleware error:', err); 
    res.status(500).send('Something broke!');
});

sequelize.sync({ force: false })  
    .then(() => console.log('Database synchronized.'))
    .catch(err => console.log('Error synchronizing database:', err));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
