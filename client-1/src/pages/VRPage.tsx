import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSetVRScoreMutation } from "../hooks/scores/scoreApiSlice";
import { selectCurrentId } from "../hooks/auth/authSlice";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const VRPage = () => {
  const navigate = useNavigate();
  const userId = useSelector(selectCurrentId);
  const [scores, setScores] = useState<any>({
    difficulty1Score: null,
    difficulty2Score: null,
    difficulty3Score: null,
  });

  useEffect(() => {
    // Load score from localStorage
    const loadScoreFromStorage = () => {
      const score1 = localStorage.getItem("score1");
      const score2 = localStorage.getItem("score2");
      const score3 = localStorage.getItem("score3");
      if (score1 !== null && score2 !== null && score3 !== null) {
        try {
          const scoreObj = {
            difficulty1Score: Number.isNaN(parseFloat(score1)) ? 0.0 : parseFloat(score1),
            difficulty2Score: Number.isNaN(parseFloat(score2)) ? 0.0 : parseFloat(score2),
            difficulty3Score: Number.isNaN(parseFloat(score3)) ? 0.0 : parseFloat(score3),
          };

          setScores(scoreObj);
        } catch (error) {
          console.error("Error parsing score from localStorage:", error);
        }
      } else {
        const scoreObj = {
          difficulty1Score: 0.0,
          difficulty2Score: 0.0,
          difficulty3Score: 0.0,
        };

        setScores(scoreObj);
      }
    };

    // Initial load
    loadScoreFromStorage();

    // Event listener for custom 'scoreUpdated' event
    const handleScoreUpdatedEvent = () => loadScoreFromStorage();
    window.addEventListener("scoreUpdated", handleScoreUpdatedEvent);

    // Polling fallback for updates
    const pollInterval = setInterval(loadScoreFromStorage, 1000);

    // Clean up listeners and interval on unmount
    return () => {
      window.removeEventListener("scoreUpdated", handleScoreUpdatedEvent);
      clearInterval(pollInterval);
    };
  }, [setScores]);

  const [updateVRScore] = useSetVRScoreMutation();

  const handleSubmit = async () => {
    if (scores === null) {
      navigate("/profile");
    }

    const obj = {
      userId: userId,
      scores: scores,
    };

    try {
      await updateVRScore(obj).unwrap();
      navigate("/profile");
    } catch (error) {
      console.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10 md:space-x-16">
      <iframe
        src="./web.html"
        title="Web Test"
        style={{ width: "960px", height: "600px", border: "none" }}
      ></iframe>
      <Button className="md:text-md rounded-full text-sm lg:text-xl" onClick={handleSubmit}>
        <div className="flex flex-row items-center justify-center">
          <User size={24} className="mr-2" />
          Go To Profile
        </div>
      </Button>
    </div>
  );
};

export default VRPage;
