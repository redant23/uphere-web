let isActive = false;

function getNotificationPermission() {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}

function showMessageNotification(text) {
  if (!isActive) {
    return;
  }

  const notification = new Notification('A new message from Uphere!', {
    icon: "https://cdn2.iconfinder.com/data/icons/flat-game-ui-buttons-icons-1/512/1-512.png",
    body: `Your friend says: ${text}`,
  });
}

window.onfocus = () => {
  isActive = false;
};

window.onblur = () => {
  isActive = true;
};

export {
  getNotificationPermission,
  showMessageNotification
};
