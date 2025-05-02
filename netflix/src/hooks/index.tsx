import { useEffect, useState } from 'react'

export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export const useModal = <T,>() => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<T | null>(null)
  const [isPlayer, setIsPlayer] = useState<boolean>(false)

  const openModal = (item: T, isPlayer: boolean = false) => {
    setSelectedItem(item)
    setIsModalOpen(true)
    setIsPlayer(isPlayer)
  }

  const closeModal = () => {
    setSelectedItem(null)
    setIsModalOpen(false)
  }

  return {
    isModalOpen,
    selectedItem,
    isPlayer,
    openModal,
    closeModal,
  }
}
