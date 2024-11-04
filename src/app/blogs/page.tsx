import BlogCard from '@/components/BlogCard';
import PageTitle from '@/components/PageTitle';
import PostCardGrid from '@/components/PostCardGrid';
import { Blog } from '@/utils/resources/Blog';

const getBlogList = (): Blog[] => {
    return Blog.getIds().map((id) => {
        return new Blog(id);
    });
};

const Home = (): JSX.Element => {
    const blogList = getBlogList();

    return (
        <div className='pb-32'>
            <PageTitle title='BLOGS' />
            <PostCardGrid>
                {Blog.descendSortByPostDate(blogList).map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </PostCardGrid>
        </div>
    );
};

export default Home;
