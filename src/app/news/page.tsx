import React from 'react';

import PageTitle from '@/components/PageTitle';
import PostCard from '@/components/PostCard';
import PostCardGrid from '@/components/PostCardGrid';
import { News as NewsClass } from '@/utils/resources/News';

const getNewsList = (): NewsClass[] => {
    return NewsClass.getIds().map((id) => {
        return new NewsClass(id);
    });
};

const News = (): JSX.Element => {
    const newsList = getNewsList();

    return (
        <>
            <PageTitle title='NEWS' />
            <PostCardGrid>
                {NewsClass.descendSortByPostDate(newsList).map((news) => (
                    <PostCard key={news.id} post={news} postType='news' />
                ))}
            </PostCardGrid>
        </>
    );
};

export default News;
