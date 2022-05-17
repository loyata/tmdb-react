import React  from 'react';
import {Pagination, PaginationItem} from "@material-ui/lab";
import useStyles from './styles.js'
import {Link} from "react-router-dom";

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../redux/action-creators/posts";

const CustomPagination = ({page}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    // useEffect(()=>{
    //     if(page) dispatch(getPosts(page));
    // },[page])

    const {currentPage, numberOfPages} = useSelector((state)=>{
        return state.posts;
    })

    //console.log(Number(page), currentPage);

    return (
        <div>
            <Pagination
                classes = {{ul: classes.ul}}
                count={numberOfPages}
                page={Number(page)}
                variant={"outlined"}
                color={"primary"}
                renderItem={item => {
                    //console.log(item);
                    return (<PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>)
                }}
            />
        </div>
    );

}

export default CustomPagination;