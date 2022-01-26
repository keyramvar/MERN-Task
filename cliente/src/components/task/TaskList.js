import React, { Fragment, useContext } from "react";
import Task from "./Task";
import contextProject from "../../context/projects/contextProject";
import contextTask from "../../context/task/contextTask";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TaskList = () => {
  //Extraer el proyecto Actual de state inicial
  const contextProjects = useContext(contextProject);
  const { proyectoA, eliminarProyecto } = contextProjects;

  //Obtener las tareas del proyecto
  const contextTasks = useContext(contextTask);
  const { projectTask } = contextTasks;

  //Si no ha seleccionado un proyecto
  if (!proyectoA) return <h2>Selecciona un proyecto</h2>;

  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyectoA;

  //Eliminar un proyectp
  const OnClickEliminarProyecto = () => {
    eliminarProyecto(proyectoActual.id);
  };

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {projectTask.length === 0 ? (
          <li className="tarea">No hay tareas</li>
        ) : (
          <TransitionGroup>
            {projectTask.map((tarea) => (
              <CSSTransition
              key={tarea.id}
              timeout={200}
              className="tarea">
                <Task tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={OnClickEliminarProyecto}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default TaskList;
