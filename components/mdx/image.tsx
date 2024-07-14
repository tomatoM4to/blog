import Image from 'next/image';

export const heads = {
    h1: (props: any) => (
        <Image src={props.src} width={200} height={200} alt={props.alt} className='rounded-xl' />
    ),
}