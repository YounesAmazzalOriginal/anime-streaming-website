// ================= Load 'Trending Anime' Data =================
fetch("/assets/data/header-animes.json")
  .then((res) => res.json())
  .then((data10) => {
    let hero = document.getElementById("hero");
    hero.innerHTML = "";

    data10.forEach((anime) => {
      var title = anime.image.replace(/-/g, " ");

      hero.innerHTML += `
        <div class="min-w-full min-h-full max-w-full max-h-full relative">
          <img
            src="assets/images/${anime.image}-cover.jpg"
            alt="${title}"
            class="min-w-full h-full object-cover
            hover:scale-105 transition-all duration-700"
          />
          <div class="absolute bottom-0 left-0 m-14 grid gap-4 z-10">
            <p class="bg-ivory text-crimson text-[12px] w-fit px-3 h-6 flex justify-center items-center capitalize">
              ${anime.type}
            </p>
            <h1 class="font-bebas text-7xl">${title}</h1>
            <p class="w-2/3 opacity-80 font-[300] text-[15px]">
              ${anime.description}
            </p>
            <button class="bg-crimson w-40 h-10 rounded-full flex items-center justify-evenly border border-transparent hover:bg-transparent hover:border-crimson hover:text-crimson transition-all duration-450 hover:scale-95">
              <i class="fa-solid fa-play text-sm"></i>
              <p class="text-sm capitalize">watch now</p>
            </button>
          </div>
        </div>`;
    });
  })
  .catch((error) => console.error("Error fetching anime data:", error));

document.getElementById("rightSwip").addEventListener("click", () => {
  heroSwip(1);
});
document.getElementById("leftSwip").addEventListener("click", () => {
  heroSwip(-1);
});
function heroSwip(swipDirection) {
  var hero = document.getElementById("hero");

  var scrollStep = hero.clientWidth;

  hero.scrollBy({
    left: swipDirection * scrollStep,
    behavior: "smooth",
  });
}
// Leave Auto scroll On Hover On Swip Btns
let scrollInterval = setInterval(() => {
  heroSwip(1);
}, 4000);
document.querySelectorAll(".SwipBtn").forEach((swipBtn) => {
  swipBtn.addEventListener("mousemove", () => {
    clearInterval(scrollInterval);
  });
  swipBtn.addEventListener("mouseleave", () => {
    if (!scrollInterval) {
      scrollInterval = setInterval(() => {
        heroSwip(1);
      }, 1000);
    }
  });
});

// ============================= Load 'Top 10 Anime' Data =================
fetch("/assets/data/top-10-animes.json")
  .then((res) => res.json())
  .then((animesData10) => {
    var bestAnimes = document.getElementById("best-animes-container");

    for (let i = 0; i < animesData10.length + 1; i++) {
      bestAnimes.innerHTML += `<a href="" class="block">
  <div title="${
    animesData10[i].title
  }" class="group relative w-[200px] h-[300px] transition-all duration-300 rounded-lg overflow-hidden">
    <div class="w-full h-full relative rounded-md">
      <!-- Image -->
      <img
        class="w-full h-full object-cover aspect-[2/3] transition-all duration-300 group-hover:scale-105 group-hover:brightness-[40%]"
        src="assets/images/animes/${animesData10[i].image}"
        alt="${animesData10[i].title}"
      />

      <!-- Dark Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

      <!-- Anime Title (Fixed Alignment) -->
      <h1 class="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-sm font-semibold w-[90%] truncate text-center capitalize">
        ${animesData10[i].title.replaceAll("-", " ")}
      </h1>

      <!-- Ranking Number (Fixed Positioning) -->
      <h1
        class="absolute top-2 left-3 font-montserrat font-extrabold text-3xl text-white"
        style="text-shadow: 2px 2px 4px rgba(30, 30, 30, 0.8)"
      >
        ${i + 1}
      </h1>

      <!-- Play Button (Fixed Centering) -->
      <button
        class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-charcoal/50 text-ivory text-xl w-14 h-14 flex items-center justify-center rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <i class="fa-solid fa-play"></i>
      </button>
    </div>
  </div>
</a>

`;
    }
  });

// ============================= Load 'Genres ' Data =================
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
          var singleAnime = `<a href="">
              <div class="bg-black/60 w-full p-2 flex gap-3 relative">
                <div class="relative overflow-hidden bg-blue-200 min-w-16 min-h-16 max-w-16 max-h-16">
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
    }

    searchInput.addEventListener("input", function () {
      this.value = this.value.toLowerCase();
      searchAnime();
    });

    // Genres
    let genres = [];
    for (let i = 0; i < animes.length; i++) {
      genres.push(animes[i].type);
    }

    const result = [...new Set(genres.flatMap((genre) => genre.split(", ")))];

    console.log(result);

    result.forEach((type) => {
      var genreContainer = document.getElementById("genre-container");

      genreContainer.innerHTML += `<a href=""
          class="relative bg-charcoal min-w-[200px] min-h-[300px] max-w-[200px] overflow-hidden
          hover:bg-crimson/20 transition-all duration-600
          max-h-[300px] rounded-lg flex justify-center items-center"
        >
          <h1 class="capitalize text-xl">${type}</h1>
      </a>`;
    });
  })
  .catch((error) => console.error("Error fetching anime data:", error));
