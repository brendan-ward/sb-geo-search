import jsonp from 'jsonp';


export const SET_EXTENT = "SET_EXTENT";
export const SB_QUERY = "SB_QUERY";
export const SB_QUERY_SUCCESS = "SB_QUERY_SUCCESS";
export const SB_QUERY_FAIL = "SB_QUERY_FAIL";

export const querySB = (q, extent = null, page = 1, itemsPerPage = 20, folderId = null) => {
  return (dispatch) => {
    dispatch({type: SB_QUERY, page: page});

    const params = {
      q,
      filter: (extent)? ('spatialQuery={"type":"envelope","coordinates":' + JSON.stringify(extent)) + '}': null,
      offset: (page - 1) * itemsPerPage,
      fields: 'title,summary,previewImage,browseCategories,hasChildren',
      format: 'jsonp',
      max: itemsPerPage,
      folderId: folderId
    };

    const query = Object.keys(params).filter(k => params[k] !== null).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
    jsonp(`https://www.sciencebase.gov/catalog/items?${query}`, {timeout:15000}, (err, data) => {
      if (err !== null) {
        console.error(err);
        dispatch({type: SB_QUERY_FAIL});
        return;
      }
      dispatch({type: SB_QUERY_SUCCESS, data})
    });
  }
}

export const setExtent = (extent) => ({
  type: SET_EXTENT,
  extent: extent
});

export default(state = {
  isPending: false,
  isError: false,
  items: null,
  total: 0,
  page: 1,
  extent: null
}, action) => {
  switch (action.type) {
    case SET_EXTENT:
      console.log('set extent', action.extent)
      return Object.assign({}, state, {extent: action.extent});

    case SB_QUERY:
      console.log("start request", action);
      return Object.assign({}, state, {
        isError: false,
        isPending: true,
        items: null,
        page: action.page
      });

    case SB_QUERY_SUCCESS:
      console.log(" request succeeded", action);
      return Object.assign({}, state, {
        isError: false,
        isPending: false,
        items: action.data.items,
        total: action.data.total
      });

    case SB_QUERY_FAIL:
      console.log(" request failed");
      return Object.assign({}, state, {
        isError: true,
        isPending: false,
        items: null
      });

    default:
      return state;
  }
};
