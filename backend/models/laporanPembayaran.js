module.exports = (sequelize, DataTypes) => {
        const LaporanPembayaran = sequelize.define('LaporanPembayaran', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        jenisPembayaran: { // Jenis pembayaran (BCA, Dana, OVO, dll)
            type: DataTypes.STRING,
            allowNull: false,
        },
        jumlah: { // Jumlah pembayaran
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        periodePembayaran: { // Periode pembayaran (misal April / Januari - Maret)
            type: DataTypes.STRING,
            allowNull: false,
        },
        buktiBayarUrl: { // URL gambar bukti bayar
            type: DataTypes.STRING,
            allowNull: true, 
        },
        tanggalPembayaran:{ // Tanggal pembayaran
            type : DataTypes.DATE,
            allowNull : false 
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'pending'
          }          
        }, {
        tableName:'laporan_pembayarans',
        timestamps:true,// auto createdAt & updatedAt 
        });
    
        return LaporanPembayaran;
    };
