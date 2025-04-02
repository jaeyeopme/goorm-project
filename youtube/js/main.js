document.addEventListener('DOMContentLoaded', initializeApp)

const videos = []

function initializeApp() {
  initializeVideos()
  setupSearchFunction()
  displayVideos(videos)
}

function initializeVideos() {
  const mockData = [
    {
      id: 1,
      title: '아름다운 풍경',
      author: '아이디 1',
      views: '3',
      time: '5 months ago',
      duration: '8:20',
      thumbnail: 'thumbnail-1.jpeg',
      avatar: 'avatar-1.png',
    },
    {
      id: 2,
      title: '자연 속의 소리',
      author: '아이디 2',
      views: '7',
      time: '3 months ago',
      duration: '7:15',
      thumbnail: 'thumbnail-2.jpeg',
      avatar: 'avatar-1.png',
    },
    {
      id: 3,
      title: '멋진 여행',
      author: '아이디 3',
      views: '12',
      time: '2 weeks ago',
      duration: '10:45',
      thumbnail: 'thumbnail-3.jpeg',
      avatar: 'avatar-1.png',
    },
    {
      id: 4,
      title: '도시 전경',
      author: '아이디 4',
      views: '25',
      time: '1 month ago',
      duration: '9:30',
      thumbnail: 'thumbnail-4.jpeg',
      avatar: 'avatar-1.png',
    },
  ]
  for (let i = 0; i < 10; i++) {
    mockData.forEach((video) => videos.push(video))
  }
}

function displayVideos(videos) {
  const videoContainer = document.querySelector('.video-grid')
  const videoElements = []
  videos.forEach((video) => videoElements.push(createVideoElement(video)))
  videoContainer.innerHTML = videoElements.join('')
}

function createVideoElement(video) {
  return `
        <div class="video-preview">
          <div class="thumbnail-row">
            <img
              class="thumbnail"
              src="../assets/images/thumbnails/${video.thumbnail}"
            />
            <div class="video-time">${video.duration}</div>
          </div>
          <div class="video-info-grid">
            <div class="channel-picture">
              <img
                class="profile-picture"
                src="../assets/images/avatars/${video.avatar}"
              />
            </div>
            <div class="video-info">
              <p class="video-title">${video.title}</p>
              <p class="video-author">${video.author}</p>
              <p class="video-stats">${video.views} views &#183; ${video.time}</p>
            </div>
          </div>
        </div>
      `
}

function setupSearchFunction() {
  const searchInput = document.querySelector('.search-bar')
  const searchButton = document.querySelector('.search-button')

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      displayVideos(searchVideos(searchInput))
    }
  })

  searchButton.addEventListener('click', () =>
    displayVideos(searchVideos(searchInput))
  )
}

function searchVideos(searchInput) {
  const query = searchInput.value.trim().toLowerCase()
  return videos.filter((video) => video.title.toLowerCase().includes(query))
}
