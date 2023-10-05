import Button from '@/components/button/button.component'
import { type Post, type User } from '@/entities'
import useRedactor from '@/hooks/useRedactor.hook'
import { type FC } from 'react'
import styles from './redactor.component.module.css'

interface RedactorProps {
  user: Pick<User, 'id' | 'name' | 'avatar'>
  postBeingReplyed?: (Pick<Post, 'id'> & { user: Pick<User, 'name'> }) | null
  onFinishSubmission?: () => void
}

const Redactor: FC<RedactorProps> = ({
  user,
  postBeingReplyed,
  onFinishSubmission,
}) => {
  const {
    onTextareaChange,
    charactersLeft,
    isContentValid,
    submit,
    submitting,
  } = useRedactor(postBeingReplyed?.id, onFinishSubmission)

  if (user == null)
    return (
      <div className={styles.unauthenticatedUserAdvice}>
        <p className={styles.legend}>To create a post you need to sign in</p>
      </div>
    )

  return (
    <form className={styles.redactor} onSubmit={submit}>
      <img
        className={styles.avatar}
        src={user.avatar}
        alt={`${user.name} GitHub Avatar`}
        width={40}
        height={40}
      />
      <section className={styles.body}>
        <textarea
          className={styles.textarea}
          onChange={onTextareaChange}
          name='content'
          rows={2}
          placeholder={
            postBeingReplyed !== undefined && postBeingReplyed !== null
              ? `Reply to ${postBeingReplyed.user.name}...`
              : "What's on your mind?"
          }
        />
        <footer className={styles.footer}>
          <p
            className={styles.charactersLeft}
            style={{
              color: isContentValid ? 'var(--primary)' : 'var(--danger)',
            }}
          >
            {charactersLeft < 140 ? charactersLeft : ''}
          </p>
          <Button
            className={styles.submit}
            type='submit'
            size='sm'
            disabled={submitting || !isContentValid}
          >
            Submit
          </Button>
        </footer>
      </section>
    </form>
  )
}

export default Redactor
