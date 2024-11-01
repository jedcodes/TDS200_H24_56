import { SvgProps } from "react-native-svg";
import AddSquareIcon from "./Add";
import AppleIcon from "./Apple";
import ArrowLeft01Icon from "./ArrowBack";
import BubbleChatIcon from "./Chat";
import FavouriteIcon from "./Favourite";
import GoogleIcon from "./Google";
import Home01Icon from "./Home";
import Mail01Icon from "./Mail";
import LockPasswordIcon from "./Password";
import Bookmark02Icon from "./Saved";
import Search01Icon from "./Search";
import UserCircleIcon from "./User";

const icons = {
  user: UserCircleIcon,
  mail: Mail01Icon,
  lock: LockPasswordIcon,
  home: Home01Icon,
  google: GoogleIcon,
  apple: AppleIcon,
  saved: Bookmark02Icon,
  search: Search01Icon,
  add: AddSquareIcon,
  arrowBack: ArrowLeft01Icon,
  chat: BubbleChatIcon,
  favourite: FavouriteIcon,
};

type IconProps = {
  name: keyof typeof icons;
} & SvgProps;

const Icon = ({ name, ...props }: IconProps) => {
  const IconComponent = icons[name];
  return (
    <IconComponent
      height={props.fontSize || 24}
      width={props.fontSize || 24}
      strokeWidth={props.strokeWidth || 1.9}
      {...props}
    />
  );
};

export default Icon;
