import React, { useState, useEffect, usePrevious } from 'react'
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
        text: 'a place',
      },
      {
        id: 2,
        text: 'another place',
      },
		])

		const updateCards = () => {
			setCards((
				update(cards, {
					$set: [... props.places, ]
				})
			))
		}

		useEffect(() => {
      console.log("supposedly, the component changed.")
			if (cards != props.places) {
				updateCards()
			}
    });
    
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
				{/* {console.log("draglist props: ", props)}
				{console.log("state cards: ", cards)} */}
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
