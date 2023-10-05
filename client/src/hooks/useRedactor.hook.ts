import { createPost } from '@/services'
import { useState, type ChangeEventHandler, type FormEventHandler } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface UseRedactor {
  onTextareaChange: ChangeEventHandler<HTMLTextAreaElement>
  charactersLeft: number
  isContentValid: boolean
  submit: FormEventHandler<HTMLFormElement>
  submitting: boolean
}

const useRedactor = (
  parentId: string | null,
  onFinishSubmission = () => {}
): UseRedactor => {
  const navigate = useNavigate()

  const [content, setContent] = useState<string>('')
  const [submitting, setSubmitting] = useState<boolean>(false)

  const onTextareaChange: ChangeEventHandler<HTMLTextAreaElement> = (
    element
  ) => {
    const { value } = element.target

    setContent(value)
  }

  const charactersLeft = 140 - content.length

  const isContentValid = charactersLeft >= 0 && charactersLeft < 140

  const submit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    if (!isContentValid) return

    setSubmitting(true)

    createPost(content, parentId)
      .then((post) => {
        navigate(`/posts/${post.id}`)

        onFinishSubmission()
      })
      .catch((error) => {
        toast.error(error.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return {
    submit,
    charactersLeft,
    isContentValid,
    submitting,
    onTextareaChange,
  }
}

export default useRedactor
