export const IsBodyValid = (req, res, next) => {
    const { username} = req.body;
    if (!username) {
        return res.status(400).json({ message: "The user needs a username." });
    }
    next();
}