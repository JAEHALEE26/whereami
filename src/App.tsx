import "./App.css";
import { useClock } from "./hooks";
import Clock from "./pages/Clock";
import Location from "./pages/Location";

export default function App() {
  const today = useClock();
  return (
    <div>
      <Location />
    </div>
  );
}
