export async function notes(user, args, { models }) {
    return await models.Note.find({ author: user._id }).sort({ _id: -1 });
}
export async function favorites(user, args, { models }) {
    return await models.Note.find({ favoritedBy: user._id }).sort({ _id: -1 });
}