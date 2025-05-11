const db = require('../models'); 
const SensorData = db.SensorData;
const User = db.User; 

exports.receiveSensorData = async (req, res) => {
  try {
    const { deviceId, timestamp, sensorData } = req.body;

    if (!deviceId || !timestamp || !Array.isArray(sensorData)) {
      return res.status(400).json({ message: "Data tidak lengkap." });
    }

    const dataToInsert = sensorData.map(item => ({
      deviceId,
      kamar: item.kamar,
      suhu: item.suhu,
      kelembapan: item.kelembapan,
      suara: item.suara,
      timestamp
    }));
console.log("SensorData model loaded?", !!SensorData);

    await SensorData.bulkCreate(dataToInsert);

    res.status(201).json({ message: "Data sensor berhasil disimpan." });
  } catch (error) {
    console.error("Gagal simpan data sensor:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getMonitoringByRoom = async (req, res) => {
  const kamar = req.query.kamar;

  if (!kamar) return res.status(400).json({ message: "Kamar tidak boleh kosong" });

  try {
    // cari user berdasarkan no_room
    const user = await User.findOne({ where: { no_room: kamar } });

    // ambil data sensor terbaru (misalnya 10 data terakhir)
    const sensor = await SensorData.findAll({
      where: { kamar },
      order: [['timestamp', 'DESC']],
      limit: 10
    });

    res.json({ user, sensor });
  } catch (err) {
    console.error("Gagal ambil monitoring:", err);
    res.status(500).json({ message: "Server error" });
  }
};