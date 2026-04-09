'use client'
import { useFormik } from 'formik';
import css from '@/components/NoteForm/NoteForm.module.css'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/lib/api'
import type { NoteTag } from '../../types/note';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

interface NoteFormProps {
  onClose: () => void;
}
export default function NoteForm({ onClose }: NoteFormProps) {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes']});
            onClose()
        },
    });
    const formik = useFormik({
    initialValues: {
        title: '',
        content: '',
        tag: 'Todo' as NoteTag,
    },
    validationSchema: Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required(),
}),
    onSubmit: (values) => {
        mutation.mutate(values);
    },
    });
        return (
        <form onSubmit={formik.handleSubmit} className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <input onBlur={formik.handleBlur} value={formik.values.title} onChange={formik.handleChange} id="title" type="text" name="title" className={css.input} />
    {formik.touched.title && formik.errors.title && (
  <ErrorMessage message={formik.errors.title} /> )}
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <textarea onBlur={formik.handleBlur} value={formik.values.content} onChange={formik.handleChange}
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
    />
    {formik.touched.content && formik.errors.content && (
  <ErrorMessage message={formik.errors.content} />
)}
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <select onBlur={formik.handleBlur} value={formik.values.tag} onChange={formik.handleChange} id="tag" name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
    {formik.touched.tag && formik.errors.tag && (
  <ErrorMessage message={formik.errors.tag} />
)}
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={onClose}>
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