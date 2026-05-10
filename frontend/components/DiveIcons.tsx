import React from 'react';
import {
  Moon, Sun, Trophy, BookOpen, Waves, Target, Lightbulb, Eye, EyeOff,
  Trash2, Download, Folder, CheckCircle2, X, Clock, Lock, GraduationCap,
  Crown, PartyPopper, Sparkles, Volume2, Camera, Video, PenLine, Film,
  Scale, Image, Recycle, Monitor, DoorOpen, Handshake, Star, FileText,
  Medal, Award, Fish, Clapperboard, Scroll, Rocket, Package, BarChart2,
  Gift, Leaf, Users, File, BookOpenText, CheckCheck, ChevronLeft, ChevronRight,
  Info, MousePointer2, Mouse, ZoomIn, PlayCircle, AlertTriangle, Shield,
} from 'lucide-react';

type IconProps = { size?: number; className?: string };

export function CoralIcon({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <line x1="12" y1="22" x2="12" y2="15" />
      <path d="M9 22 Q12 20.5 15 22" />
      <line x1="12" y1="17.5" x2="6.5" y2="12" />
      <line x1="12" y1="17.5" x2="17.5" y2="12" />
      <line x1="6.5" y1="12" x2="4.5" y2="7.5" />
      <line x1="6.5" y1="12" x2="8.5" y2="7.5" />
      <line x1="17.5" y1="12" x2="15.5" y2="7.5" />
      <line x1="17.5" y1="12" x2="19.5" y2="7.5" />
      <circle cx="4.5" cy="6.5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="6.5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="6.5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="19.5" cy="6.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TurtleIcon({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <ellipse cx="12" cy="13" rx="5.5" ry="6" />
      <path d="M9.5 10.5 Q12 9 14.5 10.5" />
      <path d="M8.5 13 Q12 11.5 15.5 13" />
      <circle cx="12" cy="5.5" r="2" />
      <path d="M10.5 7.3 L10 8" />
      <path d="M13.5 7.3 L14 8" />
      <path d="M6.8 9.5 Q4.5 8.5 3.5 10 Q4 11.5 6.3 11.5" />
      <path d="M17.2 9.5 Q19.5 8.5 20.5 10 Q20 11.5 17.7 11.5" />
      <path d="M6.8 16.5 Q4.5 17.5 3.5 16 Q4 14.5 6.3 14.5" />
      <path d="M17.2 16.5 Q19.5 17.5 20.5 16 Q20 14.5 17.7 14.5" />
      <path d="M12 19.5 L12 21" />
    </svg>
  );
}

export function CrabIcon({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <ellipse cx="12" cy="14" rx="5.5" ry="4" />
      <ellipse cx="12" cy="10.5" rx="3.5" ry="2.5" />
      <circle cx="10.5" cy="9.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="9.5" r="0.75" fill="currentColor" stroke="none" />
      <path d="M7 13 Q4.5 11.5 3.5 9.5 Q3 8 4 7.5 Q5 7.5 5.5 9.5" />
      <path d="M17 13 Q19.5 11.5 20.5 9.5 Q21 8 20 7.5 Q19 7.5 18.5 9.5" />
      <line x1="8.5" y1="16.5" x2="6.5" y2="19" />
      <line x1="10" y1="17.5" x2="9" y2="20.5" />
      <line x1="15.5" y1="16.5" x2="17.5" y2="19" />
      <line x1="14" y1="17.5" x2="15" y2="20.5" />
    </svg>
  );
}

export function JellyfishIcon({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M5.5 12 Q5.5 4 12 4 Q18.5 4 18.5 12" />
      <path d="M5.5 12 Q8 13.5 10.5 12 Q12 11 13.5 12 Q16 13.5 18.5 12" />
      <path d="M7.5 12 Q6.5 15.5 7.5 19" />
      <path d="M10.5 12 Q9.5 16 10.5 20.5" />
      <path d="M13.5 12 Q14.5 16 13.5 20.5" />
      <path d="M16.5 12 Q17.5 15.5 16.5 19" />
      <circle cx="9.5" cy="8.5" r="0.9" fill="currentColor" stroke="none" opacity="0.6" />
      <circle cx="14.5" cy="7.5" r="0.9" fill="currentColor" stroke="none" opacity="0.6" />
    </svg>
  );
}

export function BubbleIcon({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75"
      className={className}>
      <circle cx="12" cy="17" r="3.5" />
      <circle cx="17.5" cy="10.5" r="2.5" />
      <circle cx="7.5" cy="9" r="3" />
      <circle cx="15.5" cy="4.5" r="1.7" />
    </svg>
  );
}

const iconMap: Record<string, React.ComponentType<IconProps>> = {
  moon: Moon,
  sun: Sun,
  trophy: Trophy,
  book: BookOpen,
  'book-open': BookOpen,
  reading: BookOpenText,
  waves: Waves,
  target: Target,
  lightbulb: Lightbulb,
  eye: Eye,
  'eye-off': EyeOff,
  trash: Trash2,
  download: Download,
  folder: Folder,
  check: CheckCircle2,
  checkcheck: CheckCheck,
  close: X,
  clock: Clock,
  lock: Lock,
  graduation: GraduationCap,
  crown: Crown,
  party: PartyPopper,
  sparkles: Sparkles,
  volume: Volume2,
  camera: Camera,
  video: Video,
  penline: PenLine,
  film: Film,
  scale: Scale,
  image: Image,
  recycle: Recycle,
  monitor: Monitor,
  door: DoorOpen,
  handshake: Handshake,
  star: Star,
  filetext: FileText,
  medal: Medal,
  award: Award,
  fish: Fish,
  clapperboard: Clapperboard,
  scroll: Scroll,
  rocket: Rocket,
  package: Package,
  chart: BarChart2,
  gift: Gift,
  leaf: Leaf,
  users: Users,
  file: File,
  coral: CoralIcon,
  turtle: TurtleIcon,
  crab: CrabIcon,
  jellyfish: JellyfishIcon,
  bubble: BubbleIcon,
};

export function DiveIcon({ icon, size = 24, className = '' }: { icon: string; size?: number; className?: string }) {
  const Component = iconMap[icon];
  if (Component) return <Component size={size} className={className} />;
  return <span style={{ fontSize: size * 0.85, lineHeight: 1 }} className={className}>{icon}</span>;
}

export {
  Moon, Sun, Trophy, BookOpen, Waves, Target, Lightbulb, Eye, EyeOff,
  Trash2, Download, Folder, CheckCircle2, X, Clock, Lock, GraduationCap,
  Crown, PartyPopper, Sparkles, Volume2, Camera, Video, PenLine, Film,
  Scale, Image, Recycle, Monitor, DoorOpen, Handshake, Star, FileText,
  Medal, Award, Fish, Clapperboard, Scroll, Rocket, Package, BarChart2,
  Gift, Leaf, Users, File, BookOpenText, CheckCheck, ChevronLeft, ChevronRight,
  Info, MousePointer2, Mouse, ZoomIn, PlayCircle, AlertTriangle, Shield,
};
