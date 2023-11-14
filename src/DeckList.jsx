import {React} from "react"
import { Flex } from "antd"

export default function DeckList(props){
    function RemoveCard(Card){
        if(Card === undefined)
            return
        let newDeck = props.deck;
        let ind = newDeck.indexOf(Card);
        newDeck.splice(ind, ind !== -1 ? 1: 0);
        let num = props.cardsMap.get(Card.CardNum)?? 0;
        props.cardsMap.set(Card.CardNum, num-1);
        if(Card.CardType === "Digi-Egg")
            props.removeEgg(1);
        else
            props.removeCard(1);
        props.updateDeck(newDeck);
    }
    return <Flex wrap="wrap">
        {
            props.deck.map(item =>
                {
                    let index = item.CardNum.replace(/[()]/g, '') + ".png";
                    return <div style={{width:100}}><img onClick={() => RemoveCard(item)} width={100} src={props.images[index]}></img></div>
                })
        }
        <div>{props.cardsInDeck}</div>
    </Flex>;
}
