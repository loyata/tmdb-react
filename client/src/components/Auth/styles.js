import {makeStyles} from "@material-ui/core/styles"

export default makeStyles((theme) => {

    return ({
        paper:{
            marginTop: "64px",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            padding:"16px",

        },
        avatar:{
            margin:"8px",
            backgroundColor:"blue"
        },
        form:{
            width:"100%",
            marginTop:"24px"
        },
        // root: {
        //     '& .MuiTextField-root': {
        //         margin: theme.spacing(1,1,1,0),
        //     },
        // },
        submit:{
            margin:"24px 0px 16px"
        },
        googleButton:{
            width:"100%",
            margin: "8px 0px 8px 0px"
        }


    });
});