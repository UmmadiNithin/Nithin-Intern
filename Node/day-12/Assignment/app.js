const express = require('express');
const app = express();
const sequelize = require('./config/database'); 
const authRoutes = require('./routes/authRoutes');

app.use(express.json());


app.use('/auth', authRoutes);


sequelize.sync({ force: true }) 
  .then(() => {
    console.log('Database synchronized');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
