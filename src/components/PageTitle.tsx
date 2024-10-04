type Props = {
    title: string;
};

const PageTitle = ({ title }: Props): JSX.Element => {
    return (
        <div className='py-14'>
            <p className='font-semibold tracking-wide text-4xl text-green-600 text-center'>{title}</p>
        </div>
    );
};

export default PageTitle;
