import React, { useReducer } from "react";

import { v4 as uuidv4 } from "uuid";

import contextProject from "./contextProject";
import reducerProject from "./reducerProject";
import {
  PROJECT_FORM,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
} from "../../types";

const StateProject = (props) => {
  const proyectos = [
    { id: 1, nombre: "Tienda Virtual" },
    { id: 2, nombre: "Intranet" },
    { id: 3, nombre: "Diseño de Sitio Web" },
    { id: 4, nombre: "Web" },
  ];

  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyectoA: null,
  };

  //Dispatch para ejecutar acciones
  const [state, dispatch] = useReducer(reducerProject, initialState);

  //Serie de funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: PROJECT_FORM,
    });
  };

  //Obtener los proyectos
  const obtenerProyectos = () => {
    dispatch({
      type: OBTENER_PROYECTOS,
      payload: proyectos,
    });
  };

  //Agregar nuevo proyecto
  const agregarProyecto = (proyecto) => {
    proyecto.id = uuidv4();

    //Insertar el proyecto en el state con un dispatch
    dispatch({
      type: AGREGAR_PROYECTO,
      payload: proyecto,
    });
  };

  //Valida el formulario por errores
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  //Selecciona el proyecto que el usuario le dio click
  const proyectoActual = (proyectoAId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoAId,
    });
  };

  //Eliminar un proyecto
  const eliminarProyecto = proyectoAId =>{
    dispatch({
      type:ELIMINAR_PROYECTO,
      payload: proyectoAId
    })
  }

  return (
    <contextProject.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario, //state, es mejor colocar los state primero y luego las funciones
        errorformulario: state.errorformulario,
        proyectoA: state.proyectoA,
        mostrarFormulario, //función
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
      {props.children}
    </contextProject.Provider>
  );
};

export default StateProject;
