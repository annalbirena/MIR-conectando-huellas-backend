import type { NextFunction, Request, Response } from 'express';

import {
  createNote,
  deleteNoteById,
  getAllNotes,
  getOneNoteById,
  updateNoteById,
} from './note.service';
import type { Note } from './note.type';

export async function getAllNotesHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const notes = await getAllNotes();
  res.json(notes);
}

export async function getOneNoteHandler(req: Request, res: Response) {
  const { id } = req.params;
  const note = await getOneNoteById(id);

  if (!note) {
    res.status(404).json({
      error: `Note with id:${id} not found`,
    });
  } else {
    res.json(note);
  }
}

export async function deleteNoteHandler(req: Request, res: Response) {
  const { id } = req.params;

  const confirmTransaction = await deleteNoteById(id);

  res.status(200).json(confirmTransaction);
}

export async function createNoteHandler(req: Request, res: Response) {
  const data = req.body as Note;

  if (!data.content) {
    res.status(400).json({
      error: 'content missing',
    });
  } else {
    const newNote = await createNote(data);
    res.status(201).json(newNote);
  }
}

export async function updateNoteHandler(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body as Note;
  const updatedNote = await updateNoteById(id, data);

  if (!updatedNote) {
    res.status(404).json({
      message: `Note with id:${id} not found`,
    });
  } else {
    res.json(updatedNote);
  }
}
