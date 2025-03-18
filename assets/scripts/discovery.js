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
          filterSelected.genres.length === 0 || // No genre selected = match all
          filterSelected.genres.some((selectedGenre) =>
            animeGenres.includes(selectedGenre)
          );

        const dateMatch =
          !filterSelected.release_date ||
          anime.release_date === filterSelected.release_date;

        return genreMatch && dateMatch;
      });

      console.log("Filtered Animes:", filteredAnimes);
    }

    document
      .querySelector("#applyfilter-btn")
      .addEventListener("click", applyFilter);

    // localStorage.getItem("genreMatched");
  })
  .catch((error) => console.error("Error fetching anime data:", error));
