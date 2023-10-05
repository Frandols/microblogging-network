import { useModalStore } from '@/stores'
import { type FC } from 'react'
import { HiXMark } from 'react-icons/hi2'
import styles from './modal.component.module.css'

const Modal: FC = () => {
  const { isModalVisible, closeModal, modalComponent } = useModalStore(
    (state) => ({
      isModalVisible: state.isModalVisible,
      closeModal: state.closeModal,
      modalComponent: state.modalComponent,
    })
  )

  if (!isModalVisible) return null

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={closeModal}>
          <HiXMark size={24} />
        </button>
        {modalComponent}
      </div>
    </div>
  )
}

export default Modal
