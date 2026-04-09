'use client'
import css from '@/app/App.module.css'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import SearchBox from '@/components/SearchBox/SearchBox';


interface Props {
    onSearch: (value: string) => void
    search: string
}

export default function NotesToolBar({ onSearch }: Props) {
        const [inputValue, setInputValue] = useState('');
      const debouncedSearch = useDebouncedCallback((value: string) => {
      onSearch(value);
      }, 300);
    return (
        <div className={css.app}>
	        <header className={css.toolbar}>
		    <SearchBox value={inputValue} onChange={(value) => {
            setInputValue(value);
            debouncedSearch(value);
            }} />
            </header>
        </div>
    )

}