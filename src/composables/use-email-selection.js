import { reactive } from 'vue';

// We declare the emails Set outside of our useEmailSelection
// to avoid creating a new reactive Set each time
// useEmailSelection is called.
let emails = reactive(new Set());

const useEmailSelection = function () {
  let toggle = function (email) {
    if (emails.has(email)) {
      emails.delete(email);
    } else {
      emails.add(email);
    }
    console.log('emails', emails);
  };

  return {
    emails,
    toggle,
  };
};

export default useEmailSelection;
