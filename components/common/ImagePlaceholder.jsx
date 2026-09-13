import { cn } from "@/lib/utils";
import styles from "./ImagePlaceholder.module.css";

const GRADIENTS = [
  ["#0b6e4f", "#14a44d"],
  ["#ff7a00", "#ffb35c"],
  ["#0b6e4f", "#0d9a6c"],
  ["#3a3a3a", "#5c5c5c"],
  ["#0b6e4f", "#ff7a00"],
  ["#084d38", "#0b6e4f"],
];

function hashString(str = "") {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function ImagePlaceholder({ label = "", icon: Icon, className, ratio = "landscape" }) {
  const idx = hashString(label) % GRADIENTS.length;
  const [from, to] = GRADIENTS[idx];
  const initials = label
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(styles.placeholder, styles[ratio], className)}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      role="img"
      aria-label={label}
    >
      {Icon ? <Icon size={28} strokeWidth={1.5} className={styles.icon} /> : (
        <span className={styles.initials}>{initials || "CD"}</span>
      )}
    </div>
  );
}
