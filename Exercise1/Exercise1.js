const loader = document.getElementsByClassName('loading');
const menu = document.getElementsByClassName('menu');
const scroller = document.getElementById('scrollable');

//varibale
let page = 0;
let loadingData = false;
let crPage = 0;
let items = '';
const loadData = () => {
    try {
        fetch(`https://api.instantwebtools.net/v1/passenger?page=${0}&size=${10}`)
        .then(async (res) => {
            let passengers = await res.json();
            let airline = '';

            for (let passenger = 0; passenger <10; passenger++) {
                airline = passengers.data[passenger].airline;

                items += `
                        <div class="item">
                            <h4>✈️:${airline[0].name} - ${airline[0].country}</h4>
                            <p>🙂:${passengers.data[passenger].name}</p>
                        </div>
                    `
            }
            setTimeout(async() => { //loading spinner
                await loading(false);
            }, 2000);

            if (crPage == 2863) {
            items += `<div style="text-align: center;">End</div>`
                } else {
                    items += `<hr>`
                }
                scroller.innerHTML = items;
                loadingData = true;
        });
    }catch (error) {
        console.log(error);
        cur_page--;
    }
};
const loading = (load) => { //loading spinner
    if (load == true) {
        loader[0].style.display = 'flex';
        menu[0].style.display = 'none';
    } else {
        loader[0].style.display = 'none';
        menu[0].style.display = 'flex';
    }
}

const pageNumber = (num) => {
    document.getElementsByClassName('page-number')[0].innerHTML = `Page: <span>${num}</span>`;
}

loading(true);
loadData();
scroller.addEventListener('scroll', () =>{
    const clientHeight = scroller.clientHeight;
    const scollHeight = scroller.scrollHeight;
    const scrollTop = scroller.scrollTop;
    
    if (clientHeight + scrollTop + 200 >= scollHeight && loadingData == true &&  crPage <= 2862) {
        console.log('loading')
        loadData();
        crPage++;
        loadingData = false;
    }

    if (clientHeight + scrollTop > (1030 * (page + 1)) + 600) {
        page++;
        pageNumber(page);
        console.log(page)
    } else if (clientHeight + scrollTop <= (1030 * (page) + 500)) {
        page--;
        pageNumber(page);
        console.log(page)
    }
})