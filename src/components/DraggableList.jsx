import React, {Component} from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Place from "./DraggableItem"

class DnDList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cards : [{
        id: 1,
        text: 'Write a cool JS library',
      },
      {
        id: 2,
        text: 'Make it generic enough',
      },
      {
        id: 3,
        text: 'Write README',
      },
      {
        id: 4,
        text: 'Create some examples',
      },
      {
        id: 5,
        text:
          'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      },
      {
        id: 6,
        text: '???',
      },
      {
        id: 7,
        text: 'PROFIT',
      }
			]
		}
	}

	moveCard = useCallback(
		(dragIndex, hoverIndex) => {
			const dragCard = cards[dragIndex]
			setCards(
				update(cards, {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
				}),
			)
		},
		[cards],
	)

	renderCard = (card, index) => {
		return (
			<Card
				key={card.id}
				index={index}
				id={card.id}
				text={card.text}
				moveCard={moveCard}
			/>
		)
	}

	render() {
		return (
			<DndProvider backend={HTML5Backend}>

			</DndProvider>
		)
	}
}