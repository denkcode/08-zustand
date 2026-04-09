'use client'


import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import css from '@/app/notes/[id]/NoteDetails.module.css'
import type { Note } from '@/types/note'



import { fetchNoteById } from "@/lib/api";

 export default function NoteDetails() {
     const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError} = useQuery<Note> ({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>
  if (isError || !data) return <p>Something went wrong.</p>

  return (
    <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>{data.title}</h2>
	  </div>
      <p className={css.tag}>{data.tag}</p>
	  <p className={css.content}>{data.content}</p>
	  <p className={css.date}>{data.createdAt}</p>
	</div>
</div>

  )
 }
 