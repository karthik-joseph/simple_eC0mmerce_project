const announcement = {
  active: false,
  message: "Discover our new botanical collection",
  linkText: "Explore now",
  linkUrl: "/shop.html"
};

const bar = document.querySelector("#announcement-bar");
const message = document.querySelector("#announcement-message");
const link = document.querySelector("#announcement-link");
const closeButton = document.querySelector("#announcement-close");

function renderAnnouncement() {
  if (!announcement.active) {
    bar.hidden = true;
    return;
  }

  message.textContent = announcement.message;

  if (announcement.linkText && announcement.linkUrl) {
    link.textContent = announcement.linkText;
    link.href = announcement.linkUrl;
    link.hidden = false;
  } else {
    link.hidden = true;
  }

  bar.hidden = false;
}

closeButton.addEventListener("click", () => {
  bar.hidden = true;
});

renderAnnouncement();
