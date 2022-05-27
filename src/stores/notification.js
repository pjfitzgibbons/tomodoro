// askNotificationPermission function to ask for permission when the "Enable notifications" button is clicked

function askNotificationPermission() {
  // function to actually ask the permissions
  function handlePermission(permission) {
    // Whatever the user answers, we make sure Chrome stores the information
    if (!('permission' in Notification)) {
      Notification.permission = permission;
    }

    //   // set the button to shown or hidden, depending on what the user answers
    //   if (
    //     Notification.permission === 'denied' ||
    //     Notification.permission === 'default'
    //   ) {
    //     notificationBtn.style.display = 'block';
    //   } else {
    //     notificationBtn.style.display = 'none';
    //   }
  }

  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications.');
  } else {
    if (checkNotificationPromise()) {
      Notification.requestPermission().then((permission) => {
        handlePermission(permission);
      });
    } else {
      Notification.requestPermission(function (permission) {
        handlePermission(permission);
      });
    }
  }
}

// Function to check whether browser supports the promise version of requestPermission()
// Safari only supports the old callback-based version
function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }

  return true;
}

// function for creating the notification
function createNotification(text, title = 'Tomodoro!') {
  askNotificationPermission();
  // Create and show the notification
  let img = '/to-do-notifications/img/icon-128.png';
  new Notification(title, { body: text, icon: img });

  // we need to update the value of notified to "yes" in this particular data object, so the
  // notification won't be set off on it again

  // // first open up a transaction as usual
  // let objectStore = db
  //   .transaction(['toDoList'], 'readwrite')
  //   .objectStore('toDoList');

  // // get the to-do list object that has this title as it's title
  // let objectStoreTitleRequest = objectStore.get(title);

  // objectStoreTitleRequest.onsuccess = function () {
  //   // grab the data object returned as the result
  //   let data = objectStoreTitleRequest.result;

  //   // update the notified value in the object to "yes"
  //   data.notified = 'yes';

  //   // create another request that inserts the item back into the database
  //   let updateTitleRequest = objectStore.put(data);

  //   // when this new request succeeds, run the displayData() function again to update the display
  //   updateTitleRequest.onsuccess = function () {
  //     displayData();
  //   };
  // };
}

export { createNotification };
