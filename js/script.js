
const dataCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    loadCategoryData(data.data);
}

// category button create and append 

const loadCategoryData = (categories) => {
    const btnCategory = document.getElementById('btn-category');
    for (const category of categories) {
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <button onClick="showAllCategoryData('${category.category_id}')" class="md:mx-4 btn btn-error  hover:bg-violet-600 text-white font-bold">${category.category}</button>
        
        `
        btnCategory.appendChild(createDiv);
    }

}

// category wise data load by category id 

const showAllCategoryData = async (categoryId) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    loadAllData(data.data)
}

const loadAllData = (data) => {
    const btnSort = document.getElementById('btn-sort');
    const showAllDataToCard = document.getElementById('card-to-show');
    showAllDataToCard.innerHTML = '';
    if (data.length === 0) {

        showAllDataToCard.classList.remove('y-12', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-4');

        btnSort.setAttribute("disabled", "")

        showAllDataToCard.innerHTML = `
        <div class="mt-12 flex flex-col justify-center items-center" >
        <img src=${'../images/Icon.png'} />
        <h2 class="text-2xl font-extrabold text-red-700">OOPS!!!!!! There Is No Content Here.</h2>
        </div>
       
        `
    }
    else {
        showAllDataToCard.classList.add('y-12', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-4');
        btnSort.removeAttribute("disabled")

        // sorting data when button click 
        document.getElementById('btn-sort').addEventListener('click', function () {
            showAllDataToCard.innerHTML = '';
            data = data.sort(function (a, b) {

                return Number((b.others.views).slice(0, -1)) - Number((a.others.views).slice(0, -1))

            });
            showCardData(data)
        })

        showCardData(data)


        function showCardData(data) {
            for (const card of data) {
                const createCardDiv = document.createElement('div');
                // console.log(card)

                createCardDiv.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
                   <div class="relative">
                        <figure><img class="w-full rounded-t-lg h-64" src=${card.thumbnail} alt="Image" /></figure>
                        <div>${card.others.posted_date ?
                        ` <p class="absolute bg-black px-4 py-2 right-4 bottom-4 text-white">${secondsToHms(card.others.posted_date)}</p>` : ''
                    }</div>
                       
                   </div>
                    <div class="card-body">
                       <div class="chat chat-start">
                        <div class="chat-image avatar">
                        <div class="w-10 rounded-full">
                        <img src=${card.authors[0].profile_picture} />
                      </div>
                    </div>
                    <div class="chat-bubble">${card.title}</div>
                  </div>
                        <p>${card.authors[0].profile_name} ${card.authors[0].verified ? '<i class="fa-solid fa-circle-check text-primary"></i>' : ''}</p>
                        <div></div>
                       
                        <p>${card.others.views}</p>
                    </div>
                </div>
        `
                showAllDataToCard.appendChild(createCardDiv)
            }
        }


        function secondsToHms(time) {
            time = Number(time);
            const h = Math.floor(time / 3600);
            const m = Math.floor(time % 3600 / 60);


            const hDisplay = h > 0 ? h + (h == 1 ? " hur" : " hrs") : "";
            const mDisplay = m > 0 ? m + (m == 1 ? " min" : " mints") : "";

            return (`${hDisplay}  ${mDisplay}  ago`);
        }

    }



}

showAllCategoryData('1000')

dataCategory();

