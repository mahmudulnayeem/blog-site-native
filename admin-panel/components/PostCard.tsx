import dateFormate from 'dateformat'
import Image from 'next/image'
import Link from 'next/link'
import { BsPencilSquare, BsTrash } from 'react-icons/bs'

const PostCard = ({ post, onDeleteClick }: { post: any, onDeleteClick: any }) => {
    if (!post) return null
    const { title, thumbnail, tags, meta, createdAt, slug, id } = post


    return (
        <div className='bg-white shadow-sm rounded p-2 flex flex-col justify-between'>
            <div className='flex justify-center aling-center'>
                <Image alt={title} src={thumbnail || '/nopicture.jpg'} width='300' height='180' className='aspect-video' />
            </div>
            <div className='p-2 flex-1 '>
                <h1 className='text-lg font-semibold text-gray-700'>{title}</h1>
                <p className='text-gray-500'>{meta.substring(0, 80) + '...'}</p>
                <div className='flex justify-between py-2'>

                    <p className='text-gray-500 text-sm'>{dateFormate(createdAt, 'mediumDate')}</p>
                    <p className='text-gray-500 text-sm'>{tags.join(', ')}</p>
                </div>

                <div className='flex space-x-3'>
                    <Link href={`/updatePost/${slug}`} className='w-8 h-8 rounded-full bg-blue-400 hover:bg-blue-600 flex justify-center items-center text-white'><BsPencilSquare /></Link>
                    <button onClick={onDeleteClick} className='w-8 h-8 rounded-full bg-red-400 hover:bg-red-600 flex justify-center items-center text-white'> <BsTrash /> </button>

                </div>
            </div>
        </div>
    )
}

export default PostCard