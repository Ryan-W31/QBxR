import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import ProgressBar from "./ProgressBar";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

type ScoreCardProps = {
  title: string;
  errMessage: string;
  isLoading?: boolean;
  data: { title: string; score: number }[] | undefined;
};

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 273 },
];

const chartConfig = {
  desktop: {
    color: "hsl(var(--chart-1))",
  },
  January: {
    label: "January",
    color: chartData[0].desktop > 200 ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))",
  },
  February: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
// ScoreCard component. This component displays a score card with a title, error message, size, loading state, and data.
const ScoreCard = ({ title, errMessage, isLoading = false, data }: ScoreCardProps) => {
  // If the data is undefined or empty, display a message indicating that there is no data
  const content = (
    <Card className="bg-background-secondary border-primary flex flex-col rounded-lg border-2 p-4 w-full">
      {/* Display the title */}
      <CardHeader className="text-foreground-secondary bg-transparent pt-2 text-center font-Audiowide text-2xl shadow-none md:text-4xl">
        {title}
      </CardHeader>
      {/* End Display the title */}

      {/* Display the score card */}
      {/* {data === undefined || data?.length === 0 ? (
        <CardContent className="text-light-primary text-center">
          <p className="mb-4 justify-center font-Audiowide text-xl sm:text-3xl">No Data</p>
          <p className="text-sm sm:text-xl">{errMessage}</p>
        </CardContent>
      ) : ( */}
      <CardContent>
        {isLoading ? (
          <ul>
            {[...Array(4)].map((_, index) => (
              <ProgressBar key={index} title={"Loading..."} score={0} skeleton={true} />
            ))}
          </ul>
        ) : (
          <ChartContainer config={chartConfig} className="w-full ">
            <RadarChart data={chartData}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="month" hideLabel={true} />} />
              <PolarAngleAxis dataKey="month" />
              <PolarGrid />
              <Radar
                dataKey="desktop"
                fill="var(--color-desktop)"
                fillOpacity={0.6}
                dot={{
                  r: 4,
                  fillOpacity: 1,
                }}
              />
            </RadarChart>
          </ChartContainer>
        )}
      </CardContent>
      {/* )} */}
      {/* End Display the score card */}
    </Card>
  );
  return content;
};

export default ScoreCard;
