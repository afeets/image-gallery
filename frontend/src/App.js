import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import Spinner from './components/Spinner';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050'

const App = () => {
  const [ word, setWord ] = useState('');
  const [ images, setImages ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  // retrieve images from mongo db when loading page
  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const res = await axios.get(`${API_URL}/images`,{
          headers: {
            'Accept': 'application/json'
          }
        });
        setImages(res.data || []);
        setLoading(false);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);


  // retrieve from Unsplash and add to images array
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

  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id){
        setImages(images.filter(( image ) => image.id !== id ));
      }
    } catch (error){
      console.log(error);
    }
  };
 

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;

    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) => image.id === id ? {...image, saved: true} : image)
        )
      };
    } 
    catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <Header title="Images Gallery"/>
      { loading ? <Spinner /> : <>
      <Search word = { word } setWord = { setWord } handleSubmit={ handleSearchSubmit }/>      
      <Container className='mt-4'>
        { images.length ? (
          <Row xs={1} md={2} lg={3}>
            { images.map((image, i) => (
              <Col className="pb-4" key={i}><ImageCard image={image} deleteImage={handleDeleteImage} saveImage={handleSaveImage} /></Col> 
            ))}
          </Row>
        ) : (
          <Welcome />
        )}        
      </Container>
      </>
      }      
    </div>
  );
}

export default App;
