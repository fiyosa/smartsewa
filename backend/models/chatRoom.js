module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define("ChatRoom", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    }
  });

  ChatRoom.associate = (models) => {
    ChatRoom.belongsTo(models.User, { foreignKey: "userId" });
    ChatRoom.hasMany(models.ChatMessage, { foreignKey: "roomId" });
  };

  return ChatRoom;
};
