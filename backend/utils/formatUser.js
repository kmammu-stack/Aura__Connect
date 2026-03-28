function formatUserForViewer(user) {
    if (user.mode === "anonymous") {
        return {
            userId: user._id,
            name: null,
            interests: user.interests,
            auraScore: user.auraScore,
            mode: user.mode,
        };
    }

    return {
        userId: user._id,
        name: user.name,
        interests: user.interests,
        auraScore: user.auraScore,
        mode: user.mode,
    };
}

module.exports = { formatUserForViewer };