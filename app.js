const button = document.querySelector('.share-button');
const status = document.querySelector('#share-status');
let statusTimer;
if (button && status && (navigator.share || navigator.clipboard)) {
  button.hidden = false;
  button.addEventListener('click', async () => {
    const url = document.querySelector('link[rel="canonical"]').href;
    button.disabled = true;
    try {
      if (navigator.share) {
        await navigator.share({title:'The Vael | Official Music & Full Videos',url});
      } else {
        await navigator.clipboard.writeText(url);
        status.textContent = 'Link copied. Pass the music on.';
      }
    } catch (error) {
      if (error.name !== 'AbortError') status.textContent = 'Copy the page address from your browser to share.';
    } finally {
      button.disabled = false;
      clearTimeout(statusTimer);
      statusTimer = setTimeout(() => { status.textContent = ''; }, 4500);
    }
  });
}
