import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        favoriteCount:{
            type: Number,
            default: 0
        },
        favoritedBy: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        // To assign timestamps field with a date type
        timestamps: true
    }
);
// Notes model definition with the schema
const Note = model('Note', noteSchema);
export default Note;