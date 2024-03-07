import React from "react";
import { Jumbotron, Button } from "react-bootstrap";

const Welcome = () => {
  return(
  <Jumbotron>
    <h1>Images Gallery</h1>
    <p>
      This is a simple react app, that retrieves photos from Unsplash
    </p>
    <Button variant="primary" href="https://unsplash.com" target="_blank">Learn More</Button>
  </Jumbotron>
  );
}

export default Welcome;