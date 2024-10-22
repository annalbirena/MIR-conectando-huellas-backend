import { PrismaClient } from '@prisma/client';

import type { Note } from './note.type';

const prisma = new PrismaClient();

export async function getAllNotes(): Promise<Note[]> {
  const notes = await prisma.note.findMany();
  return notes;
}

export async function getOneNoteById(id: string): Promise<Note | null> {
  const note = await prisma.note.findUnique({
    where: { id },
  });
  return note;
}

export async function deleteNoteById(id: string): Promise<Note> {
  const noteDeleted = prisma.note.delete({
    where: { id },
  });

  return noteDeleted;
}

export async function createNote(note: Note): Promise<Note> {
  const newNote = await prisma.note.create({
    data: note,
  });

  return newNote;
}

export async function updateNoteById(
  id: string,
  noteToUpdate: Note,
): Promise<Note> {
  const noteUpdated = await prisma.note.update({
    where: { id },
    data: noteToUpdate,
  });

  return noteUpdated;
}
