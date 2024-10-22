import { z } from 'zod';

export const createNoteSchema = z.object({
  body: z.object({
    content: z.string({
      required_error: 'Content is required',
    }),
    important: z.optional(
      z.boolean({
        invalid_type_error: 'important must be a boolean',
      }),
    ),
  }),
});
