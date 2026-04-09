import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { fetchNotes } from "@/lib/api"
import FilterView from "./Notes.client"

interface NotesFiltersProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesFilters({ params }: NotesFiltersProps) {
  const { slug } = await params;
  const category = slug[0] === "all" ? '' : slug[0];
  
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, category],
    queryFn: () => fetchNotes(1, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilterView tag={category} />
    </HydrationBoundary>
  );
}