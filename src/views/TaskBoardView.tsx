import laneStore, {newLane} from 'stores/lane'
import 'views/TaskBoardView.scss'
import {Lane} from "stores/db";
import React, {MouseEventHandler} from 'react';
import {Cards} from "components/Card";

function TaskBoardView() {

  const Lane = (lane: Lane) => (
    <div key={lane._id} className="p-2 lane">
      <div className="lane-title">{lane.name}</div>
      <Cards lane={lane.name}></Cards>
    </div>
  )
  const Lanes = () => (
    <React.Fragment>
      {laneStore.sortedLanes.map((lane: Lane) => Lane(lane))}
    </React.Fragment>
  )

  const AddLaneButton = ({onClick}: { onClick: MouseEventHandler }) => {
    return (
      <div onClick={onClick}
           className={"flex-shrink-1 add-lane-tooltip-wrapper"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="lane-button-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <div className={"add-lane-tooltip"}>
          Add Lane
        </div>
      </div>
    )
  }

  const addLane = () => {
    laneStore.saveLane(newLane())
  }

  return (
    <div className={"container-fluid"}>
      <div className={"header d-flex"}>
        <div className={"col "}>Trello Board</div>
        <AddLaneButton onClick={addLane}></AddLaneButton>
      </div>
      <div className="row">
        <div className="cardwall d-flex overflow-scroll">
          <Lanes></Lanes>
        </div>
      </div>
    </div>
  )
}

export default TaskBoardView
