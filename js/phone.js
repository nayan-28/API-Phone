const loadPhone = async(searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones);

}

const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');

    phoneContainer.textContent = '';
    phones.forEach(phone => {
        //console.log(phone)

        const phonecard = document.createElement('div');
        phonecard.classList = 'card bg-yellow-100 shadow-xl p-4';
        phonecard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.brand}</h2>
                        <p>${phone.
                            phone_name
                            }</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
        `;

        phoneContainer.appendChild(phonecard);
    })
}


const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);

}
