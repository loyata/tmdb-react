import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => {

    return ({
        commentsOuterContainer:{
            display:"flex",
            justifyContent:"space-between",
        },
        commentsInnerContainer:{
            height:"200px",
            width: "70%",
            overflowY:'auto',
            marginRight:'30px'
        }
    });
});