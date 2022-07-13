import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "shared/components/Button";
import { Admin } from "shared/features/auth/authSlice";
import { colors } from "shared/utils/Styles";
import AddAdmin from "./AddAdmin";
import ProfileInfo from "./ProfileInfo";
import { StyledProfileItem } from "./Styles";

const Profile: React.FC = () => {
  const admin: Admin = useSelector((state: any) => state.auth.admin);
  if (!admin) {
    return <p>Something went wrong while getting admin data</p>;
  }

  const [modal, setModal] = useState(false);

  const handleShowModal = () => {
    setModal(true);
  };

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  return (
    <>
      {modal && <AddAdmin active={modal} toggleView={toggleModal} />}
      <main
        style={{
          padding: "0 1em",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ProfileInfo admin={admin} />
          <aside
            style={{
              width: "220px",
              height: "100vh",
              padding: "1em",
              background: colors.backgroundLightest,
            }}
          >
            <StyledProfileItem>
              <Button onClick={handleShowModal} loading={false} outline>
                <p style={{ color: colors.buttonPrimary }}>Add Admin</p>
              </Button>
            </StyledProfileItem>
            <StyledProfileItem>
              <Button loading={false} outline>
                <p style={{ color: colors.buttonPrimary }}>List Admins</p>
              </Button>
            </StyledProfileItem>
          </aside>
        </div>
      </main>
    </>
  );
};

export default Profile;
