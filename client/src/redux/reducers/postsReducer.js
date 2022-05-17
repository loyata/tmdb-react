// state 为 posts
const reducer = (state = {posts:[], isLoading: true}, action) => {
    switch (action.type){
        case 'START_LOADING':
            return {...state, isLoading: true}
        case 'END_LOADING':
            return {...state, isLoading: false}
        case 'FETCH_ALL':
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages:action.payload.numberOfPage
            };
        case 'COMMENT':
            return {
                ...state,
                posts: state.posts.map((post)=>{
                    if(post._id === action.payload._id) return action.payload;
                    return post;
                })
            }
        case 'GET_POST':
            return {
                ...state,
                post: action.payload
            }
        case 'FETCH_BY_SEARCH':
            return {...state, posts:action.payload};
        case 'CREATE':
            return {...state, posts:action.payload};
        case 'UPDATE':
        case 'LIKE':
            return {...state, posts: state.posts.map((post)=>{
                return post._id === action.payload._id ? action.payload : post;
            })};
        case 'DELETE':
            return {...state, posts: state.posts.filter((post)=>{
                return post._id !== action.payload._id;
            })};
        default:
            return state;
    }
}

export default reducer;