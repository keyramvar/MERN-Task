import React, { useContext, useState, useEffect } from "react";
import contextProject from "../../context/projects/contextProject";
import contextTask from "../../context/task/contextTask";
import { TAREAS_PROYECTO } from "../../types";

const FormTask = () => {
  //Extraer un proyecto por si esta activo
  const contextProjects = useContext(contextProject);
  const { proyectoA } = contextProjects;

  //Obtener la función del contexto de tarea
  const contextTasks = useContext(contextTask);
  const {
    taskSeleccionada,
    taskError,
    addTask,
    validarTask,
    obtenerTareas,
    updateTask,
    cleanTask
  } = contextTasks;

  //Effect que detecta si hay un tarea seleccionda
  useEffect(() => {
    if (taskSeleccionada != null) {
      saveTask(taskSeleccionada);
    } else {
      saveTask({
        nombre: "",
      });
    }
  }, [taskSeleccionada]);

  //State del formulario
  const [task, saveTask] = useState({
    nombre: "",
  });

  //Extraer el nombre de la tarea
  const { nombre } = task;

  //Si no ha seleccionado un proyecto
  if (!proyectoA) return null;

  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyectoA;

  //Leer los valores del formulario
  const handleChange = (e) => {
    saveTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //validar
    if (nombre.trim() === "") {
      validarTask();
      return;
    }

    //Verifica si es edición o es una tarea nueva
    if (taskSeleccionada === null) {
      //agregar la nueva tarea al state de tareas
      task.proyectoID = proyectoActual.id;
      task.estado = false;
      addTask(task);
    } else {
      //Actualizar tarea existente
      updateTask(task)

      //Eliminar tarea seleccionada del state
      cleanTask();
    }

    //pasar la validación

    //agregar la nueva tarea al state de tareas
    task.proyectoID = proyectoActual.id;
    task.estado = false;
    addTask(task);

    //Obtener y filtrar las tareas de los proyectos
    obtenerTareas(proyectoActual.id);

    //reiniciar el form
    addTask({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={taskSeleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {taskError ? (
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTask;
