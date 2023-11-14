import {React} from "react"
import { CardList } from "./cardlist";
import {Card} from "./Card.jsx";
import { Flex, Space } from "antd";
export default function Joke(props){



function AddCard(Card){
    if(Card === undefined)
        return;
    let num = props.cardsMap.get(Card.CardNum)?? 0;
    if(num >= 4)
        return;
    let newDeck = [...props.deck, Card];
    props.cardsMap.set(Card.CardNum, num+1);
    if(Card.CardType === "Digi-Egg")
            props.removeEgg(-1);
        else
            props.removeCard(-1);
    props.updateDeck(newDeck);
}
    return (<Flex wrap="wrap" >
        {CardList.map(item =>
            {
                let index = item.CardNum.replace(/[()]/g, '') + ".png";
                return <div style={{width:275}}><Card images = {props.images} index = {index} AddCard = {AddCard} card={item}/></div>;
            }
            )}
        </Flex>
    );
}

