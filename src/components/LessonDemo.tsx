import TypographyDemo from "./demos/TypographyDemo";
import SpacingDemo from "./demos/SpacingDemo";
import ColorsDemo from "./demos/ColorsDemo";
import SizingDemo from "./demos/SizingDemo";
import FlexboxDemo from "./demos/FlexboxDemo";
import GridDemo from "./demos/GridDemo";
import BordersDemo from "./demos/BordersDemo";
import ShadowsDemo from "./demos/ShadowsDemo";
import ResponsiveDemo from "./demos/ResponsiveDemo";
import StatesDemo from "./demos/StatesDemo";

const DEMO_MAP: Record<number, React.ComponentType> = {
  2: TypographyDemo,
  3: SpacingDemo,
  4: ColorsDemo,
  5: SizingDemo,
  6: FlexboxDemo,
  7: GridDemo,
  8: BordersDemo,
  9: ShadowsDemo,
  10: ResponsiveDemo,
  11: StatesDemo,
};

export default function LessonDemo({ lessonId }: { lessonId: number }) {
  const Demo = DEMO_MAP[lessonId];
  return Demo ? <Demo /> : null;
}
