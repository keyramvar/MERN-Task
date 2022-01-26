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

export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        projectTask: state.tasks.filter(
          (task) => task.proyectoID === action.payload
        ),
      };
    case AGREGAR_TAREA:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        taskError: false,
      };
    case VALIDAR_TAREA:
      return {
        ...state,
        taskError: true,
      };

    case ELIMINAR_TAREA:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case ESTADO_TAREA:
      return {
        ...state,
        tasks: state.projectTask.map((task) => task.id === action.payload.id ? action.payload : task),
      };
      case TAREA_ACTUAL:
        return {
          ...state,
          taskSeleccionada: action.payload
        }

        case ACTUALIZAR_TAREA:
          return{
            ...state,
            tasks: state.tasks.map((task) => task.id === action.payload.id ? action.payload : task),
          }

          case LIMPIAR_TAREA:
            return {
              ...state,
              taskSeleccionada:null
            }
    default:
      return state;
  }
};
