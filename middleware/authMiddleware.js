module.exports = (req, res, next) => {
    try {
        if (!req.session) {
            return res.status(401).json({ message: "Unauthorized: No active session" });
        }

        const { userType } = req.session;


        if (!userType) {
            return res.status(401).json({ message: "Unauthorized: No user type found" });
        }

        next();
    } catch (error) {
        console.error("❌ Authentication Middleware Error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = (req, res, next) => {
    console.log("✅ Auth Middleware: Checking session data...", req.session);
    if (!req.session || !req.session.student) {
        console.log("❌ No valid session. Redirecting to login...");
        return res.redirect("/auth/login");
    }
    console.log("✅ Session found:", req.session.student);
    next();
};

