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
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    // Load score from localStorage
    const loadScoreFromStorage = () => {
      const scoreFromStorage = localStorage.getItem("score");
      if (scoreFromStorage !== null) {
        const score = parseInt(scoreFromStorage, 10);
        console.log("Score updated: ", score);
        setScore(score);
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
  }, []);

  const [updateVRScore] = useSetVRScoreMutation();

  const handleSubmit = async () => {
    if (score === null) return;
    const vrScore1: number = score * 20;
    const vrScore2: number = score * 20;
    const vrScore3: number = score * 20;
    const vrScore4: number = score * 20;

    var obj = {
      userId: userId,
      vrScore1: vrScore1,
      vrScore2: vrScore2,
      vrScore3: vrScore3,
      vrScore4: vrScore4,
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
        <div className="flex flex-row items-center">
          <User size={24} className="mr-2" />
          Go To Profile
        </div>
      </Button>
    </div>
  );
};

export default VRPage;
