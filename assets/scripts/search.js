fetch("/assets/data/animes.json")
  .then((res) => res.json())
  .then((animes) => {
    // ANIME SEARCH
    var searchResultContainer = document.getElementById(
      "search-result-container"
    );
    var searchInput = document.getElementById("search-input");
    searchInput.value = searchInput.value.toLowerCase();

    let resultsArr = [];

    function searchAnime() {
      resultsArr = [];
      searchResultContainer.innerHTML = "";

      if (searchInput.value.length > 0) {
        searchResultContainer.classList.remove("hidden");
      } else {
        searchResultContainer.classList.add("hidden");
      }

      for (let i = 0; i < animes.length; i++) {
        if (
          animes[i].title
            .toLowerCase()
            .includes(searchInput.value.toLowerCase())
        ) {
          var singleAnime = `<a >
              <div class="bg-black/60 w-full p-2 flex gap-3 relative cursor-pointer">
                <div class="relative overflow-hidden min-w-16 min-h-16 max-w-16 max-h-16">
                  <img class="z-[1] w-full h-full object-contain absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
                    src="assets/images/animes/${animes[i].image}" alt="" />
                  <img class="w-full h-full object-cover absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 brightness-[60%]"
                    src="assets/images/animes/${animes[i].image}" alt="" />
                </div>
                <div class="flex flex-col justify-around">
                  <h1 class="capitalize">${animes[i].title.replaceAll(
                    "-",
                    " "
                  )}</h1>
                  <div class="capitalize text-[12px] flex gap-1 text-white/80">
                    <div class="bg-white/10 w-fit px-2 h-[20px] rounded-sm flex items-center hover:text-black/80 hover:bg-white/70 transition-all cursor-default">
                      ${animes[i].release_date}
                    </div>
                    <div class="bg-white/10 w-fit px-2 h-[20px] rounded-sm flex items-center hover:text-black/80 hover:bg-white/70 transition-all cursor-default">
                      ${animes[i].notes}
                    </div>
                    <div class="bg-white/10 w-fit px-2 h-[20px] rounded-sm flex items-center hover:text-black/80 hover:bg-white/70 transition-all cursor-default">
                      ${animes[i].status}
                    </div>
                    <div class="bg-crimson/10 w-fit px-2 h-[20px] rounded-sm flex items-center hover:text-black/80 hover:bg-white/70 transition-all cursor-default">
                      HD
                    </div>
                  </div>
                </div>
              </div>
            </a>`;

          resultsArr.push(singleAnime);
        }
      }

      searchResultContainer.innerHTML = resultsArr.join("");

      if (resultsArr.length == 0) {
        searchResultContainer.innerHTML = `<img class="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1/2 object-contain animate-purse" src="assets/images/anime-caracter.png" alt="">`;
      }
    }

    searchInput.addEventListener("input", function () {
      this.value = this.value.toLowerCase();
      searchAnime();
    });
  });
