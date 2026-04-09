import { fetchNoteById } from "@/lib/api"
import NotePreview from "./NotePreview.client"
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query"
export default async function ModalPages({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  )};