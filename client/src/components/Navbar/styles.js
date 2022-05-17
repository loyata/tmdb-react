import {makeStyles} from "@material-ui/core/styles";
// import {deepPurple} from "@material-ui/core/colors";

export default makeStyles((theme) => {

    return ({
        appBar: {
            borderRadius: 15,
            margin: '30px 0',
            marginBottom: '30px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.5)',
            // [theme.breakpoints.down('sm')]: {
            //     flexDirection: 'column',
            // },
        },
        logo:{
            display:"flex",
            flexDirection:"row",
            marginX:"15px"
        },
        heading: {
            color: 'rgba(255,0,26,0.8)',
            textDecoration:'wavy'
        },
        image: {
            marginLeft: '15px',
        },

        tb: {
            display:"flex",
            justifyContent:"flex-end",
            width:"100%"
        },
        profile:{

            display: 'flex',
            justifyContent: 'space-between',
            width: '300px',
        },

        purple:{
            color: "purple",
            backgroundColor: "purple",
        },
        userName:{
            display: 'flex',
            alignItems: 'center',
            color:"black"
        },
        home:{
            marginLeft:"20px"
        },
        signin:{
            // width: "100%",
            // maxWidth: 700,
            "& .MuiButton-label": {
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textAlign: "left",
                display: "block"
            }
        }
    });
});