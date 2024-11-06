import * as Progress from "react-native-progress";

const ProgressBar = ({ progress }: { progress: number }) => {
  return <Progress.Bar progress={progress} color="#A3E635" width={200} />;
};

export default ProgressBar;
