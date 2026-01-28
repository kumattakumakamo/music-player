console.log('Renderer script loaded.');

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

window.onYouTubeIframeAPIReady = () => {
    console.log('YouTube API Ready.');
    new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        playerVars: { 'origin': 'http://localhost:3000' }
    });
};