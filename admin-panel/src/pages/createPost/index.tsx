
import { ImEye, ImSpinner11 } from 'react-icons/im'
const CreatePost = () => {
    return (
        <form className='p-3 space-y-2'>
            {/* title and submit  */}
            <div className="flex justify-between items-center py-1 mr-1">
                <h1 className="text-xl font-semibold text-gray-700">Create New Post</h1>
                <div className="flex items-center space-x-5">
                    <button className='flex items-center space-x-2 px-3 ring-1 ring-blue-500 rounded h-10 text-blue-500 hover:text-white hover:bg-blue-500 transition' >
                        <ImSpinner11 />
                        <span> Reset</span>
                    </button>
                    <button className='flex items-center space-x-2 px-3 ring-1 ring-blue-500 rounded h-10 text-blue-500 hover:text-white hover:bg-blue-500 transition' >
                        <ImEye />
                        <span> View</span>
                    </button>
                    <button className='px-5 h-10 w-36 hover:ring-1 bg-blue-500 rounded  text-white hover:text-blue-500 ring-blue-500 transition hover:bg-transparent '>
                        <span> Post</span>
                    </button>
                </div>
            </div>
            {/* featured chackBox */}
            <div>
                <input id='Featured' type="checkbox" hidden />
                <label htmlFor='Featured' className='flex space-x-2 items-center text-gray-700 cursor-pointer group' >
                    <div className='w-4 h-4 rounded-full border-2 border-gray-700 flex items-center justify-center group-hover:border-blue-500'>
                        <div className='w-3 h-3 rounded-full border-2 bg-gray-700 group-hover:bg-blue-500' />
                    </div>
                    <span className='group-hover:text-blue-500'>Featured</span></label>
            </div>
            <input type="text" className='text-xl outline-none focus:ring-1 rounded p-2 w-full font-semibold' placeholder='Post title' />
            <textarea className='resize-none outline-none focus:ring-1 rounded p-2 w-full font-semibold ' placeholder='## Markdown'></textarea>
        </form>
    )
}

export default CreatePost