import React from "react"
import { DndProvider } from 'react-dnd'

import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import Container from "../components/DraggableList";

function Test() {
	return (
		<DndProvider backend={HTML5Backend}>
			<Container />
		</DndProvider>
	)
}

export default DragDropContext(HTML5Backend)(Test)