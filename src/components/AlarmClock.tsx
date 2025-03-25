import React, {useState, useEffect, useRef} from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Time from "./Time";
import {keyframes} from '@emotion/react';
import styled from '@emotion/styled';

// 预设的闹钟时间
const presetAlarmTimes = [
  {hours: 7, minutes: 0},
  {hours: 9, minutes: 30},
  {hours: 12, minutes: 0},
  {hours: 14, minutes: 30},
  {hours: 17, minutes: 0},
  {hours: 19, minutes: 30},
  {hours: 22, minutes: 0},
  {hours: 23, minutes: 30},
];

// 闹钟铃声列表
const alarmSounds = [
  {value: '吱吱叫', label: '吱吱叫', src: '/src/assets/ring/吱吱叫.mp3'},
  {value: '死亡岛', label: '死亡岛', src: '/src/assets/ring/死亡岛.mp3'},
  {value: '进击的巨人', label: '进击的巨人', src: '/src/assets/ring/进击的巨人.mp3'},
  {value: '鸭子', label: '鸭子', src: '/src/assets/ring/鸭子.mp3'},
];

// 定义圆的半径
const RADIUS = 180;
const STROKE_WIDTH = 15;

// SVG 容器
const SvgContainer = styled.svg`
  height: ${(RADIUS * 2) + STROKE_WIDTH * 2}px;
  width: ${(RADIUS * 2) + STROKE_WIDTH * 2}px;
  display: block;
  margin: 0 auto;
`;

// 静态圆圈样式
const StaticCircle = styled.circle`
  fill: none;
  stroke: #91caff;
  stroke-width: ${STROKE_WIDTH};
`;

// 动态创建 keyframes 动画
const createKeyframes = (circumference: number) => keyframes`
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: ${circumference}; // 圆的周长
  }
`;

// 倒计时圆圈样式
const CountdownCircle = styled.circle<{ remainingTime: number; alarmTime: number }>`
  fill: none;
  stroke: #4096ff;
  stroke-width: ${STROKE_WIDTH};
  stroke-linecap: round;
  stroke-dasharray: ${2 * Math.PI * RADIUS}; // 圆的周长
  stroke-dashoffset: ${props => (2 * Math.PI * RADIUS) * (1 - props.remainingTime / props.alarmTime)};
  animation: ${() => createKeyframes(2 * Math.PI * RADIUS)} ${props => props.alarmTime}s linear forwards;
`;

const AlarmClock: React.FC = () => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [alarmTime, setAlarmTime] = useState<Date | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [alarmSound, setAlarmSound] = useState<string>(alarmSounds[0].src); // 默认选择第一个铃声
  const [alarmName, setAlarmName] = useState<string>('闹钟'); // 默认名称
  const [isAlarmActive, setIsAlarmActive] = useState<boolean>(false);
  const [alarmRecords, setAlarmRecords] = useState([]); // 存储所有设置的闹钟
  const [currentAlarm, setCurrentAlarm] =  useState<Date | null>(null); // 存储当前设置的闹钟


  const alarmTimeRef = useRef<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null); // 指定类型为 HTMLAudioElement


  // 处理闹钟时间的钩子
  useEffect(() => {
    if (alarmTime) {
      const id = window.setInterval(() => {
        const now = new Date();
        const timeDifference = alarmTime.getTime() - now.getTime();

        if (timeDifference <= 0) {
          // 确保 audioRef.current 存在且是 HTMLAudioElement
          if (audioRef.current) {
            audioRef.current.play().catch((error) => {
              console.error("播放铃声时出错：", error);
            }); // 添加错误处理
          }
          //alert('时间到！${alarmName}'); // 提示信息包含闹钟名称
          // 设置闹钟为活动状态
          setIsAlarmActive(true);
          setIntervalId(null); // 取消定时器
          setRemainingTime(0); // 重置倒计时
        } else {
          setRemainingTime(Math.ceil(timeDifference / 1000)); // 转换为秒
        }
      }, 1000);

      setIntervalId(id);

      return () => clearInterval(id);
    }
    return () => {
    };
  }, [alarmTime]);

  // 设置闹钟时间的函数
  const handleSetAlarm = () => {
    const now = new Date();
    const alarm = new Date();
    alarm.setHours(hours, minutes, 0, 0);
    if (alarm <= now) {
      alarm.setDate(now.getDate() + 1);
    }
    setAlarmTime(alarm);
    alarmTimeRef.current = Math.ceil((alarm.getTime() - now.getTime()) / 1000);
    setAlarmRecords((prev) => [...prev, alarm]); // 记录新的闹钟
    setCurrentAlarm(alarm)
  };

  // 贪睡逻辑
  const handleSnooze = () => {
    if (alarmTime) {
      if (audioRef.current) {
        audioRef.current.pause();  // 停止播放铃声
        audioRef.current.currentTime = 0; // 重置播放时间
      }
      const snoozeTime = new Date(alarmTime.getTime() + 10 * 60 * 1000); // 推迟10分钟
      setAlarmTime(snoozeTime);
      setRemainingTime(Math.ceil((snoozeTime.getTime() - new Date().getTime()) / 1000)); // 更新剩余时间
      setIsAlarmActive(false); // 关闭当前闹钟
    }
  };

  // 处理停止的点击事件
  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();  // 停止播放铃声
      audioRef.current.currentTime = 0; // 重置播放时间
    }
    setIsAlarmActive(false);  // 关闭闹钟，并保持剩余时间为 0
    setAlarmTime(null);   // 重置闹钟时间
    setRemainingTime(0); // 停止后重置闹钟
  };


  // 处理快速设置的点击事件
  const handlePresetClick = (preset: { hours: number; minutes: number }) => {
    setHours(preset.hours);
    setMinutes(preset.minutes);
    handleSetAlarm();
  };

  // 格式化时间为 `hh:mm:ss`
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime2 = (time) => {
    const date = new Date(time);
    // 获取小时和分钟，并格式化为两位数
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
      <Box width="100%" p={3} display="flex" flexDirection="column" alignItems="center">
        <Box width="100%">
          {alarmTime ? (
              <Box textAlign="center" mb={2} display="flex" flexDirection="column"
                   alignItems="center">
                <Box display="flex" justifyContent="center" alignItems="center"
                     position="relative">
                  <SvgContainer>
                    <StaticCircle cx={RADIUS + STROKE_WIDTH} cy={RADIUS + STROKE_WIDTH}
                                  r={RADIUS}/>
                    <CountdownCircle
                        cx={RADIUS + STROKE_WIDTH}
                        cy={RADIUS + STROKE_WIDTH}
                        r={RADIUS}
                        remainingTime={remainingTime}
                        alarmTime={alarmTimeRef.current}
                    />
                  </SvgContainer>
                  <Box sx={{
                    position: 'absolute',
                    textAlign: 'center',
                    top: '25%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    <Typography variant="h5">闹钟</Typography>
                  </Box>
                  <Box sx={{
                    position: 'absolute',
                    textAlign: 'center',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, 10%)'
                  }}>
                    <Typography variant="h2">{formatTime(remainingTime)}</Typography>
                  </Box>
                  <Box sx={{
                    position: 'absolute',
                    textAlign: 'center',
                    top: '60%',
                    left: '50%',
                    transform: 'translate(-50%, 10%)'
                  }}>
                    <Typography variant="h4">{formatTime2(alarmTime)}</Typography>
                  </Box>
                </Box>
              </Box>
          ) : (
              <>
                <Time/>
                <Box mb={2}>
                  <Typography variant="h5" align="left"
                              marginBottom="20px">设置在线闹钟</Typography>
                </Box>
                <Box display="flex" mb={2}>
                  <FormControl fullWidth sx={{mr: 1}}>
                    <InputLabel id="hours-label">小时</InputLabel>
                    <Select
                        labelId="hours-label"
                        value={hours.toString()}
                        label="小时"
                        onChange={(event: SelectChangeEvent<string>) => setHours(parseInt(event.target.value, 10))}
                    >
                      {[...Array(24).keys()].map(hour => (
                          <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ml: 1}}>
                    <InputLabel id="minutes-label">分钟</InputLabel>
                    <Select
                        labelId="minutes-label"
                        value={minutes.toString()}
                        label="分钟"
                        onChange={(event: SelectChangeEvent<string>) => setMinutes(parseInt(event.target.value, 10))}
                    >
                      {[...Array(60).keys()].map(minute => (
                          <MenuItem key={minute} value={minute}>{minute}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box mb={2}>
                  <Typography variant="h6" align="left" marginBottom="20px">快速设置</Typography>
                  <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                    {presetAlarmTimes.map((preset, index) => (
                        <Button
                            key={index}
                            variant="outlined"
                            startIcon={<AccessAlarmIcon/>}
                            onClick={() => handlePresetClick(preset)}
                            sx={{flex: '1 0 calc(25% - 8px)', mb: 1, mx: 0.5}}
                        >
                          {preset.hours.toString().padStart(2, '0')}:{preset.minutes.toString().padStart(2, '0')}
                        </Button>
                    ))}
                  </Box>
                </Box>
                <Box mb={2}>
                  <Typography variant="h6" align="left" marginBottom="20px">闹钟铃声</Typography>
                  <FormControl fullWidth>
                    <InputLabel id="sound-label">选择铃声</InputLabel>
                    <Select
                        labelId="sound-label"
                        value={alarmSound}
                        label="选择铃声"
                        onChange={(event: SelectChangeEvent<string>) => setAlarmSound(event.target.value)}
                    >
                      {alarmSounds.map((sound, index) => (
                          <MenuItem key={index}
                                    value={sound.src}>{sound.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box mb={2}>
                  <Typography variant="h6" align="left" marginBottom="20px">闹钟名称</Typography>
                  <TextField
                      fullWidth
                      label="闹钟名称"
                      variant="outlined"
                      value={alarmName}
                      onChange={(e) => setAlarmName(e.target.value)}
                  />
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: '#4096ff',
                      '&:hover': {backgroundColor: '#91caff'}
                    }}
                    onClick={handleSetAlarm}
                >
                  设置闹钟
                </Button>
              </>
          )}
          {alarmTime && (
              isAlarmActive ? (
                  // 在响铃时显示的界面
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button
                        variant="outlined"
                        onClick={handleSnooze}
                        sx={{
                          flex: 1,
                          marginRight: 1,
                          color: '#fff', // 保持按钮字体颜色为白色
                          backgroundColor: '#4096ff',
                          '&:hover': {backgroundColor: '#91caff'}
                        }}>贪睡</Button>
                    <Button variant="outlined" sx={{
                      flex: 1,
                      marginRight: 1,
                      color: '#fff', // 保持按钮字体颜色为白色
                      backgroundColor: '#d4380d',
                      '&:hover': {backgroundColor: '#ffccc7'}
                    }} onClick={handleStop} color="error">关闭闹钟</Button>
                  </Box>
              ) : (
                  // 当闹钟不响时显示的界面
                  <Box mt={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          backgroundColor: '#d4380d',
                          '&:hover': {backgroundColor: '#ffccc7'}
                        }}
                        onClick={() => {
                          setAlarmTime(null);
                          setRemainingTime(0); // Reset remaining time on alarm cancellation
                        }}
                    >
                      关闭闹钟
                    </Button>
                  </Box>
              )
          )}
          <audio ref={audioRef} src={alarmSound}/>
        </Box>
      </Box>
  );
};

export default AlarmClock;
