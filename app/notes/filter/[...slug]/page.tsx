import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { fetchNotes } from "@/lib/api"
import FilterView from "./Notes.client"
import { Metadata } from "next";

interface NotesFiltersProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: NotesFiltersProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Notes: ${slug[0]}`,
    description: `Notes filtered by ${slug[0]}`,
    openGraph: {
      title: `Notes: ${slug[0]}`,
      description: `Notes filtered by ${slug[0]}`,
      url: `https://notehub.com/notes/filter/${slug[0]}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
        }
      ]

    }
  }
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