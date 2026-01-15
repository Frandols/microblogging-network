import { toggleLike } from '@/services'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

interface UsePostLikeProps {
  postId: string
  initialLikedByMe: boolean
  initialLikesCount: number
}

const usePostLike = ({
  postId,
  initialLikedByMe,
  initialLikesCount,
}: UsePostLikeProps) => {
  const [likedByMe, setLikedByMe] = useState(initialLikedByMe)
  const [likesCount, setLikesCount] = useState(initialLikesCount)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setLikedByMe(initialLikedByMe)
    setLikesCount(initialLikesCount)
  }, [initialLikedByMe, initialLikesCount])

  const handleToggleLike = async () => {
    const previousLiked = likedByMe
    const previousCount = likesCount

    const newLiked = !previousLiked
    const newCount = newLiked ? previousCount + 1 : previousCount - 1

    setLikedByMe(newLiked)
    setLikesCount(newCount)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
      return
    }

    timeoutRef.current = setTimeout(() => {
      toggleLike(postId).catch((error) => {
        setLikedByMe(previousLiked)
        setLikesCount(previousCount)
        toast.error(error.message)
      })
      timeoutRef.current = null
    }, 500)
  }

  return { likedByMe, likesCount, handleToggleLike }
}

export default usePostLike
