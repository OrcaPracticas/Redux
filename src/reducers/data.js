/**
 * Funcion para realizar la busqueda dentro de la data de videos
 *
 * @param  {string} query Nombre del author.
 * @param  {object} state Data correspondiente a los videos.
 * @return {array}
 */
const searchVideo = (query, state) => {
    // Formateo el query para evitar - y espacios, tambien lo paso a minusculas
    const QUERY = query.replace(/-| /g, "")
        .toLowerCase();
    let SEARCH = [];
    if (QUERY) {
        const { categories } = state.data;
        SEARCH = categories.reduce((items, video) => {
            const { playlist } = video;
            const FILTER = playlist.filter((item) => {
            // Formateo el nombre del author para evitar - y espacios, tambien lo paso a minusculas
                const AUTHOR = item.author.replace(/ |-/g, "")
                    .toLowerCase();
                return AUTHOR.includes(QUERY);
            });
            return items.concat(FILTER);
        }, []);
    }
    return SEARCH;
};

const data = (state, action) => {
    switch (action.type) {
    case "SEARCH_VIDEO":
        return {
            ...state,
            search: searchVideo(action.payload.query, state),
        };
    default:
        return state;
    }
};

export default data;
