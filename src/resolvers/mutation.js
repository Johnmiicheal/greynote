import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Types } from 'mongoose';

import { AuthenticationError, ForbiddenError } from 'apollo-server-express';

require('dotenv').config();
import gravatar from '../util/gravatar';


export async function newNote(parent, args, { models, user }) {
    if (!user) {
        throw new AuthenticationError('You must be signed in to create a note');
    }
    return await models.Note.create({
        content: args.content,
        author: Types.ObjectId(user.id)
    });
}
export async function deleteNote(parent, { id }, { models, user }) {
    if (!user) {
        throw new AuthenticationError('You must be signed in to delete a note');
    }
    const note = await models.Note.findById(id);
    if (note && String(note.author) !== user.id) {
        throw new ForbiddenError("You don't have permissions to delete the note");
    }
    try {
        await note.remove();
        return true;
    } catch (err) {
        return false;
    }
}
export async function updateNote(parent, { content, id }, { models, user }) {
    if (!user) {
        throw new AuthenticationError('You must be signed in to update a note');
    }
    const note = await models.Note.findById(id);
    if (note && String(note.author) !== user.id) {
        throw new ForbiddenError("You don't have permissions to update the note");
    }
    return await models.Note.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $set: {
                content
            }
        },
        {
            new: true
        }
    );
}
export async function signUp(parent, { username, email, password }, { models }) {
    email = email.trim().toLowerCase();
    const hashed = await hash(password, 10);
    const avatar = gravatar(email);
    try {
        const user = await models.User.create({
            username,
            email,
            avatar,
            password: hashed
        });

        return sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
        console.log(err);
        throw new Error('Error creating account');
    }
}
export async function signIn(parent, { username, email, password }, { models }) {
    if (email) {
        email = email.trim().toLowerCase();
    }
    const user = await models.User.findOne({
        $or: [{ email }, { username }]
    });

    if (!user) {
        throw new AuthenticationError('Invalid Username or Password');
    }

    const valid = await compare(password, user.password);
    if (!valid) {
        throw new AuthenticationError('Invalid Username or Password');
    }

    return sign({ id: user._id }, process.env.JWT_SECRET);
}
export async function toggleFavorite(parent, { id }, { models, user }) {
    if (!user) {
        throw new AuthenticationError();
    }

    // Check if user has "favorited" the note
    let noteCheck = await models.Note.findById(id);
    const hasUser = noteCheck.favoritedBy.indexOf(user.id);

    /* if user exists in the list...remove the user from the list
    and reduce the favoriteCount by 1 */
    if (hasUser >= 0) {
        return await models.Note.findByIdAndUpdate(
            id, {
            $pull: { favoritedBy: Types.ObjectId(user.id) },
            $inc: { favoriteCount: -1 }
        },
            { new: true } // Set new to true to return updated list
        );
    } else { // If user does not exist in the list, add and increase count by 1
        return await models.Note.findByIdAndUpdate(
            id, {
            $push: { favoritedBy: Types.ObjectId(user.id) },
            $inc: { favoriteCount: 1 }
        },
            { new: true }
        );
    }
}

