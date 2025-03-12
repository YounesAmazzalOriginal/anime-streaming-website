fetch("/assets/data/best-10-animes.json")
  .then((res) => res.json())
  .then((data10) => {
    console.log(data10);

    var bestAnimes = document.getElementById("best-animes-container");

    for (let i = 0; i < data10.length; i++) {
      let title = data10[i].image.replaceAll("-", " ");

      bestAnimes.innerHTML += `<div
        class="cursor-pointer min-w-[200px] min-h-[280px] max-w-[200px] max-h-[280px] transition-all duration-300 relative rounded-md overflow-hidden group"
      >
        <h1
          class="absolute top-0 left-0 mx-3 my-2 z-[4] font-montserrat font-bold text-4xl after:content-[''] after:w-20 after:h-20 after:bg-charcoal/70 after:rounded-full after:absolute after:blur-xl after:top-1/2 after:left-1/2 after:z-[-1] after:-translate-y-1/2 after:-translate-x-1/2"
        >
          ${i + 1}
        </h1>
        <div
          class="bg-gradient-to-t from-black/80 via-transparent to-transparent w-full h-full absolute top-0 left-0 z-[2] pointer-events-none"
        ></div>
        <img
          class="w-full h-full object-cover scale-110 hover:scale-100 duration-300 transition-all group-hover:brightness-50"
          src="assets/images/animes/${data10[i].image}.jpg" 
          alt="${title}"  // ✅ Now includes both title & image src
        />
        <h1
          class="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap z-[2] capitalize mb-3 font-[500]"
        >
          ${title}
        </h1>
      </div>`;
    }
  })
  .catch((error) => console.error("Error fetching JSON:", error));
