module.exports = (sequelize, DataTypes) => {
        const LaporanPembayaran = sequelize.define('LaporanPembayaran', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        jenisPembayaran: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        jumlah: { 
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        periodePembayaran: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        buktiBayarUrl: { 
            type: DataTypes.STRING,
            allowNull: true, 
        },
        tanggalPembayaran:{ 
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
        timestamps:true,
        });
    
        return LaporanPembayaran;
    };
