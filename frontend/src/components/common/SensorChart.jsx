import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';
  
  const dummyData = [
    { time: '08:00', suhu: 28, kelembaban: 60 },
    { time: '09:00', suhu: 29, kelembaban: 63 },
    { time: '10:00', suhu: 30, kelembaban: 65 },
    { time: '11:00', suhu: 32, kelembaban: 67 },
  ];
  
  export default function SensorChart() {
    return (
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={dummyData}
          margin={{ top: 10, right: 10, left: -30, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              borderRadius: 10,
              border: '1px solid #ddd',
            }}
            labelStyle={{ fontWeight: 'bold' }}
            formatter={(value, name) => [
              `${value}${name === 'suhu' ? '°C' : '%'}`,
              name === 'suhu' ? 'Suhu' : 'Kelembaban',
            ]}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="suhu"
            stroke="#FF6B6B"
            strokeWidth={2}
            dot={{ r: 4 }}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          />
          <Line
            type="monotone"
            dataKey="kelembaban"
            stroke="#4ECDC4"
            strokeWidth={2}
            dot={{ r: 4 }}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  