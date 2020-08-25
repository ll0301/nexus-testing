import { db } from './db'
import { schema } from 'nexus'
schema.addToContext(() => {
  return {
    db,
  }
})