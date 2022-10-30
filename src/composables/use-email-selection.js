import { reactive } from 'vue';
import axios from 'axios';

// We declare the emails Set outside of our useEmailSelection
// to avoid creating a new reactive Set each time
// useEmailSelection is called.
let emails = reactive(new Set());

const useEmailSelection = function () {
  let addMultiple = (emailsToAdd) =>
    emailsToAdd.forEach((email) => emails.add(email));

  let clear = () => emails.clear();

  let forSelected = (fn) => {
    emails.forEach((email) => {
      fn(email);
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    });
  };

  let markRead = () => forSelected((email) => (email.read = true));

  let markUnread = () => forSelected((email) => (email.read = false));

  let archive = () => {
    forSelected((email) => (email.archived = true));
    clear();
  };

  let toggle = function (email) {
    if (emails.has(email)) {
      emails.delete(email);
    } else {
      emails.add(email);
    }
  };

  return {
    addMultiple,
    archive,
    clear,
    emails,
    markRead,
    markUnread,
    toggle,
  };
};

export default useEmailSelection;
