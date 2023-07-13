import React from "react";
import "./DnD.scss"
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../../helpers/StrictModeDroppable";
import { useState, useEffect } from "react";
import axios from "axios";
import { ITEMS } from "../../assets/initData";
import { copy } from "../../helpers/utils";
import { RowList } from "../RowList/RowList";



const DnD = ({state, setState}) => {
 const [rowList, setRowList] = useState([])

useEffect(()=>{
    axios.get("http://localhost:8080/row-list")
    .then((response) =>{
        setRowList(response.data)
    })
    .catch(console.log("wooopsy"))
},[])





  const onDragEnd = result => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    switch (source.droppableId) {
      case "items":
          setState(prev =>{
          if(prev[destination.droppableId].length === 0){
            return {...prev, 
          [destination.droppableId]: copy(
            rowList,
            state[destination.droppableId],
            source,
            destination
          )
        }}
          return prev
          }
        );
        break;
     
    }
  };

    return (
      <div className="dnd">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="dnd__container">
            <RowList  rowList={rowList}/>
            <div className="dnd__drop">
              <h1 className="dnd__title">Drop chosen</h1>
              <div>
                {Object.keys(state).map((list) => (
                  <Droppable key={list} droppableId={list}>
                    {(provided, snapshot) => (
                      <div className="dnd__container-drop"
                      ref={provided.innerRef}
                      isDraggingOver={snapshot.isDraggingOver}
                      > 
                        {state[list].map((item, index) => (
                          <Draggable
                            key={(item.row_id).toString()}
                            draggableId={(item.row_id).toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                isDragging={snapshot.isDragging}
                                style={provided.draggableProps.style}
                              >
                                <img className="dnd__row-img" src={item.row_img}/> 
                                <button className="dnd__btn-del"
                                  onClick={() => {
                                    const newState = { ...state };
                                    newState[list].splice(index, 1);
                                    setState(newState);
                                  }}
                                >
                                  x
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </div>
            </div>
          </DragDropContext>
        <div>
          <button className="dnd__btn"
            onClick={() => {
              setState({ 
              ["row1"]: [],
              ["row2"]: [],
              ["row3"]: []});
            }}
          >
            RESET ROWS
          </button>
        </div>
      </div>
    );
  }


export default DnD;
