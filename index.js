// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCG0j5LN8sE1vE7viRCkH5r84-Yf8f6uo",
  authDomain: "message-app-29ab4.firebaseapp.com",
  projectId: "message-app-29ab4",
  storageBucket: "message-app-29ab4.firebasestorage.app",
  messagingSenderId: "490264790429",
  appId: "1:490264790429:web:41f1d58f0bd48d064e5b74"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data

let username = '';

// Listen for the "Submit" button to set the user's name
document.getElementById('set-name-btn').addEventListener('click', function() {
  const nameInput = document.getElementById('username').value;
  if (nameInput) {
    username = nameInput;
    document.getElementById('greeting').textContent = `Welcome, ${username}!`;
    document.getElementById('username-container').style.display = 'none';
  } else {
    alert("Please enter a name.");
  }
});



// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});