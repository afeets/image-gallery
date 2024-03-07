import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { Container, Row, Col } from 'react-bootstrap';


const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

const App = () => {
  const [ word, setWord ] = useState('');
  const [ images, setImages ] = useState([]);

  // console.log(images);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // console.log(word);

    fetch(`https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // create new array to add images 
        // DO NOT USE EXISTING ARRAY

        // add title property to object
        setImages([{...data, title: word}, ...images])
      })
      .catch((err) => {
        console.log(err);
      });
    
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
