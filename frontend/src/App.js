import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050'

const App = () => {
  const [ word, setWord ] = useState('');
  const [ images, setImages ] = useState([]);

  // console.log(images);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // console.log('sending fetch request');   

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{...res.data, title: word }, ...images]);
    }
    catch (error) {
      console.log(error)
    }

    // console.log('clearing search form')
    setWord('');
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter(( image ) => image.id !== id ));
  };
 
  return (
    <div>
      <Header title="Images Gallery"/>
      <Search word = { word } setWord = { setWord } handleSubmit={ handleSearchSubmit }/>
      {/* { !!images.length && <ImageCard  image={images[0]} />} */}      
      <Container className='mt-4'>
        { images.length ? (
          <Row xs={1} md={2} lg={3}>
            { images.map((image, i) => (
              <Col className="pb-4" key={i}><ImageCard image={image} deleteImage={handleDeleteImage} /></Col> 
            ))}
          </Row>
        ) : (
          <Welcome />
        )}        
      </Container>      
    </div>
  );
}

export default App;
