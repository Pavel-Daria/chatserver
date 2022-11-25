const {getDb} = require("./db");

const TABLE_NAME = "topics";

module.exports = {
    getAllTopics: async () => {
        return getDb().all(`SELECT * FROM ${TABLE_NAME}`);
    },
    getTopicById: async (id) => {
        return getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, id);
    },
    createTopic: async (theme, userId) => {
        const newTopic = {
            theme,
            userId,
            createdAt: new Date().getTime()
        };
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (theme, authorId, createdAt) VALUES (?, ?, ?)`,
            newTopic.theme, newTopic.userId, newTopic.createdAt
        );
        newTopic.id = result.lastID;
        return newTopic;
    },
}