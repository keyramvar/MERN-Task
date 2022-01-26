import React, { useContext } from "react";

import contextTask from "../../context/task/contextTask";
import contextProject from "../../context/projects/contextProject";

const Task = ({ tarea }) => {
  //Obtener la función del contexto de tarea
  const contextTasks = useContext(contextTask);
  const { deleteTask, obtenerTareas, changeStateTask, saveTaskCurrent } = contextTasks;

  //Extraer un proyecto por si esta activo
  const contextProjects = useContext(contextProject);
  const { proyectoA } = contextProjects;

  //Extraer el proyecto
  const [proyectoActual] = proyectoA;

  //Funcion para eliminar una tarea
  const taskDelete = (id) => {
    deleteTask(id);
    obtenerTareas(proyectoActual.id);
  };


  //Función que modifica el estado de las tareas
  const changeStatus = tarea =>{
    if(tarea.estado){
      tarea.estado = false;
    }else
    {
      tarea.estado = true
    }
    changeStateTask(tarea)
  }


  //Agregar una tarea actual cuando el usuario desea editarla
  const seleccionarTask = tarea =>{
    saveTaskCurrent(tarea);
  }


  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button type="button" className="completo"
          onClick={()=>changeStatus(tarea)}>
            Completo
          </button>
        ) : (
          <button type="button" className="incompleto"
          onClick={()=>changeStatus(tarea)}>
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button type="button" className="btn btn-primario"
        onClick={()=> seleccionarTask(tarea)}>
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => taskDelete(tarea.id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Task;
