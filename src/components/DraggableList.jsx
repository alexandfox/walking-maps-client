import React, { useState } from 'react'
import Card from '../components/Card'
import update from 'immutability-helper'

const style = {
  width: 400,
}
const Container = (props) => {
  {
    const [cards, setCards] = useState([
      {
        id: 1,
        text: props.places[0] && props.places[0].name,
      },
      {
        id: 2,
        text: props.places[1] && props.places[1].name,
      },
    ])
    
    const moveCard = (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex]
      setCards(
        update(cards, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        }),
      )
    }
    return (
      <div style={style}>
				{console.log("draglist props: ", props)}
				{props.places[0] && <div>here i am: {props.places[0].name}</div>}
        {cards.map((card, i) => (
          <Card
            key={card.id}
            index={i}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
          />
        ))}
      </div>
    )
  }
}
export default Container
