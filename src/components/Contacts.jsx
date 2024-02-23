import { Button, Modal, Form } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";
import { ToastContainer, toast } from "react-toastify"; // Remove unused variables
import "react-toastify/dist/ReactToastify.css";

function Contacts({ id }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { contacts, createContact } = useContacts();
  const { createConversation } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();

    createConversation(selectedContactIds);
    closeModal();
  }

  function closeModal() {
    setModalOpen(false);
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  }

  function handleAddContact(name) {
    createContact(name);
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2>Contacts</h2>
        <FaPlus onClick={() => setModalOpen(true)} className="add-contact" />
      </div>
      <ul className="list-group">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className={`list-group-item ${
              contact.selected ? "active" : ""
            }`}
            onClick={() => handleCheckboxChange(contact.id)}
          >
            {contact.name}
          </li>
        ))}
      </ul>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <Modal.Header>Add Contact</Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Form content */}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }

`;

export default Contacts;
