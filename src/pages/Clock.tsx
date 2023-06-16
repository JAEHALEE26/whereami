import { FC } from "react";

export type ClockProps = {
  today: Date;
};

const Clock: FC<ClockProps> = ({ today }) => {
  return (
    <p id="clock" style={{ marginBottom: "10px" }}>
      현재 시각: <span>{today.toLocaleString()}</span>
    </p>
  );
};

export default Clock;
