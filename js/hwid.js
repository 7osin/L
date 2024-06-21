function showNotification(message, type) {
  const notification = document.getElementById('notification');
  notification.innerText = message;
  notification.className = `notification ${type}`;
  notification.style.display = 'block';

  setTimeout(() => {
    notification.style.display = 'none';
  }, 5000);
}

function ResetKey() {
  const key = document.getElementById('name').value;
  const version = document.querySelector('input[name="version"]:checked').value;

  const url = ` https://dbdtools.su/hwid/source/KAMA/reset.php?k=${encodeURIComponent(key)}&v=${encodeURIComponent(version)}`;

  fetch(url)
    .then(response => {
      if (response.status === 200) {
        return response.text().then(data => {
          showNotification(data, 'success');
        });
      } else if (response.status === 400) {
        return response.text().then(data => {
          showNotification(data, 'error');
        });
      } else {
        throw new Error('Unexpected response status');
      }
    })
    .catch(error => {
      showNotification(`An error occurred: ${error.message}`, 'error');
    });
}
