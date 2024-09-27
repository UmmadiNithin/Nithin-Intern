
import React from 'react';
import CustomButton from './components/CustomButton';
import ImageCard from './components/ImageCard';
import HomePage from './components/HomePage'; 


function App() {
  return (
    <div>
      <h1><center>3.Create a simple HTML page using styled-components in react app</center></h1>
      <hr />
      <HomePage /><hr/>
      
      <h1><center>1.Using styled- components, create a custom button with different styles</center></h1>
      <CustomButton /><hr/>

      <h1><center>2.Create a card that contains an image and its description.</center></h1>
      <ImageCard 
        imageSrc="/images/pexels-photo-13539516.jpeg" 
        description="This is a description of the image displayed above." 
      />

    </div>
   
  );
}

export default App;
