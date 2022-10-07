import React from 'react'
import styled from 'styled-components'
import ImgSlider from './ImgSlider';
import NewDisney from './NewDisney';
import Originals from './Originals';
import Recommends from './Recommends';
import Trending from './Trending';
import Viewers from './Viewers';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../features/movie/movieSlice';
import { selectUserName } from '../features/user/useSlice';
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, getDocs } from 'firebase/firestore'

const Home = () => {
const db = getFirestore()

const moviesRef = collection(db, 'movies')


  const dispatch = useDispatch()
  const userName = useSelector(selectUserName)

  let recommends = []
  let newDisneys = []
  let originals = []
  let trending = []

  useEffect(() => {
    getDocs(moviesRef).then((snapshot) => {
      snapshot.docs.map((doc) => {
        switch(doc.data().type){
          case 'recommend':
            recommends = [...recommends, ({id: doc.id, ...doc.data()})]
            break;
          case 'new':
            newDisneys = [...newDisneys, ({id: doc.id, ...doc.data()})]
            break;
          case 'original':
            originals = [...originals, ({id: doc.id, ...doc.data()})]
            break;
          case 'trending':
            trending = [...trending, ({id: doc.id, ...doc.data()})]
            break;
        }
      })
  //   })

  dispatch(setMovies({
    recommend:recommends,
    newDisney:newDisneys,
    original:originals,
    trending:trending,
    
  }))
}, [userName])}
  )

  return (
    <Container>
        <ImgSlider />
        <Viewers />
        <Recommends />
        <NewDisney />
        <Originals />
        <Trending />
    </Container>
  )
}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home
