import css from './CreateNote.module.css'
import NoteForm from '@/components/NoteForm/NoteForm'
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Create new note",
  description: "Створіть нову нотатку для організації своїх думок та ідей.",
  openGraph: {
      title: "Create new note",
      description: "Створіть нову нотатку для організації своїх думок та ідей.",
      url: `https://notehub.com/notes/action/create`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
        }
      ]
    }
};

function CreateNote () {
    return (
        <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
     <NoteForm />
  </div>
</main>

    )
}
export default CreateNote