import React, {useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import PageTemplate from '../PageTemplate/PageTemplate';
import Posts from '../../components/Posts/Posts';
import Tabs from '../../components/Tabs/Tabs';
import Pagination from '../../components/Pagination/Pagination';
import FilterAndSorting from '../../components/FilterAndSorting/FilterAndSorting';
import { changePage, changeSearch, getAllPosts, getAllPostsCount } from '../../redux/slices/postsSlice';

const MainPage = () => {
    const { category, page, filter, count, sort, search } = useAppSelector(store => store.posts);
    const dispatch = useAppDispatch();
    const componentDidMount = useRef(false);
    useEffect(() => {
        componentDidMount.current = true;
        dispatch(changeSearch(''));
        dispatch(changePage(1));
    }, []);

    useEffect (() => {
        if (page > count && count != 0 && componentDidMount.current) {
            dispatch(changePage(count));
        } 
        dispatch(getAllPostsCount({ category: category, page: page, filter: filter, count: count, sort: sort, search: search }))
        dispatch(getAllPosts({ category: category, page: page, filter: filter, count: count, sort: sort, search: search }))
    }, [category, page, count, filter, sort, search]);

    return (
        <PageTemplate title='blog'>
            <FilterAndSorting/>
            <Tabs />
            <Posts/>
            <Pagination />
        </PageTemplate>
    );
};

export default MainPage;


