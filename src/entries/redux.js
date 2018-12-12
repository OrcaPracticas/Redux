import { createStore } from "redux";


const $FORM = document.querySelector("#form");
const $PLAY_LIST = document.querySelector("#playlist");

/**
 * Creacion del store, el cual recibe 3 parametros.
 * Reducer: Esto es una funcion pura
 * initialState: Esto es el estado inicial de nuestro estado
 * enhancer: Permite realizar la extencion de redux
 */

const INITIAL_STATE = [
    { title: "Quiero ver" },
    { title: "Bailando Ska" },
    { title: "99%" },
];

// reducer que permite actualizar el STORE
// esta funcion simpre recive el state y el action
const REDUCER = (state, action) => {
    switch (action.type) {
    case "ADD_SONG":
        return [...state, action.payload];
    default:
        return state;
    }
};

// creacion del store
const STORE = createStore(
    REDUCER,
    INITIAL_STATE,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// consigue el estado
const render = () => {
    // imprimiendo el state
    const PLAY_LIST_STATE = STORE.getState();
    $PLAY_LIST.innerHTML = "";
    PLAY_LIST_STATE.forEach((item) => {
        const $TEMPLATE = document.createElement("p");
        $TEMPLATE.textContent = item.title;
        $PLAY_LIST.appendChild($TEMPLATE);
    });
};

// funcion para mandar data
const handleSubmit = (event) => {
    // Evita que se mande el post que recarga la pagina
    event.preventDefault();
    // metodo propio de los formularios que permite conseguir la
    // data de los campos
    const DATA = new FormData($FORM);
    // Permite conseguir el dato de uno de los campos.
    const TITLE = DATA.get("title");

    // suscribiendome al store el parametro
    // es la accion que estara recibiendo nuestro store
    STORE.dispatch({
        type: "ADD_SONG",
        payload: {
            title: TITLE,
        },
    });
};

// permite actualizar el render
const handleUpdate = () => {
    render();
};

// se asigna el metodo al momento de realizar
// el submit dentro el formulario.
$FORM.addEventListener("submit", handleSubmit);
render();
// suscribiendo me al store para realizar la actualizacion
STORE.subscribe(handleUpdate);





