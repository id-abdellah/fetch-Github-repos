const userInput = document.querySelector(".searche-bar input");
const btn = document.querySelector(".searche-bar button");

const fetchedReposPlace = document.querySelector(".fetched-repos");





async function getData(userLogin) {
    let fetchingData = await fetch(`https://api.github.com/users/${userLogin}/repos`);
    if (fetchingData.status === 404) {
        alert("Not Found")
    };
    let jsonData = await fetchingData.json();
    return jsonData
};


btn.addEventListener("click", () => {
    let userInputValue = userInput.value;
    if (userInputValue == "") return;
    fetchedReposPlace.innerHTML = "";
    getData(userInputValue).then(
        (ResponseData) => {
            for (let i = 0; i < ResponseData.length; i++) {
                fetchedReposPlace.innerHTML += `
                <div class="repo-container">
                    <p class="repo-name">${ResponseData[i].name}</p>
                    <div class="data">
                        <div class="stars">
                            <div class="icon">
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <div class="count">${ResponseData[i].stargazers_count}</div>
                        </div>
                        <div class="visit">
                            <a target="_blank" href="${ResponseData[i].html_url}">visit</a>
                        </div>
                    </div>
                </div
                `;
            }
        }
    )
})