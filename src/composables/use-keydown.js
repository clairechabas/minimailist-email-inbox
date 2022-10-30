import { onBeforeUnmount } from 'vue';

let useKeydown = (events) => {
  let onKeyDown = (currentEvent) => {
    console.log(currentEvent.key);

    let eventFound = Array.isArray(events)
      ? events.find((event) => currentEvent.key === event.key)
      : events;

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
