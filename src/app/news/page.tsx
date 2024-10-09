import PageTitle from '@/components/PageTitle';
import NewsCard from '@/components/NewsCard';
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
        <div className='pb-32'>
            <PageTitle title='NEWS' />
            <PostCardGrid>
                {News.descendSortByPostDate(newsList).map((news) => (
                    <NewsCard key={news.id} news={news} />
                ))}
            </PostCardGrid>
        </div>
    );
};

export default Home;
