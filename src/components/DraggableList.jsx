import React, { useState, useEffect, usePrevious } from 'react'
import Card from '../components/Card'
import update from 'immutability-helper'

const style = {
  width: 400,
}


const Container = (props) => {
  {
    var [cards, setCards] = useState([])

		const updateCards = () => {
			// cards.push({id: cards.length + 1, text: placeName})
			console.log("here i am in update cards")
			var new_places = []
			props.places.map((place, index) => {
				new_places.push({id: index + 1, text: place.name})
				console.log("here i am in the map, place: ", place.name)
				console.log("new_places: ", new_places)
			})

			setCards(props.places)
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
				{console.log("draglist props: ", props)}
				{console.log("state cards: ", cards)}
				{/* {props.places[0] && <div>here i am: {props.places[0].name}</div>} */}
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
