// Replace 'your-server-ip' with the actual Minecraft server IP
const serverIP = "play.mxttyy.co.uk"; // Example: "play.example.com"

const statusText = document.getElementById("status-text");
const playersCount = document.getElementById("players-count");
const motd = document.getElementById("motd");

function fetchServerData() {
    const url = `https://api.mcsrvstat.us/3/${serverIP}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.online) {
                // Update status to online
                statusText.textContent = "Online";
                statusText.classList.add("online");
                statusText.classList.remove("offline");

                // Show the player count
                playersCount.textContent = `Players: ${data.players.online}/${data.players.max}`;

                // Display the MOTD (Message of the Day)
                motd.textContent = data.motd.clean.join(" ");
            } else {
                // If the server is offline
                statusText.textContent = "Offline";
                statusText.classList.add("offline");
                statusText.classList.remove("online");

                // Show the player count as 0
                playersCount.textContent = "Players: 0";

                // Display the MOTD as "Server Offline"
                motd.textContent = "Server Offline";
            }
        })
        .catch(err => {
            console.error("Error fetching server data:", err);
            statusText.textContent = "Error";
            statusText.classList.add("offline");
            statusText.classList.remove("online");
        });
}

// Fetch the server data when the page loads
fetchServerData();

// Optionally, you can refresh the server data every 30 seconds
setInterval(fetchServerData, 30000);
