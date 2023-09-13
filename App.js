import React from "react";
import ReactDOM from "react-dom/client";

const Title = () => ( 
  <h1 className="heading" tabIndex={5}>
    Namaskaram React using JSX 🚀
  </h1>
);

// React functinal component
const HeadingComponent = () => (
  <div id='container'>
    {Title()}
    <Title />
    <Title></Title>
    <h1>Namaskaram React functional component</h1>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<HeadingComponent />);
