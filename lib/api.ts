import axios from 'axios'
import type { Note, NoteTag } from '../types/note'
const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface FetchNotesResponse {
    notes: Note[],
    totalPages: number
}

export const fetchNotes = async (
    page: number,
    search: string,
    tag?: string
): Promise<{ notes: Note[]; totalPages: number }> => {
    const response = await axios.get<FetchNotesResponse>(
        `${BASE_URL}/notes`,
        {
            params: {
                search,
                page,
                ...(tag ? { tag } : {}),
                perPage: 12,
            },

            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }
    );
    return response.data;
};

export interface CreateNoteData {
    title: string,
    content: string,
    tag: NoteTag
}

export const createNote = async (data: CreateNoteData): Promise<Note> => {
    const response = await axios.post<Note>(
        `${BASE_URL}/notes`,
        data,
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }
    );
    return response.data
}

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await axios.delete<Note>(
        `${BASE_URL}/notes/${id}`,
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }

    );
    return response.data
}

export const fetchNoteById = async (
    id: string,
): Promise<Note> => {
    const response = await axios.get<Note>(
        `${BASE_URL}/notes/${id}`,
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }
      );
    return response.data
};