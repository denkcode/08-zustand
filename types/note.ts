export type NoteTag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

export interface Note {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    tag: NoteTag
}

export type Props = {
  params: Promise<{ id: string }>
}

export interface NewNotePayload {
  title: string;
  content: string;
  tag: NoteTag
}