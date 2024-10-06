import React from 'react';

import PageTitle from '@/components/PageTitle';
import PostCard from '@/components/PostCard';
import PostCardGrid from '@/components/PostCardGrid';
import { News } from '@/utils/resources/News';

const getNewsList = (): News[] => {
    return News.getIds().map((id) => {
        return new News(id);
    });
};

const Home = (): JSX.Element => {
    const newsList = getNewsList();

    return (
        <>
            <PageTitle title='NEWS' />
            <PostCardGrid>
                {News.descendSortByPostDate(newsList).map((news) => (
                    <PostCard key={news.id} post={news} postType='news' />
                ))}
            </PostCardGrid>
        </>
    );
};

export default Home;
