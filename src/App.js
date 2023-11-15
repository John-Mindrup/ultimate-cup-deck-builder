import {React, useState, useEffect} from 'react';
import './App.css';
import Joke from './Joke';
import DeckList from './DeckList';
import { FloatButton, Drawer} from 'antd';
function App() {
const [deck, setDeck] = useState([]);
const [images, setImages] = useState([]);
const [cardsMap] = useState(new Map());
const [eggs, setEggs] = useState(0);
const [cardsInDeck, setCardsInDeck] = useState(0);
const [showDeck, setShowDeck] = useState(false);
useEffect(() => {
  if (typeof require.context === 'undefined') {
    const fs = require('fs');
    const path = require('path');
  
    require.context = (base = '.', scanSubDirectories = false, regularExpression = /\.js$/) => {
      const files = {};
  
      function readDirectory(directory) {
        fs.readdirSync(directory).forEach((file) => {
          const fullPath = path.resolve(directory, file);
  
          if (fs.statSync(fullPath).isDirectory()) {
            if (scanSubDirectories) readDirectory(fullPath);
  
            return;
          }
  
          if (!regularExpression.test(fullPath)) return;
  
          files[fullPath] = true;
        });
      }
  
      readDirectory(path.resolve(__dirname, base));
  
      function Module(file) {
        return require(file);
      }
  
      Module.keys = () => Object.keys(files);
  
      return Module;
    };
  }
   let imgs = importAll(require.context('./cardthumbnails', false, /\.(png|jpe?g|svg)$/));
   setImages(imgs);
}, []);

//ew
function removeEgg(i){
  setEggs(eggs - i);
}
//ew
function removeCard(i){
  setCardsInDeck(cardsInDeck - i);
}

function updateDeck(d){
  setDeck([...d]);
}

function importAll(r){
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); return null;});
    return images;
}
  return (
    <div className="App">
      <FloatButton onClick={() => setShowDeck(!showDeck)}>Show/Hide Deck</FloatButton>
      <Drawer mask={false} autoFocus={false} placement='bottom' onClose={() => setShowDeck(false)} open={showDeck}><DeckList removeEgg={removeEgg} removeCard={removeCard} cardsInDeck={cardsInDeck} cardsMap={cardsMap} updateDeck={updateDeck} deck = {deck} images={images}/></Drawer>
      <Joke removeEgg={removeEgg} removeCard={removeCard} cardsMap={cardsMap} updateDeck={updateDeck} deck = {deck} images={images}/>
    </div>
  );
}

export default App;
