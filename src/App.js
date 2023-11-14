import logo from './logo.svg';
import {React, useState, useEffect} from 'react';
import './App.css';
import Joke from './Joke';
import DeckList from './DeckList';
function App() {
const [deck, setDeck] = useState([]);
const [images, setImages] = useState([]);
const [cardsMap, setCardsMap] = useState(new Map());
const [eggs, setEggs] = useState(0);
const [cardsInDeck, setCardsInDeck] = useState(0);
useEffect(() => {
   let imgs = importAll(require.context('./cardthumbnails', false, /\.(png|jpe?g|svg)$/));
   setImages(imgs);
}, []);

function removeEgg(){
  setEggs(eggs - 1);
}
function removeCard(){
  setCardsInDeck(cardsInDeck - 1);
}

function updateDeck(d){
  setDeck([...d]);
}

function importAll(r){
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  return (
    <div className="App">
      <DeckList removeEgg={removeEgg} removeCard={removeCard} cardsInDeck={cardsInDeck} cardsMap={cardsMap} updateDeck={updateDeck} deck = {deck} images={images}/>
      <Joke eggs={eggs} cardsInDeck={cardsInDeck} cardsMap={cardsMap} updateDeck={updateDeck} deck = {deck} images={images}/>
    </div>
  );
}

export default App;
