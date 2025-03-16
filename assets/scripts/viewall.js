var section = document.querySelector("section");

var genreMatched = JSON.parse(localStorage.getItem("genreMatched"));

genreMatched.forEach((genreMatched) => {
  console.log(genreMatched.image);

  section.innerHTML += `<a href="" class="block">
        <div
          title="${genreMatched.title}"
          class="group relative w-[200px] h-[300px] transition-all duration-300 rounded-lg overflow-hidden"
        >
          <div class="w-full h-full relative rounded-md">
            <img
              class="w-full h-full object-cover aspect-[2/3] transition-all duration-300 group-hover:scale-105 group-hover:brightness-[40%]"
              src="assets/images/animes/${genreMatched.image}"
              alt="${genreMatched.title}"
            />

            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"
            ></div>

            <h1
              class="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-sm font-semibold w-[90%] truncate text-center capitalize"
            >
              ${genreMatched.title.replaceAll("-", " ")}
            </h1>

            <button
              class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-charcoal/50 text-ivory text-xl w-14 h-14 flex items-center justify-center rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <i class="fa-solid fa-play"></i>
            </button>
          </div>
        </div>
      </a>`;
});
