document.addEventListener("DOMContentLoaded", () => {

    let form = document.getElementById("github-form");
    form.addEventListener('submit', event=> {
        event.preventDefault()
        //console.log(event.target.search.value, event.target.search_parameter.value)
        fetchGithub(event.target.search.value, event.target.search_parameter.value)
    })
})

function fetchGithub(keyword, by) {
    let url = by==="name"
    ? `https://api.github.com/search/users?q=${keyword}` 
    : `https://api.github.com/users/${keyword}/repos`

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if(by==="name") {
            createCards(data)
        } else {
            createRepolist(data)
        }
    })
}

function createCards(users) {
    document.getElementById('user-list').innerHTML = ""
    for(let user of users.items) {
        let div = document.createElement("div")
        div.classList.add("cards")

        let username = document.createElement("h4")
        username.textContent = user.login

        let avatar = document.createElement("img")
        avatar.src = user.avatar_url

        let profile = document.createElement("a")
        profile.textContent = user.html_url
        profile.href = user.html_url

        div.append(username, avatar, profile)
        
        document.getElementById('user-list').appendChild(div)
    }
}

function createRepolist(users) {
    document.getElementById("repos-list").innerHTML = ""
    for(let user of users) {
        let div = document.createElement("div")
        div.classList.add("repo-cards")

        let reponame = document.createElement("h3")
        reponame.textContent = user.full_name

        let link = document.createElement("a")
        link.textContent = user.html_url
        link.href = user.html_url

        div.append(reponame, link)

        document.getElementById("repos-list").appendChild(div)
    }
}