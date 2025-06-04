module.exports = (sequelize, DataTypes) => {
  const ChatMessage = sequelize.define("ChatMessage", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    roomId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    sender: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  ChatMessage.associate = (models) => {
    ChatMessage.belongsTo(models.ChatRoom, { foreignKey: "roomId" });
  };

  return ChatMessage;
};
