import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const PostCardGrid = ({ children }: Props): JSX.Element => {
    return <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>{children}</div>;
};

export default PostCardGrid;
