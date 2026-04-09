'use client'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import type { Note } from '@/types/note'
import Modal from "@/components/Modal/Modal"
import { useRouter } from 'next/navigation';



const NotePreview = ()  => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery<Note>({
  queryKey: ['note', id],
  queryFn: () => fetchNoteById(id),
  refetchOnMount: false,
})
  const router = useRouter();
  
  const close = () => router.back();
  if (isLoading) return <p>Loading...</p>
if (isError || !data) return <p>Something went wrong.</p>


  return (
  <Modal onClose={close}>
    <h2>{data.title}</h2>
    <p>{data.tag}</p>
    <p>{data.content}</p>
    <p>{data.createdAt}</p>
  </Modal>
)
};

export default NotePreview;