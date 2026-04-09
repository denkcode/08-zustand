'use client'
import css from '@/app/App.module.css'
import { useState } from 'react'
import Modal from '@/components/Modal/Modal';
import { useDebouncedCallback } from 'use-debounce'
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteForm from '@/components/NoteForm/NoteForm';

interface Props {
    onSearch: (value: string) => void
    search: string
}

export default function NotesToolBar({ onSearch, search }: Props) {
        const [inputValue, setInputValue] = useState('');
      const debouncedSearch = useDebouncedCallback((value: string) => {
      onSearch(value);
      }, 300);
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className={css.app}>
	        <header className={css.toolbar}>
		    <SearchBox value={inputValue} onChange={(value) => {
            setInputValue(value);
            debouncedSearch(value);
            }} />
		    <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +</button>
            </header>
            {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)} />
            </Modal>
            )}
        </div>
    )

}