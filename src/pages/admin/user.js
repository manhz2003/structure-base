// import library
import { AiOutlineUserAdd } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";

// import common
import { notify } from "@/heplers/notify";
import { appStore } from "@/store/app";
import { userStore } from "@/store/users";
import request from "@/service/index";
import {
  listUser,
  deleteUser,
  setIsModalSuccess,
  setIsLoading,
} from "@/actions";

// import components
import ModalAddUser from "@/components/Modals/ModalAddUser";
import Skeleton from "@/components/Common/Skeleton";
import LayoutAdmin from "@/components/Layout";
import ListUsers from "@/components/Users/ListUser/ListUsers";
import Button from "@/components/Common/Button";
import Modals from "@/components/Common/Modal";
import ModalViewUser from "@/components/Modals/ModalViewUser";
import ModalRemoveUser from "@/components/Modals/ModalRemoveUser";
import OverLayLoading from "@/components/Common/OverlayLoading";
import ModalEditUser from "@/components/Modals/ModalEditUser";
import { LIMIT } from "@/utils";
import Pagination from "@/components/Common/Pagination";

export default function Home() {
  const [appState, appDispatch] = useContext(appStore);
  const [userState, userDispatch] = useContext(userStore);
  const [modalChildren, setModalChidren] = useState(null);
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [isAction, setIsAction] = useState(false);
  const [user, setUser] = useState({});
  const [page, setPage] = useState(0);
  const [overLayLoading, setOverLayLoading] = useState(false);

  const fetchUser = async (pageNumber = 1) => {
    appDispatch(setIsLoading(true));
    await request
      .get("users")
      .then(({ data, message }) => {
        setPage(data.length);
        const newUsers = data.filter((item, index) => {
          if (LIMIT * pageNumber > index && LIMIT * (pageNumber - 1) <= index) {
            return item;
          }
        });
        userDispatch(listUser(newUsers));
        notify.success(message);
      })
      .catch((error) => {
        notify.error(error);
      })
      .finally(() => {
        appDispatch(setIsLoading(false));
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleShowUser = (user) => {
    setIsTitle(false);
    setIsAction(false);
    setModalChidren(<ModalViewUser user={user} />);
  };

  const handleCreateUser = () => {
    setIsTitle(false);
    setIsAction(false);
    setModalChidren(<ModalAddUser />);
  };

  const handleRemoveUser = (user) => {
    setUser(user);
    setModalChidren(<ModalRemoveUser name={user.name} />);
    setIsTitle("Remove User");
    setIsAction(true);
  };

  const handleAgree = async () => {
    const { _id } = user;
    appDispatch(setIsModalSuccess(true));
    setOverLayLoading(true);
    await request
      .delete(`users/${_id}`)
      .then(({ message }) => {
        userDispatch(deleteUser(_id));

        notify.success(message);
      })
      .catch((message) => notify.error(message))
      .finally(() => {
        setUser({});
        setOverLayLoading(false);
      });
  };

  const handleEditUser = (user) => {
    setUser(user);
    setIsTitle(false);
    setIsAction(false);
    setModalChidren(<ModalEditUser user={user} />);
  };

  const handlePagination = (pageNumber) => {
    fetchUser(pageNumber);
  };

  return (
    <>
      <LayoutAdmin>
        <span onClick={() => handleCreateUser()}>
          <Button icon={<AiOutlineUserAdd />}>Create User</Button>
        </span>
        {appState.isLoading ? (
          <Skeleton />
        ) : (
          <ListUsers
            onRemove={handleRemoveUser}
            onEdit={handleEditUser}
            onShow={handleShowUser}
            users={userState.users}
          />
        )}
        <Pagination onPagination={handlePagination} page={page} />
      </LayoutAdmin>

      <Modals
        title={isTitle}
        action={isAction}
        isClose={isCloseModal}
        content={modalChildren}
        onAgree={handleAgree}
      ></Modals>
      {overLayLoading && <OverLayLoading />}
    </>
  );
}
