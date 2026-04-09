'use client'
import css from '@/components/NoteForm/NoteForm.module.css'
import { createNote } from '@/lib/api';
import { NoteTag } from '@/types/note'
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from '@/lib/store/noteStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
    const router = useRouter();
  const queryClient = useQueryClient()
  const mutation = useMutation({        
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      clearDraft()
      router.back()
    }
  })


    async function formAction(formData: FormData) {
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const tag = formData.get("tag") as NoteTag
    mutation.mutate({ title, content, tag })
    }
        return (
        <form action={formAction} className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <input defaultValue={draft.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, title: e.target.value })} id="title" type="text" name="title" className={css.input} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <textarea defaultValue={draft.content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraft({ ...draft, content: e.target.value })}
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
    />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <select defaultValue={draft.tag} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDraft({ ...draft, tag: e.target.value as NoteTag })} id="tag" name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={() => router.back()}>
      Cancel
    </button>
    <button
    
      type="submit"
      className={css.submitButton}
      disabled={false}
    >
      Create note
    </button>
  </div>
</form>
    )
}