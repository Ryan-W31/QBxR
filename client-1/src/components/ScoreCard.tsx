import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { dotColor } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

type ScoreCardProps = {
  title: string;
  isLoading?: boolean;
  isMyProfile?: boolean;
  isVr?: boolean;
  data: { title: string; score: number; max: number }[] | undefined;
};

const chartConfig = {
  score: {
    color: "hsl(var(--foreground))",
  },
} satisfies ChartConfig;

const CustomizedTick = (props: any) => {
  const { cx, cy, orientation, radius, x, y, textAnchor, payload, index } = props;
  let newY = y;

  if (index === 0) {
    newY = y - 10;
  } else if (index === 2) {
    newY = y + 10;
  } else if (index > 0) {
    newY = y + 5;
  }

  return (
    <text
      cx={cx}
      cy={cy}
      orientation={orientation}
      radius={radius}
      stroke="none"
      x={x}
      y={newY}
      className="recharts-text recharts-polar-angle-axis-tick-value"
      text-anchor={textAnchor}
    >
      <tspan x={x} dy="0em">
        {payload.value}
      </tspan>
    </text>
  );
};

const CustomizedActiveDot = (props: any) => {
  const { cx, cy, value } = props;
  const color = dotColor(value);

  return <circle cx={cx} cy={cy} r={6} stroke={color} strokeWidth={1} fill={color} />;
};

const CustomizedDot = (props: any) => {
  const { cx, cy, payload } = props;
  const color = dotColor(payload.value);

  return <circle cx={cx} cy={cy} r={4} stroke={color} strokeWidth={1} fill={color} />;
};
// ScoreCard component. This component displays a score card with a title, error message, size, loading state, and data.
const ScoreCard = ({ title, isLoading = false, isMyProfile = false, isVr = false, data }: ScoreCardProps) => {
  // If the data is undefined or empty, display a message indicating that there is no data

  const content = (
    <Card className="bg-background-secondary border-primary flex flex-col rounded-lg border-2 p-4 w-full">
      {/* Display the title */}
      <CardHeader className="text-foreground bg-transparent pt-2 text-center font-Audiowide text-2xl shadow-none md:text-4xl">
        {title}
      </CardHeader>
      {/* End Display the title */}

      {/* Display the score card */}
      {data === undefined || data?.length === 0 ? (
        <CardContent className="text-foreground-secondary text-center">
          <p className="mb-4 justify-center font-Audiowide text-xl sm:text-2xl">No Data</p>

          {isMyProfile && (
            <Button size="lg" asChild>
              {isVr ? <Link to="/vr">Take The VR Test</Link> : <Link to="/web">Take The Web Test</Link>}
            </Button>
          )}
        </CardContent>
      ) : (
        <CardContent className="flex flex-col justify-center items-center">
          <>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Loader2 className="animate-spin h-12 w-12 text-primary" />
              </div>
            ) : (
              <ChartContainer config={chartConfig} className="w-full ">
                <RadarChart data={data}>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent nameKey="title" hideLabel={true} hideIndicator />}
                  />
                  <PolarAngleAxis dataKey="title" tick={<CustomizedTick />} />
                  <PolarRadiusAxis
                    type="number"
                    angle={45}
                    domain={[0, 100]}
                    tickCount={5}
                    axisLine={false}
                    orientation="middle"
                  />
                  <PolarGrid gridType="circle" />
                  <Radar
                    dataKey="score"
                    fill="var(--color-score)"
                    fillOpacity={0.6}
                    activeDot={<CustomizedActiveDot />}
                    dot={<CustomizedDot />}
                  />
                </RadarChart>
              </ChartContainer>
            )}
            {isMyProfile && (
              <Button size="lg" asChild>
                {isVr ? <Link to="/vr">Retake The VR Test</Link> : <Link to="/web">Retake The Web Test</Link>}
              </Button>
            )}
          </>
        </CardContent>
      )}
      {/* End Display the score card */}
    </Card>
  );
  return content;
};

export default ScoreCard;
