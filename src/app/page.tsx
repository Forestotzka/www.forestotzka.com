import Image from 'next/image';

const Home = (): JSX.Element => {
    return (
        <div className='pt-10 flex justify-center'>
            <div className='w-80'>
                <Image
                    src='/forestotzka-logo.png'
                    alt='Forestotzka Logo'
                    priority={true}
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
};

export default Home;
