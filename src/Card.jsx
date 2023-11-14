import {React} from "react"

export function Card(props){
    const card = props.card;
    return(<div><img alt={card.CardName} onClick={() => props.AddCard(card)} width={200} src={props.images[props.index]}></img><br></br>{card.CardName} {card.CardNum}</div>);
}
