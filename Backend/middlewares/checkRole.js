export function checkRole(roles) {
    return (req, res, next) => {
        try {
            const {user} = req 
            const isAuthorised = roles.includes(user.role);
            if (isAuthorised) {
                    next()
            }
            
            // Check if the user's role is included in the allowed roles array
             else {
                return res.status(403).send({ error: "Access Denied" }); // Access Denied
            }

        } catch (error) {
            return res.status(500).send({ message: "Server error", error: error.message });
        }
    };
}