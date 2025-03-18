var animeDetailedData = JSON.parse(localStorage.getItem("animeDetailed"));
console.log(animeDetailedData);

var section = document.querySelector("section");

section.innerHTML += `<header class="bg-red-flex justify-center gap-10">
        <div
          class="bg-charcoal min-w-[200px] min-h-[300px] max-w-[200px] max-h-[300px] overflow-hidden rounded-lg relative"
        >
          <img src="assets/images/animes/${animeDetailedData.image}" alt="" />
        </div>
        <div class="w-[70%] flex flex-col gap-4">
          <h1 class="text-3xl capitalize font-[600]">${animeDetailedData.title.replaceAll(
            "-",
            " "
          )}</h1>
          <div class="capitalize text-[14px] flex gap-1 text-ivory/80">
            <div
              class="bg-white/10 w-fit px-3 h-[25px] rounded-sm flex items-center hover:text-black/80 hover:bg-white/70 transition-all cursor-default"
            >
              ${animeDetailedData.release_date}
            </div>
            <div
              class="bg-white/10 w-fit px-3 h-[25px] rounded-sm flex items-center hover:text-black/80 hover:bg-white/70 transition-all cursor-default"
            >
              ${animeDetailedData.notes}
            </div>
            <div
              class="bg-white/10 w-fit px-3 h-[25px] rounded-sm flex items-center hover:text-black/80 hover:bg-white/70 transition-all cursor-default"
            >
              ${animeDetailedData.status}
            </div>
            <div
              class="bg-crimson/10 w-fit px-3 h-[25px] rounded-sm flex items-center hover:text-black/80 hover:bg-white/70 transition-all cursor-default"
            >
              HD
            </div>
          </div>
          <div class="flex gap-2">
            <button
              class="bg-crimson w-40 h-10 rounded-full flex items-center justify-evenly border border-transparent hover:bg-transparent hover:border-crimson hover:text-crimson transition-all duration-450 hover:scale-95"
            >
              <i class="fa-solid fa-play text-sm"></i>
              <p class="text-sm capitalize">watch now</p>
            </button>
            <button
              class="bg-white/25 w-40 h-10 rounded-full flex items-center justify-evenly border border-transparent hover:bg-transparent hover:border-white/75 hover:text-ivory/75 transition-all duration-450"
            >
              <i class="fa-solid fa-plus text-sm"></i>
              <p class="text-sm">Add to List</p>
            </button>
          </div>
          <p class="opacity-70">
            ${animeDetailedData.description}
          </p>
        </div>
      </header>`;
