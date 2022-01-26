import React, { useContext, useEffect } from "react";
import Project from "./Project";
import contextProject from "../../context/projects/contextProject";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ProjectList = () => {
  //Extraer proyectos de state inicial
  const contextProjects = useContext(contextProject);
  const { proyectos, obtenerProyectos } = contextProjects;

  //Antes del useEffect no debe haber un return
  //Obtener proyectos cuando carga un componente
  useEffect(() => {
    obtenerProyectos();

    //eslint-disable-next-line
  }, []);

  //Revisar si los proyectos tienen contenido
  if (proyectos.length === 0) return null;

  return (
    <ul className="listado-proyectos">
      <TransitionGroup>
        {proyectos.map((project) => (
          <CSSTransition key={project.id} timeout={200} className="proyecto">
            <Project project={project} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ProjectList;
