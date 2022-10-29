import { onBeforeUnmount } from 'vue';

let useKeydown = (events) => {
  let onKeyDown = (currentEvent) => {
    let eventFound = events.find((event) => currentEvent.key === event.key);

    if (eventFound) {
      eventFound.action();
    }
  };

  window.addEventListener('keydown', onKeyDown);

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeyDown);
  });
};

export default useKeydown;
