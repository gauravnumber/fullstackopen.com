import React from "react";
import ReactDOM from "react-dom";
// import PropTypes from "prop-types";

// interface WelcomeProps {
//   name: string;
// }

// const Welcome = (props: WelcomeProps) => {
const Welcome = ({ name }: { name: string }) => {
  return <h1>Hello, {name}</h1>;
};

// Welcome.propTypes = {
//   name: PropTypes.string
// };

const element = <Welcome name="Sara" />;
ReactDOM.render(element, document.getElementById("root"));

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
