chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Connect to the Native Messaging host
    const port = chrome.runtime.connectNative("com.databird.nativehost");
  
    // Send the message to the host
    port.postMessage(message);
  
    // Receive the response from the host
    port.onMessage.addListener(response => {
        // Handle the response (e.g., display it in a notification)
        console.log("Received from host:", response);
    });
  });