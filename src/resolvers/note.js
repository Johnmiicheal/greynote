export async function author(note, args, { models }) {
    return await models.User.findById(note.author);
}
export async function favoritedBy(note, args, { models }) {
    return await models.User.find({ _id: { $in: note.favoritedBy } });
}