import { Avatar, Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { BsExclamationCircle } from "react-icons/bs";

export default function DasUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  console.log(users);

  const [showModal,setShowModal] = useState(false);
  const [deleteUserId,setdeleteUserId] = useState(null);
  useEffect(() => {
    try {
      const getUsers = async () => {
        const res = await fetch("api/user/getusers");
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setUsers(data.users);
        }
      };
      if (currentUser.isAdmin) getUsers();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser._id]);

  const handleDelete = async () => {

    try {
      const res = await fetch(`api/user/delete/${deleteUserId}`, { method: "DELETE" });
      const data = await res.json();
      setShowModal(false);
      if (res.ok) {
        setdeleteUserId(null);
        setUsers((prev) => prev.filter((user) => user._id !== deleteUserId)); // Remove user from state
      } else {
        console.error("Error deleting user:", data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    currentUser.isAdmin && (
      <div className="p-5">
        {users.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell> Date Created </Table.HeadCell>
                <Table.HeadCell> User Image </Table.HeadCell>
                <Table.HeadCell> Username </Table.HeadCell>
                <Table.HeadCell> Email </Table.HeadCell>
                <Table.HeadCell> Admin </Table.HeadCell>
                <Table.HeadCell> Delete </Table.HeadCell>
              </Table.Head>

              {users.map((user, id) => (
                <Table.Body
                  key={id}
                  className="bg-white divide-y dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Row>
                  <Table.Cell>{new Date(user.createdAt).toLocaleString()}</Table.Cell>
                    <Table.Cell>
                      <Avatar alt="Img" img={user.profilePicture || "./profile.png"} />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin === true ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <ImCross className="text-red-500" />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        onClick={()=>{ setdeleteUserId(user._id) ; setShowModal(true)}}
                        className="bg-red-500"
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </>
        ) : (
          <p>You have no users !!!</p>
        )}

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <BsExclamationCircle className="h-14 w-14 text-red-500 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400 ">
                Are you sure you want to delete this user ?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDelete}>
                  Yes,I am sure
                </Button>
                <Button onClick={() =>{ setdeleteUserId(null) ;setShowModal(false)}} color="gray">
                  No,cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  );
}
