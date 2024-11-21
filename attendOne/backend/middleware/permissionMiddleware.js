module.exports = function permit(...allowedRoles) {
    return (req, res, next) => {
        const user = req.user;
        if (user && allowedRoles.includes(user.role)) {
            next();
        } else {
            res.status(403).json({ error: 'Forbidden' });
        }
    };
};