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
      bestAnimes.innerHTML += `<a onclick="animeCard(this)" href="anime-details.html" class="block">
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
    // Genres
    let genres = [];
    for (let i = 0; i < animes.length; i++) {
      genres.push(animes[i].type);
    }

    const result = [...new Set(genres.flatMap((genre) => genre.split(", ")))];

    // console.log(result);

    result.forEach((type) => {
      var genreContainer = document.getElementById("genre-container");

      genreContainer.innerHTML += `<a
          href="viewall.html"
          id="genre-card"
          class="relative group cursor-pointer bg-black min-w-[200px] min-h-[300px] 
          max-w-[200px] overflow-hidden transition-all duration-[0.6s] max-h-[300px] 
          rounded-lg flex justify-center items-center"
        >
          <img
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            w-[140%] h-[140%] object-cover hue-rotate-[330deg] z-[1] 
            grayscale group-hover:w-[200%] group-hover:h-[160%] 
            group-hover:grayscale-[70%] opacity-50
            transition-all duration-[0.6s]"
            src="assets/images/card-texture.png"
            alt=""
          />
          <h1 class="capitalize text-xl z-[2] drop-shadow-[0_0_10px_transparent]
          group-hover:drop-shadow-[0_0_10px_crimson]">${type}</h1>
        </a>`;

      function genreCard(target) {
        var genre = target.querySelector("h1");

        let genreText = genre.textContent.trim();

        let genreMatched = animes.filter(function (anime) {
          return anime.type.includes(genreText);
        });

        console.log(genreMatched);
        localStorage.setItem("genreMatched", JSON.stringify(genreMatched));
      }
      document.querySelectorAll("#genre-card").forEach((genre) => {
        genre.addEventListener("click", function () {
          genreCard(this);
        });
      });
    });

    // Genre Swip
    function genreSwip() {
      var genreContainer = document.getElementById("genre-container");
      var genreCard = document.getElementById("genre-card");

      var genreCardWidth = genreCard.getBoundingClientRect().width;
      var genreContainerGap = parseFloat(
        window.getComputedStyle(genreContainer).gap
      );

      var scrollCount = Math.ceil((window.innerWidth / window.outerWidth) * 2);

      genreContainer.scrollBy({
        left: (genreCardWidth + genreContainerGap) * scrollCount,
        behavior: "smooth",
      });
    }
    document
      .getElementById("right-genre-swip")
      .addEventListener("click", genreSwip);
  })
  .catch((error) => console.error("Error fetching anime data:", error));
