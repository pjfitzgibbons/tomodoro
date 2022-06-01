import {LoremIpsum} from 'lorem-ipsum';
import laneStore, {newLane} from '@/stores/lane'
import '@/views/TaskBoardView.scss'
import {Lane, Task} from "@/stores/db";
import task from "@/stores/task";
import React from 'react';

const lorem = new LoremIpsum();

const sentence = (): string => lorem.generateSentences(2);

function TaskBoardView() {
  let thisTask: Task = {
    _id: 'first',
    name: 'First Task',
    lane: 'Todos',
    category: 'First',
    description: sentence(),
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const Card = (task: Task) => (
    <div className="card" key={task._id}>
      <div>{task.category}</div>
      <div className="card-body">
        <div className="card-title">{task.name}</div>
        <div className="card-text">
          {task.description}
        </div>
      </div>
    </div>)

  const Cards = () => {
    return (
      <React.Fragment>
        {[thisTask].map((task: Task) => Card(task))}
      </React.Fragment>
    );
  }

  const Lane = (lane: Lane) => (
    <div key={lane._id} className="p-2 lane">
      <div className="lane-title">{lane.name}</div>
      <Cards></Cards>
    </div>
  )
  const Lanes = () => (
    <React.Fragment>
      {laneStore.sortedLanes.map((lane: Lane) => Lane(lane))}
    </React.Fragment>
  )

  const AddLaneButton = () => {
    return (
      <div className={"flex-shrink-1 add-lane-tooltip-wrapper"}>
        <svg
          onClick={addLane}
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
        <div className={"col flex-grow-1"}>Trello Board</div>
        <AddLaneButton></AddLaneButton>
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
