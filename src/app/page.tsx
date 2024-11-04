import Link from 'next/link';

import BlogCard from '@/components/BlogCard';
import NewsCard from '@/components/NewsCard';
import PageTitle from '@/components/PageTitle';
import PostCardGrid from '@/components/PostCardGrid';
import { Blog } from '@/utils/resources/Blog';
import { News } from '@/utils/resources/News';

const getNewsList = (): News[] => {
    return News.getIds().map((id) => {
        return new News(id);
    });
};

const getBlogList = (): Blog[] => {
    return Blog.getIds().map((id) => {
        return new Blog(id);
    });
};

const Home = (): JSX.Element => {
    const newsList = getNewsList();
    const latestNewsList = News.descendSortByPostDate(newsList).slice(0, 3);

    const blogList = getBlogList();
    const latestBlogList = Blog.descendSortByPostDate(blogList).slice(0, 3);

    return (
        <>
            <section>
                <PageTitle title='NEWS' />
                <PostCardGrid>
                    {latestNewsList.map((news) => (
                        <NewsCard key={news.id} news={news} />
                    ))}
                </PostCardGrid>
                <div className='pt-9 pb-14 flex justify-center'>
                    <Link href='/news'>
                        <div className='w-72 h-16 flex justify-center items-center rounded-full border-1 border-green-600 text-white hover:text-green-600 bg-green-600 hover:bg-white transition-colors duration-200'>
                            <p className='text-2xl'>ニュース一覧</p>
                        </div>
                    </Link>
                </div>
            </section>
            <section className='pb-14'>
                <PageTitle title='BLOGS' />
                <PostCardGrid>
                    {latestBlogList.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </PostCardGrid>
                <div className='pt-9 pb-14 flex justify-center'>
                    <Link href='/blogs'>
                        <div className='w-72 h-16 flex justify-center items-center rounded-full border-1 border-green-600 text-white hover:text-green-600 bg-green-600 hover:bg-white transition-colors duration-200'>
                            <p className='text-2xl'>ブログ一覧</p>
                        </div>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Home;
