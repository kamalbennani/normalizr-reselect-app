import { schema } from 'normalizr';

// Schemas
export const userSchema = new schema.Entity('users', {}, {
  idAttribute: 'email',
});
