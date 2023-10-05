import { create } from 'zustand'

interface ModalStoreState {
  isModalVisible: boolean
  openModal: (component: JSX.Element) => void
  closeModal: () => void
  modalComponent: JSX.Element | null
}

const useModalStore = create<ModalStoreState>((set) => {
  return {
    isModalVisible: false,
    openModal: (component) => {
      set({ isModalVisible: true, modalComponent: component })
    },
    closeModal: () => {
      set({ isModalVisible: false, modalComponent: null })
    },
    modalComponent: null,
  }
})

export default useModalStore
