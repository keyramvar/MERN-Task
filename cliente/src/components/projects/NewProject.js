import React, { Fragment, useState, useContext } from "react";
import contextProject from "../../context/projects/contextProject";

const NewProject = () => {
  //Obtener el state del proyecto
  const contextProjects = useContext(contextProject);
  const {
    formulario,
    errorformulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = contextProjects;

  //State para el proyecto
  const [proyecto, guardaProyecto] = useState({
    nombre: "",
  });

  //Extraer el nombre del Proyecto
  const { nombre } = proyecto;

  //Lee el contenido del input
  const onChangeProyecto = (e) => {
    guardaProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando el usuario envia un proyecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();

    //validar el proyecto
    if (nombre === "") {
      mostrarError();
      return;
    }

    //agregar al state
    agregarProyecto(proyecto);

    //Reiniciar el form
    guardaProyecto({
      nombre: "",
    });
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => mostrarFormulario()}
      >
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar un nuevo proyecto"
          />
        </form>
      ) : null}
      {errorformulario ? 
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
       : null}
    </Fragment>
  );
};

export default NewProject;
