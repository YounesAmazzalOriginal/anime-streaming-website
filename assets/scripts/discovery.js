fetch("/assets/data/animes.json")
  .then((res) => res.json())
  .then((animes) => {
    let genres = [];
    let dates = [];

    var genresFilter = document.getElementById("genres-filter");
    var datesFilter = document.getElementById("dates-filter");

    // Collect genres and release dates
    animes.forEach((anime) => {
      genres.push(...anime.type.split(", ")); // Split genres
      dates.push(anime.release_date);
    });

    const uniqueGenres = [...new Set(genres)];
    const uniqueDates = [...new Set(dates)];

    // Generate filter buttons
    uniqueGenres.forEach((genre) => {
      let button = document.createElement("button");
      button.textContent = genre;
      button.type = "button";
      button.id = "genreButton";
      button.style.setProperty("user-select", "none");
      button.classList.add(
        "genre-button",
        "bg-white/10",
        "text-ivory/50",
        "px-2.5",
        "h-[25px]",
        "rounded-sm",
        "hover:text-black/80",
        "hover:bg-white/70",
        "transition-all"
      );
      genresFilter.appendChild(button);
    });

    uniqueDates.forEach((date) => {
      let button = document.createElement("button");
      button.textContent = date;
      button.type = "button";
      button.id = "idButton";
      button.style.setProperty("user-select", "none");
      button.classList.add(
        "date-button",
        "bg-white/10",
        "text-ivory/50",
        "px-2.5",
        "h-[25px]",
        "rounded-sm",
        "hover:text-black/80",
        "hover:bg-white/70",
        "transition-all"
      );
      datesFilter.appendChild(button);
    });

    let filterSelected = { genres: [], release_date: "" };

    function genreBtns(target) {
      target.classList.add("active");

      const genre = target.textContent;

      if (filterSelected.genres.includes(genre)) {
        // Remove genre if already selected
        filterSelected.genres = filterSelected.genres.filter(
          (g) => g !== genre
        );
        target.classList.remove("text-black/80", "bg-white/70");
      } else {
        // Add new genre
        filterSelected.genres.push(genre);
        target.classList.add("text-black/80", "bg-white/70");
      }

      console.log("Selected Genres:", filterSelected.genres);
    }

    function dateBtns(target) {
      target.classList.add("active");

      document.querySelectorAll(".date-button").forEach((btn) => {
        btn.classList.remove("text-black/80", "bg-white/70");
      });

      filterSelected.release_date = target.textContent;
      target.classList.add("text-black/80", "bg-white/70");

      console.log("Selected Date:", filterSelected.release_date);
    }

    // Add event listeners **after** elements exist
    document.querySelectorAll(".genre-button").forEach((genrebtn) => {
      genrebtn.addEventListener("click", function () {
        genreBtns(this);
      });
    });

    document.querySelectorAll(".date-button").forEach((datebtn) => {
      datebtn.addEventListener("click", function () {
        dateBtns(this);
      });
    });

    // Apply filter
    function applyFilter() {
      let filteredAnimes = animes.filter((anime) => {
        const animeGenres = anime.type.split(", ");
        const genreMatch =
          filterSelected.genres.length === 0 ||
          filterSelected.genres.some((selectedGenre) =>
            animeGenres.includes(selectedGenre)
          );

        const dateMatch =
          !filterSelected.release_date ||
          anime.release_date === filterSelected.release_date;

        return genreMatch && dateMatch;
      });

      // console.log("Filtered Animes:", filteredAnimes);

      var filtredAnimes = document.getElementById("filtred-animes");
      var resultsCount = document.getElementById("results-count");

      // **Clear previous animes before adding new ones**
      filtredAnimes.innerHTML = "";

      function findMatchedResults() {
        filtredAnimes.innerHTML = ""; // Clear previous results

        for (let i = 0; i < filteredAnimes.length; i++) {
          filtredAnimes.innerHTML += `<a class="block" href="video-player.html">
            <div
              title="${filteredAnimes[i].title}"
              class="group relative w-[200px] h-[300px] transition-all duration-300 rounded-lg overflow-hidden"
            >
              <div class="w-full h-full relative rounded-md">
                <!-- Image -->
                <img
                  class="w-full h-full object-cover aspect-[2/3] transition-all duration-300 group-hover:scale-105 group-hover:brightness-[40%]"
                  src="assets/images/animes/${filteredAnimes[i].image}"
                  alt="${filteredAnimes[i].title}"
                />
        
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
        
                <h1 class="absolute bottom-3 left-1/2 -translate-x-1/2 text-ivory text-sm font-semibold w-[90%] truncate text-center capitalize">
                  ${filteredAnimes[i].title}
                </h1>
              </div>
            </div>
          </a>`;
        }
      }

      document.querySelectorAll("#idButton ,#genreButton").forEach((btn) => {
        if (!btn.classList.contains("active")) {
          console.log(`btn not active`);
          return;
        }

        console.log(`btn active`);
        findMatchedResults();

        // Scroll Smooth to Results
        document.querySelector("#filtred-animes").scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        resultsCount.textContent = `${filteredAnimes.length} results found`;
      });
    }

    document
      .querySelector("#applyfilter-btn")
      .addEventListener("click", applyFilter);

    // localStorage.getItem("genreMatched");
  })
  .catch((error) => console.error("Error fetching anime data:", error));
