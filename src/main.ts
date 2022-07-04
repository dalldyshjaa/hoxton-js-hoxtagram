//   <article class="image-card">
//     <h2 class="title">Title of image goes here</h2>
//     <img src="./assets/image-placeholder.jpg" class="image" />
//     <div class="likes-section">
//       <span class="likes">0 likes</span>
//       <button class="like-button">♥</button>
//     </div>
//     <ul class="comments">
//       <li>Get rid of these comments</li>
//       <li>And replace them with the real ones</li>
//       <li>From the server</li>
//     </ul>
//   </article>;

let state = {
  images: [],
};

function getImagesFromServer() {
  fetch("http://localhost:4001/images")
    .then((resp) => resp.json())
    .then((imagesFromServer) => {
      state.images = imagesFromServer;
      console.log(state.images);
      render();
    });
}
getImagesFromServer();

function render() {
  for (let a of state.images) {
    document.querySelector(".image-container").appendChild(renderPost(a));
  }
}
console.log("ASDsad");
function renderPost(image) {
  let postContainer = document.createElement("article");
  postContainer.className = "image-card";

  let postTitle = document.createElement("h2");
  postTitle.className = "title";
  postTitle.textContent = image.title;

  let imageContainer = document.createElement("img");
  imageContainer.className = "image";
  imageContainer.src = image.image;

  let div1 = document.createElement("div");
  div1.className = "likes-section";

  let span1 = document.createElement("span");
  span1.className = "likes";
  span1.textContent = `${image.likes} Likes`;

  let likeBtn = document.createElement("button");
  likeBtn.className = "like-button";
  likeBtn.textContent = "♥";
  likeBtn.addEventListener("click", () => {
    image.likes++;
    span1.textContent = `${image.likes} Likes`;
  });
  div1.append(span1, likeBtn);

  let commentsUl = document.createElement("ul");
  commentsUl.className = "comments";

  for (let comment of image.comments) {
    let commentLi = document.createElement("li");
    commentLi.textContent = comment.content;
    commentsUl.append(commentLi);
  }

  postContainer.append(postTitle, imageContainer, div1, commentsUl);
  return postContainer;
  //   document.querySelector(".image-container").appendChild(postContainer);
}
// document.querySelector(".image-container").textContent = "ASdsadsafaf";
