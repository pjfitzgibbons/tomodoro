import {Task} from "stores/db";
import React from "react";
import taskStore from "stores/task";

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
export const Cards = ({lane}:{lane:string}) => {
  return (
    <React.Fragment>
      {taskStore.sortedTasks(lane).map((task: Task) => Card(task))}
    </React.Fragment>
  );
}
