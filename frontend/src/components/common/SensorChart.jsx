import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  CartesianGrid,
} from 'recharts';
import { Box, Typography } from '@mui/material';

// Custom legend pakai MUI
const CustomLegend = () => (
  <Box display="flex" justifyContent="center" gap={3} mt={2}>
    <Box display="flex" alignItems="center" gap={1}>
      <Box
        sx={{
          width: 14,
          height: 14,
          backgroundColor: '#A4CA6F',
          borderRadius: 1,
        }}
      />
      <Typography variant="body2">Kelembapan</Typography>
    </Box>
    <Box display="flex" alignItems="center" gap={1}>
      <Box
        sx={{
          width: 14,
          height: 14,
          backgroundColor: '#70CA98',
          borderRadius: 1,
        }}
      />
      <Typography variant="body2">Suhu</Typography>
    </Box>
  </Box>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const now = new Date();
    const todayStr = now.toLocaleDateString('id-ID', {
      day: '2-digit', month: 'long', year: 'numeric'
    });

    const [hour, minute] = label.split(':');
    const timeObj = new Date();
    timeObj.setHours(parseInt(hour));
    timeObj.setMinutes(parseInt(minute));

    const timeStr = timeObj.toLocaleTimeString('id-ID', {
      hour: '2-digit', minute: '2-digit', hour12: false
    });

    const fullTimeStr = `${todayStr} ${timeStr}`;

    return (
      <Box p={1} sx={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: 1 }}>
        <Typography variant="body2" fontWeight="bold">
          {fullTimeStr}
        </Typography>
        <Typography variant="body2">Suhu: {payload[1].value} °C</Typography>
        <Typography variant="body2">Kelembapan: {payload[0].value} %</Typography>
      </Box>
    );
  }
  return null;
};

export default function SensorChart({ data = [] }) {
  // Urutan data 
  const sortedData = [...data].sort((a, b) => {
    const [aHour, aMinute] = a.time.split(':').map(Number);
    const [bHour, bMinute] = b.time.split(':').map(Number);
    return aHour !== bHour ? bHour - aHour : bMinute - aMinute; 
  }).reverse();

  return (
    <Box>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={sortedData} margin={{ top: 20, right: 0, left: -30, bottom: 0 }}>
          <defs>
            <linearGradient id="colorKelembaban" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A4CA6F" stopOpacity={1} />
              <stop offset="100%" stopColor="#A4CA6F" stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="colorSuhu" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#70CA98" stopOpacity={1} />
              <stop offset="100%" stopColor="#70CA98" stopOpacity={0.01} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="time"
            stroke="#000"
            tick={{ fill: '#000', fontSize: 11 }}
            tickMargin={8}
            minTickGap={15}
          />

          <YAxis
            stroke="#000"
            tick={{ fill: '#000', fontSize: 12 }}
            domain={[0, 80]}
            tickMargin={8}
          />

          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="kelembaban"
            stroke="#A4CA6F"
            fill="url(#colorKelembaban)"
            name="Kelembapan"
          />
          <Area
            type="monotone"
            dataKey="suhu"
            stroke="#70CA98"
            fill="url(#colorSuhu)"
            name="Suhu"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend di luar chart */}
      <CustomLegend />
    </Box>
  );
}
