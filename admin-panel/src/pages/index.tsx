import PostCard from "components/PostCard"
import { useSearch } from "context/searchProvider"
import { deletePost, getPosts } from "lib/post"
import { useEffect, useState } from "react"

const POST_LIMIT = 3

const getPaginationCount = (length: number) => {
  const division = length / POST_LIMIT;
  return Math.ceil(division)
}

export default function Home() {
  const [posts, setPosts] = useState<any>([])
  const [totalPostCount, setTotalPostCount] = useState<any>(0)
  const [pageNo, setPageNo] = useState<number>(0)
  const { searchResult } = useSearch()
  const fetchPosts = async () => {
    const { posts, error, postCount } = await getPosts(pageNo, POST_LIMIT)
    if (error) return console.log(error)
    setPosts(posts)
    setTotalPostCount(postCount)
  }
  //pagination
  const paginationCount = getPaginationCount(totalPostCount)
  const paginationArr = new Array(paginationCount).fill(' ')

  useEffect(() => {
    fetchPosts()
  }, [pageNo])



  const handleDelete = async ({ id }: { id: string | number }) => {
    const confirmed = confirm('Are you sure!')
    if (!confirmed) return

    const { error, message } = await deletePost(id)
    if (error) return console.log(error)

    console.log(message)
    const newPosts = posts.filter((p: any) => p.id !== id)
    setPosts(newPosts)
    setPageNo(pageNo)
  }

  return <div>
    <div className="grid grid-cols-3 gap-3 pb-5">
      {searchResult.length ? searchResult.map((post: any) => {
        return (
          <PostCard key={post.id} post={post} onDeleteClick={() => handleDelete(post)} />
        )
      }) :
        posts.map((post: any) => {
          return (
            <PostCard key={post.id} post={post} onDeleteClick={() => handleDelete(post)} />
          )
        })}
    </div>
    <div className="py-5 flex justify-center items-center space-x-3">

      {paginationCount > 1 && searchResult.length && paginationArr.map((_, i) => {
        return <button key={i} className={i === pageNo ? 'text-blue-500 border-b-2 border-b-blue-500' : 'text-gray-500'}
          onClick={() => setPageNo(i)} >{i + 1}</button>
      })}
    </div>
  </div>
}
