import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSetVRScoreMutation } from "../hooks/scores/scoreApiSlice";
import { selectCurrentId } from "../hooks/auth/authSlice";
import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// VRPage component. This component displays the VR test page with the Unity WebGL build.
const VRPage = () => {
  const [showError, setShowError] = useState(false);
  const [customError, setCustomError] = useState("");
  const navigate = useNavigate();
  const userId = useSelector(selectCurrentId);

  const [updateVRScore, { isLoading }] = useSetVRScoreMutation();

  // Handle the form submit event. Update the VR test scores and refresh the user data.
  const handleSubmit = async () => {
    const vrScore1: number = parseFloat((document.getElementById("vrscore1") as HTMLInputElement)?.value);
    const vrScore2: number = parseFloat((document.getElementById("vrscore2") as HTMLInputElement)?.value);
    const vrScore3: number = parseFloat((document.getElementById("vrscore3") as HTMLInputElement)?.value);
    const vrScore4: number = parseFloat((document.getElementById("vrscore4") as HTMLInputElement)?.value);

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
      setShowError(true);
      setCustomError("An error occurred. Please try again later.");
    }
  };

  // Return the VRPage component
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10 md:space-x-16">
      <iframe
        src="./web.html"
        title="Web Test"
        style={{ width: "960px", height: "600px", border: "none" }}
      ></iframe>
      <div className="text-center">
        <p className="text-foreground font-Audiowide uppercase">Input VR Test Values 0-100 (Development Only)</p>
        <form className="text-foreground space-x-8 font-Audiowide uppercase">
          <label htmlFor="vrscore1">
            <input
              type="number"
              id="vrscore1"
              name="vrscore1"
              min="0"
              max="100"
              step="10"
              placeholder="0"
              required
              className="bg-background-secondary m-2 rounded-lg text-center"
            />
            VR Score 1
          </label>
          <label htmlFor="vrscore2">
            <input
              type="number"
              id="vrscore2"
              name="vrscore2"
              min="0"
              max="100"
              placeholder="0"
              step="10"
              required
              className="bg-background-secondary m-2 rounded-lg text-center"
            />
            VR Score 2
          </label>
          <label htmlFor="vrscore3">
            <input
              type="number"
              id="vrscore3"
              name="vrscore3"
              min="0"
              max="100"
              placeholder="0"
              step="10"
              required
              className="bg-background-secondary m-2 rounded-lg text-center"
            />
            VR Score 3
          </label>
          <label htmlFor="vrscore4">
            <input
              type="number"
              id="vrscore4"
              name="vrscore4"
              min="0"
              max="100"
              placeholder="0"
              step="10"
              required
              className="bg-background-secondary m-2 rounded-lg text-center"
            />
            VR Score 4
          </label>
          <Button
            type="submit"
            size="lg"
            className="rounded-full font-Audiowide font-semibold uppercase tracking-wider"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <>
                <Loader2 size={24} className="mr-2 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
      {showError && <ErrorMessage message={customError} onClose={() => setShowError(false)} />}
    </div>
  );
};

export default VRPage;
