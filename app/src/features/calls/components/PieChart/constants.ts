import { ColourCodec } from "./PieChart.types";

export const COLOURS = ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'] as const;

export const colourCodecMap: ColourCodec = {
  'G.711': COLOURS[0],
  'G.722': COLOURS[1],
  'G.726': COLOURS[2],
  'G.729': COLOURS[3],
  'Unknown': COLOURS[4],
}
