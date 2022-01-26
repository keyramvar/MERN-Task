import {
  PROJECT_FORM,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO
} from "../../types";

//Lo único que hace el reducer es cambiar el state
export default (state, action) => {
  switch (action.type) {
    case PROJECT_FORM:
      return {
        ...state,
        formulario: true,
      };
    case OBTENER_PROYECTOS:
      return {
        ...state,
        proyectos: action.payload,
      };
    case AGREGAR_PROYECTO:
      return {
        ...state,
        proyectos: [...state.proyectos, action.payload],
        formulario: false,
        errorformulario: false,
      };
    case VALIDAR_FORMULARIO:
      return {
        ...state,
        errorformulario: true,
      };
      case PROYECTO_ACTUAL:
      return {
        ...state,
        proyectoA: state.proyectos.filter(proyecto => proyecto.id === action.payload)
      };
      case ELIMINAR_PROYECTO:
        return {
          ...state,
          proyectos: state.proyectos.filter(proyecto => proyecto.id !== action.payload)
        };
    default:
      return state;
  }
};
