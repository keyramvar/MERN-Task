import React, { useReducer } from "react";
import ContextTask from "./contextTask";
import ReducerTask from "./reducerTask";
import { v4 as uuidv4 } from "uuid";

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from "../../types";

const StateTask = (props) => {
  const initialState = { //siempre es un objeto
    tasks: [
      { id: 0, nombre: "Elegir Colores", estado: false, proyectoID: 2 },
      { id: 1, nombre: "Elegir Pago", estado: true, proyectoID: 3 },
      { id: 2, nombre: "Elegir Hosting", estado: false, proyectoID: 4 },
      { id: 3, nombre: "Elegir Plataforma", estado: true, proyectoID: 4 },
      { id: 4, nombre: "Elegir Colores", estado: false, proyectoID: 3 },
      { id: 5, nombre: "Elegir Pago", estado: true, proyectoID: 2 },
      { id: 6, nombre: "Elegir Plataforma", estado: true, proyectoID: 1 },
      { id: 7, nombre: "Elegir Hosting", estado: false, proyectoID: 1 },
      { id: 8, nombre: "Elegir Plataforma", estado: true, proyectoID: 3 },
      { id: 9, nombre: "Elegir Colores", estado: false, proyectoID: 4 },
      { id: 10, nombre: "Elegir Pago", estado: true, proyectoID: 1 },
      { id: 11, nombre: "Elegir Hosting", estado: false, proyectoID: 2 },
      { id: 12, nombre: "Elegir Hosting", estado: false, proyectoID: 2 },
    ],
    projectTask: null,
    taskError: false,
    taskSeleccionada: null
  };
  //Creamos el dispatch y el state
  const [state, dispatch] = useReducer(ReducerTask, initialState);

  //Crear las funciones

  //Obtener las tareas de un proyecto
  const obtenerTareas = (proyectoID) => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoID,
    });
  };

  //Agregamos una tarea al proyecto seleccionado
  const addTask = (task) => {
    task.id = uuidv4();
    dispatch({
      type: AGREGAR_TAREA,
      payload: task,
    });
  };

  //Validar y mostrar un error en caso de que sea necesario
  const validarTask = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  //Eliminar tarea por id
  const deleteTask = (id) => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id,
    });
  };

  //Cambia el estado de cada tarea
  const changeStateTask = task =>{
    dispatch({
      type: ESTADO_TAREA,
      payload: task
    })
  }

  ///Extrae un tarea para editarla
  const saveTaskCurrent = task =>{
    dispatch({
      type: TAREA_ACTUAL,
      payload: task
    })
  }

  //Editar o modificar un tarea
  const updateTask = task =>{
    dispatch({
      type: ACTUALIZAR_TAREA,
      payload: task
    })
  }

  //Elimina la tarea seleccionada 
  const cleanTask = () =>{
    dispatch({
      type: LIMPIAR_TAREA
    })
  }

  return (
    <ContextTask.Provider
      value={{
        tasks: state.tasks,
        projectTask: state.projectTask,
        taskError: state.taskError,
        taskSeleccionada: state.taskSeleccionada,
        obtenerTareas,
        addTask,
        validarTask,
        deleteTask,
        changeStateTask,
        saveTaskCurrent,
        updateTask,
        cleanTask
      }}
    >
      {props.children}
    </ContextTask.Provider>
  );
};

export default StateTask;
