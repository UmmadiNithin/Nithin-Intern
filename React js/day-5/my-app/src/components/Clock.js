// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// // Styled component for the clock
// const ClockContainer = styled.div`
//   font-family: 'Arial', sans-serif;
//   font-size: 2rem;
//   color: #333;
//   text-align: center;
//   margin: 20px;
// `;

// const Clock = () => {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTime(new Date());
//     }, 1000); // Update time every second

//     return () => clearInterval(timer); // Clean up on component unmount
//   }, []);

//   const formatTime = (date) => {
//     const hours = date.getHours().toString().padStart(2, '0');
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const seconds = date.getSeconds().toString().padStart(2, '0');
//     return `${hours}:${minutes}:${seconds}`;
//   };

//   return (
//     <ClockContainer>
//       {formatTime(time)}
//     </ClockContainer>
//   );
// };

// export default Clock;
