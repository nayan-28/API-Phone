const loadPhone = async(searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowAll);

}

const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');

    phoneContainer.textContent = '';

    const showAllButton = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllButton.classList.remove('hidden');
    } else {
        showAllButton.classList.add('hidden');
    }
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

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
                            <button onClick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Details</button>
                        </div>
                    </div>
        `;

        phoneContainer.appendChild(phonecard);
    });
    /*loading spinner*/
    toggleLoadingSpinner(false);
}


const handleSearch = (isShowAll) => {

    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);

}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}


const handleShowAll = () => {
    handleSearch(true);
}


const handleShowDetail = async(id) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);

    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <p><span >Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p>Display Size:<span>${phone?.mainFeatures?.displaySize}</span></p>
    <p>WLAN:<span>${phone?.others?.WLAN}</span></p>
    <p>Bluetooth:<span>${phone?.others?.Bluetooth}</span></p>
    <p>GPS:<span>${phone?.others?.GPS}</span></p>
    <p>NFC:<span>${phone?.others?.NFC}</span></p>
    `
    show_details_modal.showModal();

    console.log(phone);
}
