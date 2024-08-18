import { Fragment } from "react";
import ProfileInformation from "../../organisms/ProfileInfo/ProfileInfo";
import styles from "./Profile.module.scss";
import InfoVis from "../../organisms/InfoVis/InfoVis";
import PubInfo from "../../organisms/PubInfo/PubInfo";
import Logo from "../../atoms/Logo/Logo";
import SearchBar from "../../../common/SearchBar/SearchBar";

const profileData = {
  name: "Uddeepta Raaj Kashyap",
  profilePicture: "",
  department: "CSED",
  role: "Associate Professor",
  institute: "TIET",
  university: "Thapar University",
  experience: "25",
  researchArea: "Machine Learning",
};

const Profile = () => {
  return (
    <Fragment>
      <div className={styles.profileContainer}>
        <div className={styles.headerContainer}>
          <Logo />
          <SearchBar width="800px" placeholder="Search for person or institute" />
        </div>
        <ProfileInformation profileData={profileData} />
        <InfoVis />
        <PubInfo />
        <div className={styles.infoVisualisation}></div>
        <div className={styles.publicationArea}></div>
      </div>
    </Fragment>
  );
};

export default Profile;
