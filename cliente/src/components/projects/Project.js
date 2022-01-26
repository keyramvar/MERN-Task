import React, { useContext } from "react";
import contextProject from "../../context/projects/contextProject";
import contextTask from "../../context/task/contextTask";

const Project = ({ project }) => {
  const contextProjects = useContext(contextProject);
  const { proyectoActual } = contextProjects;

  //Obtener el state del proyecto
  const contextTasks = useContext(contextTask);
  const {obtenerTareas} = contextTasks;


  //Función para agregar el proyecto actual 
  const seleccionarProyecto = id =>{
    proyectoActual(id); //Para fijar un poryecto actual
    obtenerTareas(id); //Filtrar las tareas cuando se de click
  }

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(project.id)}
      >
        {project.nombre}
      </button>
    </li>
  );
};

export default Project;
