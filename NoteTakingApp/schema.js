import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers.js';
const typeDefs = `
 type Note {
  _id: ID!
  title: String!,
  date: Date,
  content: String!
 }
scalar Date
type Query {
    getNote(_id: ID!): Note
  allNotes: [Note]
 }
 input NoteInput{
     title:String!,
     content:String!
 }

 type Mutation {
  createNote(input: NoteInput) : Note
  updateNote(_id: ID!, input: NoteInput): Note
  deleteNote(_id: ID!) : Note

 }
`;
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
export default schema;
