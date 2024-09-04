import ProgressBar from "./ProgressBar";
import { Card, CardContent, CardHeader } from "./ui/card";

type ScoreCardProps = {
  title: string;
  errMessage: string;
  isLoading?: boolean;
  data: { title: string; score: number }[] | undefined;
};
// ScoreCard component. This component displays a score card with a title, error message, size, loading state, and data.
const ScoreCard = ({ title, errMessage, isLoading = false, data }: ScoreCardProps) => {
  // If the data is undefined or empty, display a message indicating that there is no data
  const content = (
    <Card className="flex flex-col bg-dark-secondary rounded-lg p-4 border-2 border-green-primary">
      {/* Display the title */}
      <CardHeader className="text-2xl md:text-4xl font-Audiowide text-center pt-2 bg-transparent shadow-none text-light-secondary">
        {title}
      </CardHeader>
      {/* End Display the title */}

      {/* Display the score card */}
      {data === undefined || data?.length === 0 ? (
        <CardContent className="text-center text-light-primary">
          <p className="text-xl sm:text-3xl justify-center mb-4 font-Audiowide">No Data</p>
          <p className="text-sm sm:text-xl">{errMessage}</p>
        </CardContent>
      ) : (
        <CardContent>
          {isLoading ? (
            <ul>
              {[...Array(4)].map((_, index) => (
                <ProgressBar key={index} title={"Loading..."} score={0} skeleton={true} />
              ))}
            </ul>
          ) : (
            <ul>
              {data.map((item, index) => (
                <ProgressBar key={index} title={item.title} score={item.score} />
              ))}
            </ul>
          )}
        </CardContent>
      )}
      {/* End Display the score card */}
    </Card>
  );
  return content;
};

export default ScoreCard;
