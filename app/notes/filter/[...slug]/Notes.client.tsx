'use client'
import Link from 'next/link'
import css from '@/app/App.module.css'
import NoteList from '@/components/NoteList/NoteList'
import { useDebouncedCallback } from 'use-debounce'
import { useState } from 'react'
import Pagination from '@/components/Pagination/Pagination';
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchNotes, FetchNotesResponse } from '@/lib/api'
import Loader from '@/components/Loader/Loader'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import SearchBox from '@/components/SearchBox/SearchBox'

interface PropsViewFilter {
    tag: string
}

export default function Notes({ tag }: PropsViewFilter) {
      const [search, setSearch] = useState('')
      const [page, setPage] = useState(1);
      const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
        queryKey: ['notes', page, search, tag],
        queryFn: () => fetchNotes(page, search, tag),
        placeholderData: keepPreviousData,
})
    const [inputValue, setInputValue] = useState('');
      const debouncedSearch = useDebouncedCallback((value: string) => {
      setSearch(value);
      setPage(1)
      }, 300);
    return (
          <div className={css.app}>
	        <header className={css.toolbar}>
		    <SearchBox value={inputValue} onChange={(value) => {
            setInputValue(value);
            debouncedSearch(value);
            }} />
            <Link href="/notes/action/create">Create note+</Link>
            </header>
  {isLoading && <Loader />}
  {isError && <ErrorMessage message="Something went wrong!"/>}
  {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
  {data && data?.totalPages > 1 && (
  <Pagination
    totalPages={data?.totalPages}
    page={page}
    onPageChange={({ selected }) => setPage(selected + 1)}
  />
)}
</div>

    )
}


