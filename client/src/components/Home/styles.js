import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme)=>({
    appBarSearch:{
        borderRadius: 4,
        marginBottom: "1rem",
        display:"flex",
        // flexDirection:"row",
        padding:"16px",
        justifyContent:"space-between"
    },
    pagination:{

    },
    gridContainer:{
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column-reverse',
        },
    }
}))


// export default makeStyles((theme) => ({
//     appBarSearch: {
//         borderRadius: 4,
//         marginBottom: '1rem',
//         display: 'flex',
//         padding: '16px',
//     },
//     pagination: {
//         borderRadius: 4,
//         marginTop: '1rem',
//         padding: '16px',
//     },
//     gridContainer: {
//         [theme.breakpoints.down('xs')]: {
//             flexDirection: 'column-reverse',
//         },
//     },
// }));