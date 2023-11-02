import Button from '@/components/button/button.component'
import { type User } from '@/entities'
import { FormEvent, TextareaHTMLAttributes, useState, type FC } from 'react'
import styles from './redactor.component.module.css'

interface RedactorProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onSubmit'> {
  user: Pick<User, 'name' | 'avatar'>
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
}

const Redactor: FC<RedactorProps> = ({ user, onSubmit, ...props }) => {
  const [charactersLeft, setCharactersLeft] = useState<number>(
    props.defaultValue ? 140 - props.defaultValue.toString().length : 140
  )
  const [submitting, setSubmitting] = useState<boolean>(false)

  const isContentValid = charactersLeft >= 0 && charactersLeft < 140

  return (
    <form
      className={styles.redactor}
      onSubmit={(form) => {
        setSubmitting(true)

        onSubmit(form).catch(() => {
          setSubmitting(false)

          form.currentTarget.reset()
        })
      }}
    >
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
          onChange={(element) => {
            setCharactersLeft(140 - element.target.value.length)
          }}
          name='content'
          rows={2}
          {...props}
        ></textarea>
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
